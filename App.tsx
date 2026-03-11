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
  const [universities, setUniversities] = useState<University[]>(UNIVERSITIES_DATA);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMode, setSelectedMode] = useState<CourseMode>('Regular');
  
  // UI States
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'courses' | 'colleges'>('all');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchTerm, selectedMode, activeTab]); // Scroll on filter change

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

  // Subscribe to inquiries if user is Admin, Counselor, Associate Partner, or College Partner
  useEffect(() => {
    if (user && (user.role === 'ADMIN' || user.role === 'COUNSELOR' || user.role === 'ASSOCIATE_PARTNER' || user.role === 'COLLEGE_PARTNER' || user.crmAccess)) {
      const unsubscribeInquiries = subscribeToInquiries((data) => {
        setInquiries(data);
      });
      return () => unsubscribeInquiries();
    }
  }, [user]);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    if (loggedInUser.role === 'ADMIN') navigate('/admin');
    else if (loggedInUser.role === 'COUNSELOR' || loggedInUser.role === 'ASSOCIATE_PARTNER') navigate('/counselor');
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
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <Logo className="w-14 h-14" />
              <span className="ml-2 text-2xl font-black tracking-tight hidden sm:block">
                <span style={{ color: '#173054' }}>College</span>
                <span style={{ color: '#E97D22' }}>Gate</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-2">
              <button onClick={() => { setActiveTab('all'); navigate('/'); }} className={`px-4 py-2 rounded-full text-[15px] font-bold font-sans transition-colors ${activeTab === 'all' ? 'text-[#E97D22]' : 'text-[#173054] hover:text-[#E97D22]'}`}>Home</button>
              <button onClick={() => { setActiveTab('courses'); navigate('/'); }} className={`px-4 py-2 rounded-full text-[15px] font-bold font-sans transition-colors ${activeTab === 'courses' ? 'text-[#E97D22]' : 'text-[#173054] hover:text-[#E97D22]'}`}>Courses</button>
              <button onClick={() => { setActiveTab('colleges'); navigate('/'); }} className={`px-4 py-2 rounded-full text-[15px] font-bold font-sans transition-colors ${activeTab === 'colleges' ? 'text-[#E97D22]' : 'text-[#173054] hover:text-[#E97D22]'}`}>Colleges</button>
              <button onClick={() => navigate('/about')} className="px-4 py-2 rounded-full text-[15px] font-bold font-sans text-[#173054] hover:text-[#E97D22] transition-colors">About</button>
              
              {user ? (
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-200">
                   <div className="flex flex-col items-end">
                      <span className="text-xs font-bold text-[#173054]">{user.name}</span>
                      <span className="text-[10px] font-bold text-[#E97D22] bg-orange-50 px-1.5 py-0.5 rounded uppercase">{user.role}</span>
                   </div>
                   <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full bg-[#173054] flex items-center justify-center text-white font-bold shadow-md hover:shadow-lg transition-all">
                      {user.name.charAt(0)}
                   </button>
                   <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                   </button>
                </div>
              ) : (
                <button onClick={() => navigate('/login')} className="ml-4 px-6 py-2.5 rounded-full bg-[#E97D22] text-white text-sm font-bold hover:bg-[#d6721e] transition-colors shadow-lg shadow-orange-200/50">
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={
            <HomeView 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedMode={selectedMode}
              setSelectedMode={setSelectedMode}
              courses={courses}
              universities={universities}
              activeTab={activeTab}
              onInquiry={() => setShowInquiryModal(true)}
              onUniversityClick={(id) => navigate(`/university/${id}`)}
              onAboutClick={() => navigate('/about')}
            />
          } />
          <Route path="/login" element={user ? <Navigate to="/" /> : <SignIn onLogin={handleLogin} onCancel={() => navigate('/')} />} />
          <Route path="/admin" element={user ? <AdminDashboard colleges={colleges} setColleges={setColleges} courses={courses} setCourses={setCourses} universities={universities} setUniversities={setUniversities} inquiries={inquiries} /> : <Navigate to="/login" />} />
          <Route path="/counselor" element={user ? <CounselorDashboard counselor={user} inquiries={inquiries} /> : <Navigate to="/login" />} />
          <Route path="/partner" element={user ? <CollegePartnerDashboard partner={user} colleges={colleges} setColleges={setColleges} inquiries={inquiries} /> : <Navigate to="/login" />} />
          <Route path="/skills" element={<SkillsSection />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={user ? <StudentProfile user={user} onUpdateUser={setUser} onBack={() => navigate('/')} /> : <Navigate to="/login" />} />
          <Route path="/university/:id" element={<UniversityDetailRoute onInquiry={() => setShowInquiryModal(true)} />} />
          <Route path="/college/:id" element={<CollegeDetailRoute colleges={colleges} onInquiry={() => setShowInquiryModal(true)} onCompare={handleCompare} isComparing={false} />} />
        </Routes>
      </main>

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
      <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-2 md:bottom-8">
          <a 
            href="https://www.facebook.com/share/17zGSaFZo5/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#1877F2] text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center animate-bounce-in"
            title="Follow on Facebook"
          >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a 
            href="https://www.instagram.com/collegegate_official?igsh=MTZ6b2d5b3NuMDJ3cg==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center animate-bounce-in delay-75"
            title="Follow on Instagram"
          >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a 
            href="http://www.youtube.com/@CollegeGate007" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#FF0000] text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center animate-bounce-in delay-100"
            title="Watch on YouTube"
          >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a 
            href="https://wa.me/917033827101?text=HELLO%20i%20want%20to%20know%20more" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center animate-bounce-in delay-150"
            title="Chat on WhatsApp"
          >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.128 1.588 5.911L.061 24l6.171-1.616a11.879 11.879 0 005.821 1.543h.003c6.556 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          </a>
          <a 
            href="https://t.me/collegegate_official" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#0088cc] text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center animate-bounce-in delay-200"
            title="Join on Telegram"
          >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          </a>
          <a 
            href="https://www.linkedin.com/company/collegegate/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#0077b5] text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center animate-bounce-in delay-200"
            title="Follow us on LinkedIn"
          >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a 
            href="tel:+917033827101" 
            className="bg-[#E97D22] text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center animate-bounce-in delay-300"
            title="Call Now"
          >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
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

      {/* Footer */}
      <footer className="bg-[#173054] text-[#e2e8f0] py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            
            {/* Left side: Made with love / Copyright */}
            <div className="flex flex-col items-center md:items-start gap-2 order-3 md:order-1">
              <p className="text-slate-300 font-medium text-sm">Made with love <span className="text-red-500">❤️</span>, proud being an Indian 🇮🇳</p>
              <p className="text-xs text-slate-400">© {new Date().getFullYear()} CollegeGate. All rights reserved.</p>
              <a href="mailto:info@collegegate.in" className="text-sm hover:text-white transition-colors flex items-center gap-2 mt-1">
                <svg className="w-4 h-4 text-[#E97D22]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                info@collegegate.in
              </a>
            </div>

            {/* Center: Logo & Tagline */}
            <div className="flex flex-col items-center order-1 md:order-2">
              <div className="flex items-center justify-center cursor-pointer opacity-90 hover:opacity-100 transition-opacity" onClick={() => navigate('/')}>
                <div className="bg-white p-2 rounded-full shadow-lg">
                  <Logo className="w-16 h-16" />
                </div>
              </div>
            </div>

            {/* Right side: Contact */}
            <div className="flex flex-col items-center md:items-end gap-2 order-2 md:order-3">
              <a href="tel:+917033827101" className="flex items-center gap-2 hover:text-white transition-colors font-bold text-lg">
                <svg className="w-5 h-5 text-[#E97D22]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>70338 27101</span>
              </a>
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 mt-1">
                <a href="https://wa.me/917033827101" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors text-sm" title="WhatsApp">
                  <svg className="w-4 h-4 text-[#E97D22]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.128 1.588 5.911L.061 24l6.171-1.616a11.879 11.879 0 005.821 1.543h.003c6.556 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  WhatsApp
                </a>
                <a href="https://t.me/collegegate_official" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors text-sm" title="Telegram">
                  <svg className="w-4 h-4 text-[#E97D22]" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  Telegram
                </a>
                <a href="http://www.youtube.com/@CollegeGate007" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors text-sm" title="YouTube">
                  <svg className="w-4 h-4 text-[#E97D22]" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  YouTube
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 mt-1">
                <a href="https://www.facebook.com/share/17zGSaFZo5/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors text-sm" title="Facebook">
                  <svg className="w-4 h-4 text-[#E97D22]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </a>
                <a href="https://www.instagram.com/collegegate_official?igsh=MTZ6b2d5b3NuMDJ3cg==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors text-sm" title="Instagram">
                  <svg className="w-4 h-4 text-[#E97D22]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  Instagram
                </a>
                <a href="https://www.linkedin.com/company/collegegate/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors text-sm" title="LinkedIn">
                  <svg className="w-4 h-4 text-[#E97D22]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>

          </div>
        </div>
      </footer>

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
