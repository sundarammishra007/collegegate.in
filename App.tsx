import React, { useState, useEffect } from 'react';
import { NavView, College, User, Inquiry } from './types';
import { MOCK_COLLEGES } from './constants';
import MagicCampus from './components/MagicCampus';
import LiveCounselor from './components/LiveCounselor';
import CollegeRegistration from './components/CollegeRegistration';
import CollegeInquiry from './components/CollegeInquiry';
import CompareView from './components/CompareView';
import CollegeDetailView from './components/CollegeDetailView';
import SignIn from './components/SignIn';
import AdminDashboard from './components/AdminDashboard';
import CounselorDashboard from './components/CounselorDashboard';
import AIResearch from './components/AIResearch';
import SkillsSection from './components/SkillsSection';
import Logo from './components/Logo';

function App() {
  const [currentView, setCurrentView] = useState<NavView>(NavView.HOME);
  const [user, setUser] = useState<User | null>(null);
  
  // Data States
  const [colleges, setColleges] = useState<College[]>(MOCK_COLLEGES);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState<'All' | 'India' | 'Abroad' | 'Online'>('All');
  const [filterCategory, setFilterCategory] = useState<'All' | 'Medical' | 'Engineering' | 'Management' | 'Law' | 'Design' | 'Online' | 'Nursing' | 'Art' | 'Agriculture'>('All');
  
  // UI States
  const [compareList, setCompareList] = useState<string[]>([]);
  const [selectedCollegeId, setSelectedCollegeId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    if (loggedInUser.role === 'ADMIN') setCurrentView(NavView.ADMIN_DASHBOARD);
    else if (loggedInUser.role === 'COUNSELOR') setCurrentView(NavView.COUNSELOR_DASHBOARD);
    else setCurrentView(NavView.HOME);
  };

  const handleLogout = () => {
      setUser(null);
      setCurrentView(NavView.HOME);
  };

  const filteredColleges = colleges.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesCountry = true;
    if (filterCountry === 'Online') matchesCountry = c.tags.includes('Online') || c.tags.includes('Distance');
    else matchesCountry = filterCountry === 'All' || c.country === filterCountry;
    
    let matchesCategory = true;
    if (filterCategory !== 'All') {
        const cat = filterCategory;
        if (cat === 'Medical') matchesCategory = c.tags.includes('Medical') || c.tags.includes('MBBS');
        else if (cat === 'Nursing') matchesCategory = c.tags.includes('Nursing') || c.tags.includes('B.Sc Nursing');
        else if (cat === 'Engineering') matchesCategory = c.tags.includes('Engineering');
        else if (cat === 'Management') matchesCategory = c.tags.includes('Management') || c.tags.includes('MBA');
        else if (cat === 'Law') matchesCategory = c.tags.includes('Law');
        else if (cat === 'Design') matchesCategory = c.tags.includes('Design') || c.tags.includes('Fashion');
        else if (cat === 'Art') matchesCategory = c.tags.includes('Art') || c.tags.includes('Fine Arts');
        else if (cat === 'Agriculture') matchesCategory = c.tags.includes('Agriculture');
        else if (cat === 'Online') matchesCategory = c.tags.includes('Online') || c.tags.includes('Distance');
    }
    return matchesSearch && matchesCountry && matchesCategory;
  });

  const renderContent = () => {
    switch (currentView) {
      case NavView.AUTH: return <SignIn onLogin={handleLogin} onCancel={() => setCurrentView(NavView.HOME)} />;
      case NavView.ADMIN_DASHBOARD: return <AdminDashboard />;
      case NavView.COUNSELOR_DASHBOARD: return <CounselorDashboard counselor={user!} inquiries={inquiries} />;
      case NavView.AI_RESEARCH: return <AIResearch />;
      case NavView.SKILLS: return <SkillsSection />;
      case NavView.HOME:
      case NavView.COLLEGES:
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative pb-24 md:pb-12">
            <div className="mb-6 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-xl shadow-indigo-200/50">
               <div className="mb-4 md:mb-0">
                  <h2 className="text-3xl font-bold mb-1">Your Future Starts Here</h2>
                  <p className="text-indigo-100">Explore colleges or master high-demand skills.</p>
               </div>
               <div className="flex gap-3">
                    <button onClick={() => setCurrentView(NavView.SKILLS)} className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-2xl font-bold hover:bg-white/30 transition-all border border-white/20">Learn Skills</button>
                    <button onClick={() => setCurrentView(NavView.AI_RESEARCH)} className="bg-white text-indigo-700 px-6 py-3 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-lg">AI Research</button>
               </div>
            </div>

            <div className="sticky top-[64px] z-30 bg-[#f8fafc]/95 backdrop-blur-md pt-2 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:static md:bg-transparent mb-6">
                <div className="space-y-4">
                    <div className="relative w-full shadow-sm">
                        <input type="text" placeholder="Search Art, Agriculture, Tech colleges..." className="w-full pl-12 pr-10 py-4 rounded-2xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-slate-700 shadow-md" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <svg className="absolute left-4 top-4.5 h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {(['All', 'Engineering', 'Medical', 'Art', 'Agriculture', 'Management', 'Law', 'Design', 'Online'] as const).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilterCategory(cat as any)}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all whitespace-nowrap ${
                                    filterCategory === cat ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                                }`}
                            >
                                {cat === 'All' ? '🌟 All' : 
                                 cat === 'Art' ? '🎨 Art' : 
                                 cat === 'Agriculture' ? '🚜 Agri' : 
                                 cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredColleges.map((college) => (
                  <div key={college.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 transition-all hover:shadow-2xl hover:-translate-y-2 group flex flex-col cursor-pointer" onClick={() => { setSelectedCollegeId(college.id); setCurrentView(NavView.DETAIL); }}>
                    <div className="relative aspect-video overflow-hidden">
                      <img src={college.image} alt={college.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase text-slate-800 shadow-sm border border-slate-100">
                           {college.location}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug">{college.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {college.tags.slice(0, 3).map(tag => <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{tag}</span>)}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <span className="text-sm font-black text-slate-400">#{college.ranking} RANK</span>
                        <span className="text-sm font-black text-indigo-600">{college.fees.split('/')[0]}</span>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        );
      case NavView.MAGIC_CAMPUS: return <MagicCampus />;
      case NavView.VOICE_LOUNGE: return <div className="h-[calc(100vh-160px)] p-4 max-w-4xl mx-auto"><LiveCounselor user={user} /></div>;
      case NavView.REGISTER: return <CollegeRegistration onSubmit={(c) => { setColleges([c, ...colleges]); setCurrentView(NavView.HOME); }} onCancel={() => setCurrentView(NavView.HOME)} />;
      case NavView.INQUIRY: return <CollegeInquiry user={user} onSubmit={(i) => setInquiries([i, ...inquiries])} onCancel={() => setCurrentView(NavView.HOME)} />;
      case NavView.COMPARE: return <CompareView colleges={colleges.filter(c => compareList.includes(c.id))} onRemove={(id) => setCompareList(compareList.filter(cid => cid !== id))} onBack={() => setCurrentView(NavView.HOME)} />;
      case NavView.DETAIL: return <CollegeDetailView college={colleges.find(c => c.id === selectedCollegeId) || colleges[0]} onBack={() => setCurrentView(NavView.HOME)} onInquiry={() => setCurrentView(NavView.INQUIRY)} onCompare={(id) => setCompareList([...compareList, id])} isComparing={compareList.includes(selectedCollegeId!)} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <header className="glass-nav sticky top-0 z-40 h-16 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView(NavView.HOME)}>
            <Logo className="w-9 h-9" />
            <span className="text-xl font-black tracking-tighter text-[#0F2C4C]">COLLEGE<span className="text-[#F97316]">GATE</span></span>
          </div>

          <nav className="hidden md:flex bg-slate-100 p-1 rounded-2xl gap-1">
            <button onClick={() => setCurrentView(NavView.HOME)} className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all ${currentView === NavView.HOME ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Colleges</button>
            <button onClick={() => setCurrentView(NavView.SKILLS)} className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all ${currentView === NavView.SKILLS ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Learn</button>
            <button onClick={() => setCurrentView(NavView.AI_RESEARCH)} className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all ${currentView === NavView.AI_RESEARCH ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Research</button>
            <button onClick={() => setCurrentView(NavView.VOICE_LOUNGE)} className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all ${currentView === NavView.VOICE_LOUNGE ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Lounge</button>
          </nav>

          <div className="flex items-center gap-3">
            {!user ? (
               <button onClick={() => setCurrentView(NavView.AUTH)} className="px-5 py-2 bg-slate-900 text-white rounded-full font-bold text-sm hover:scale-105 transition-transform">Sign In</button>
            ) : (
               <button onClick={handleLogout} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-red-50 hover:text-red-500 transition-colors">✕</button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow">{renderContent()}</main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-50">
          <div className="flex justify-around items-center h-16">
             <button onClick={() => setCurrentView(NavView.HOME)} className={`flex-1 flex flex-col items-center gap-1 ${currentView === NavView.HOME ? 'text-indigo-600' : 'text-slate-400'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                <span className="text-[10px] font-bold">Colleges</span>
             </button>
             <button onClick={() => setCurrentView(NavView.SKILLS)} className={`flex-1 flex flex-col items-center gap-1 ${currentView === NavView.SKILLS ? 'text-indigo-600' : 'text-slate-400'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                <span className="text-[10px] font-bold">Learn</span>
             </button>
             <button onClick={() => setCurrentView(NavView.AI_RESEARCH)} className={`flex-1 flex flex-col items-center gap-1 ${currentView === NavView.AI_RESEARCH ? 'text-indigo-600' : 'text-slate-400'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <span className="text-[10px] font-bold">Search</span>
             </button>
             <button onClick={() => setCurrentView(NavView.VOICE_LOUNGE)} className={`flex-1 flex flex-col items-center gap-1 ${currentView === NavView.VOICE_LOUNGE ? 'text-indigo-600' : 'text-slate-400'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                <span className="text-[10px] font-bold">Voice</span>
             </button>
          </div>
      </div>
    </div>
  );
}

export default App;