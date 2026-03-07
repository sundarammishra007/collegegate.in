import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, Navigate, useParams } from 'react-router-dom';
import { NavView, College, User, Inquiry, Course, CourseMode } from './types';
import { MOCK_COLLEGES, COURSES_DATA, UNIVERSITIES_DATA } from './constants';
import { auth, db, saveUserToFirestore, getUserProfile, addInquiry, subscribeToInquiries } from './services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import MagicCampus from './components/MagicCampus';
import CollegeRegistration from './components/CollegeRegistration';
import CollegeInquiry from './components/CollegeInquiry';
import CompareView from './components/CompareView';
import CollegeDetailView from './components/CollegeDetailView';
import UniversityDetailView from './components/UniversityDetailView';
import SignIn from './components/SignIn';
import AdminDashboard from './components/AdminDashboard';
import CounselorDashboard from './components/CounselorDashboard';
import CollegePartnerDashboard from './components/CollegePartnerDashboard';
import SkillsSection from './components/SkillsSection';
import Logo from './components/Logo';
import About from './components/About';
import StudentProfile from './components/StudentProfile';
import HomeView from './components/HomeView';

// Wrapper for University Detail to use params
const UniversityDetailRoute = ({ onInquiry }: { onInquiry: () => void }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const university = UNIVERSITIES_DATA.find(u => u.id === id);
  
  if (!university) return <Navigate to="/" />;
  
  return (
    <UniversityDetailView 
      university={university} 
      onBack={() => navigate('/')} 
      onInquiry={onInquiry} 
    />
  );
};

// Wrapper for College Detail to use params
const CollegeDetailRoute = ({ colleges, onInquiry, onCompare, isComparing }: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const college = colleges.find((c: College) => c.id === id);
  
  if (!college) return <Navigate to="/" />;
  
  return (
    <CollegeDetailView 
      college={college} 
      onBack={() => navigate('/')} 
      onInquiry={onInquiry}
      onCompare={onCompare}
      isComparing={isComparing}
    />
  );
};

function AppContent() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Data States
  const [colleges, setColleges] = useState<College[]>(MOCK_COLLEGES);
  const [courses, setCourses] = useState<Course[]>(COURSES_DATA);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMode, setSelectedMode] = useState<CourseMode>('Regular');
  
  // UI States
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchTerm, selectedMode]); // Scroll on filter change

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
             setUser(userDoc.data() as User);
          } else {
             // Handle case where user is in Auth but not in Firestore (shouldn't happen with correct flow)
             console.warn("User authenticated but profile missing in Firestore");
             setUser(null); 
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to inquiries if user is Admin or has CRM access
  useEffect(() => {
    if (user && (user.role === 'ADMIN' || user.crmAccess)) {
      const unsubscribeInquiries = subscribeToInquiries((data) => {
        setInquiries(data);
      });
      return () => unsubscribeInquiries();
    }
  }, [user]);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    if (loggedInUser.role === 'ADMIN') navigate('/admin');
    else if (loggedInUser.role === 'COUNSELOR') navigate('/counselor');
    else if (loggedInUser.role === 'COLLEGE_PARTNER') navigate('/partner');
    else navigate('/');
  };

  const handleLogout = async () => {
      try {
        await signOut(auth);
        setUser(null);
        navigate('/');
      } catch (error) {
        console.error("Error signing out:", error);
      }
  };

  const handleInquiry = async (inquiry: Inquiry) => {
    try {
      await addInquiry(inquiry);
      // We don't need to manually update state as the subscription will handle it for admins,
      // and for students/others we might just show a success message.
      setShowInquiryModal(false);
    } catch (error) {
      console.error("Error adding inquiry:", error);
      alert("Failed to submit inquiry. Please try again.");
    }
  };

  const handleCompare = (collegeId: string) => {
    setCompareList(prev => {
      if (prev.includes(collegeId)) return prev.filter(id => id !== collegeId);
      if (prev.length >= 3) return prev;
      return [...prev, collegeId];
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <Logo />
              <span className="ml-2 text-xl font-black tracking-tight">
                <span style={{ color: '#0F2C4C' }}>College</span>
                <span style={{ color: '#F97316' }}>Gate</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              <button onClick={() => navigate('/')} className="px-4 py-2 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">Home</button>
              <button onClick={() => navigate('/skills')} className="px-4 py-2 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">Skills & AI</button>
              <button onClick={() => navigate('/about')} className="px-4 py-2 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">About</button>
              
              {user ? (
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-200">
                   <div className="flex flex-col items-end">
                      <span className="text-xs font-bold text-slate-900">{user.name}</span>
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded uppercase">{user.role}</span>
                   </div>
                   <button onClick={() => navigate('/profile')} className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-md hover:shadow-lg transition-all">
                      {user.name.charAt(0)}
                   </button>
                   <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                   </button>
                </div>
              ) : (
                <button onClick={() => navigate('/login')} className="ml-4 px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <HomeView 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            courses={courses}
            onInquiry={() => setShowInquiryModal(true)}
            onUniversityClick={(id) => navigate(`/university/${id}`)}
            onAboutClick={() => navigate('/about')}
          />
        } />
        <Route path="/login" element={user ? <Navigate to="/" /> : <SignIn onLogin={handleLogin} onCancel={() => navigate('/')} />} />
        <Route path="/admin" element={user ? <AdminDashboard colleges={colleges} setColleges={setColleges} courses={courses} setCourses={setCourses} inquiries={inquiries} /> : <Navigate to="/login" />} />
        <Route path="/counselor" element={user ? <CounselorDashboard counselor={user} inquiries={inquiries} /> : <Navigate to="/login" />} />
        <Route path="/partner" element={user ? <CollegePartnerDashboard partner={user} colleges={colleges} setColleges={setColleges} inquiries={inquiries} /> : <Navigate to="/login" />} />
        <Route path="/skills" element={<SkillsSection />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={user ? <StudentProfile user={user} onUpdateUser={setUser} onBack={() => navigate('/')} /> : <Navigate to="/login" />} />
        <Route path="/university/:id" element={<UniversityDetailRoute onInquiry={() => setShowInquiryModal(true)} />} />
        <Route path="/college/:id" element={<CollegeDetailRoute colleges={colleges} onInquiry={() => setShowInquiryModal(true)} onCompare={handleCompare} isComparing={false} />} />
      </Routes>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-50">
        <div className="flex justify-around items-center h-16">
          <button onClick={() => navigate('/')} className="flex flex-col items-center justify-center w-full h-full text-indigo-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-[10px] font-bold mt-1">Home</span>
          </button>
          <button onClick={() => navigate('/skills')} className="flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-indigo-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            <span className="text-[10px] font-bold mt-1">Skills</span>
          </button>
          <button onClick={() => navigate('/about')} className="flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-indigo-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="text-[10px] font-bold mt-1">About</span>
          </button>
          <button onClick={() => user ? navigate('/profile') : navigate('/login')} className="flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-indigo-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="text-[10px] font-bold mt-1">{user ? 'Profile' : 'Login'}</span>
          </button>
        </div>
      </div>

      {/* Floating Contact Buttons */}
      <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-3 md:bottom-8">
          <a 
            href="https://wa.me/917033827101" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center animate-bounce-in"
            title="Chat on WhatsApp"
          >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.128 1.588 5.911L.061 24l6.171-1.616a11.879 11.879 0 005.821 1.543h.003c6.556 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          </a>
          <a 
            href="tel:+917033827101" 
            className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center animate-bounce-in delay-100"
            title="Call Now"
          >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          </a>
      </div>

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
           <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-scale-in">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <h3 className="font-bold text-lg text-slate-800">Enquire Now</h3>
                 <button onClick={() => setShowInquiryModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>
              </div>
              <div className="p-0">
                 <CollegeInquiry collegeName="General Inquiry" onClose={() => setShowInquiryModal(false)} onSubmit={handleInquiry} user={user} />
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;
