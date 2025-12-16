import React, { useState, useEffect, useRef } from 'react';
import { NavView, College } from './types';
import { MOCK_COLLEGES } from './constants';
import MagicCampus from './components/MagicCampus';
import LiveCounselor from './components/LiveCounselor';
import CollegeRegistration from './components/CollegeRegistration';
import CollegeInquiry from './components/CollegeInquiry';
import CompareView from './components/CompareView';
import CollegeDetailView from './components/CollegeDetailView';
import Logo from './components/Logo';

function App() {
  const [currentView, setCurrentView] = useState<NavView>(NavView.HOME);
  const [colleges, setColleges] = useState<College[]>(MOCK_COLLEGES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState<'All' | 'India' | 'Abroad' | 'Online'>('All');
  const [filterCategory, setFilterCategory] = useState<'All' | 'Medical' | 'Engineering' | 'Management' | 'Law' | 'Design' | 'Online'>('All');
  
  // State for comparison
  const [compareList, setCompareList] = useState<string[]>([]);
  // State for Detail View
  const [selectedCollegeId, setSelectedCollegeId] = useState<string | null>(null);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const filteredColleges = colleges.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesCountry = true;
    if (filterCountry === 'Online') {
      matchesCountry = c.tags.includes('Online') || c.tags.includes('Distance');
    } else {
      matchesCountry = filterCountry === 'All' || c.country === filterCountry;
    }
    
    let matchesCategory = true;
    if (filterCategory !== 'All') {
        const cat = filterCategory;
        if (cat === 'Medical') matchesCategory = c.tags.includes('Medical') || c.tags.includes('MBBS');
        else if (cat === 'Engineering') matchesCategory = c.tags.includes('Engineering');
        else if (cat === 'Management') matchesCategory = c.tags.includes('Management') || c.tags.includes('MBA');
        else if (cat === 'Law') matchesCategory = c.tags.includes('Law');
        else if (cat === 'Design') matchesCategory = c.tags.includes('Design') || c.tags.includes('Fashion');
        else if (cat === 'Online') matchesCategory = c.tags.includes('Online') || c.tags.includes('Distance');
    }

    return matchesSearch && matchesCountry && matchesCategory;
  });

  const handleRegisterCollege = (newCollege: College) => {
    setColleges(prev => [newCollege, ...prev]);
    setCurrentView(NavView.HOME);
  };

  const toggleCompare = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        return prev.filter(cid => cid !== id);
      } else {
        if (prev.length >= 4) {
          alert("You can compare up to 4 colleges at a time.");
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  const handleCollegeClick = (id: string) => {
    setSelectedCollegeId(id);
    setCurrentView(NavView.DETAIL);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterCountry('All');
    setFilterCategory('All');
  };

  const getCompareColleges = () => {
    return colleges.filter(c => compareList.includes(c.id));
  };
  
  const getSelectedCollege = () => {
      return colleges.find(c => c.id === selectedCollegeId) || colleges[0];
  };

  const renderContent = () => {
    switch (currentView) {
      case NavView.HOME:
      case NavView.COLLEGES:
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative pb-24 md:pb-12">
            
            {/* Ask to College Banner - Compact Mobile */}
            <div className="mb-6 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between shadow-xl shadow-indigo-200/50 relative overflow-hidden">
               <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
               <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-purple-500 opacity-20 rounded-full blur-2xl"></div>
               
               <div className="mb-4 md:mb-0 relative z-10 text-center md:text-left">
                  <h2 className="text-xl md:text-2xl font-bold mb-1">Unsure about your future?</h2>
                  <p className="text-indigo-100 text-sm md:text-base">Get AI-powered advice on colleges, exams & more.</p>
               </div>
               <button 
                 onClick={() => setCurrentView(NavView.INQUIRY)}
                 className="relative z-10 bg-white text-indigo-700 px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-lg active:scale-95 text-sm md:text-base"
               >
                 Ask to College &rarr;
               </button>
            </div>

            {/* Sticky Search & Filters for Mobile Experience */}
            <div className="sticky top-[64px] z-30 bg-[#f8fafc]/95 backdrop-blur-md pt-2 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:static md:bg-transparent md:z-0 md:pt-0">
                <div className="space-y-3">
                    {/* Search Bar */}
                    <div className="relative w-full shadow-sm">
                        <input
                        type="text"
                        placeholder="Search colleges, cities, or exams..."
                        className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="absolute left-3.5 top-4 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3.5 top-4 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        )}
                    </div>
                    
                    {/* Horizontal Scrollable Filters */}
                    <div className="flex flex-col gap-3">
                        {/* Country/Mode Toggle */}
                        <div className="flex gap-2 p-1 bg-white rounded-lg border border-slate-200 shadow-sm w-fit overflow-x-auto">
                            {(['All', 'India', 'Abroad', 'Online'] as const).map((c) => (
                            <button
                                key={c}
                                onClick={() => setFilterCountry(c)}
                                className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all whitespace-nowrap ${
                                filterCountry === c 
                                ? 'bg-indigo-600 text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                                }`}
                            >
                                {c === 'Online' ? '🌐 Online' : c}
                            </button>
                            ))}
                        </div>

                        {/* Category Pills */}
                        <div className="overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                            <div className="flex gap-2 w-max">
                                {(['All', 'Medical', 'Engineering', 'Management', 'Law', 'Design', 'Online'] as const).map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilterCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all active:scale-95 ${
                                            filterCategory === cat
                                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                                            : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                                        }`}
                                    >
                                        {cat === 'Medical' ? '⚕️ MBBS' : 
                                         cat === 'Engineering' ? '⚙️ B.Tech' : 
                                         cat === 'Management' ? '📊 MBA' : 
                                         cat === 'Law' ? '⚖️ Law' : 
                                         cat === 'Design' ? '🎨 Fashion' : 
                                         cat === 'Online' ? '💻 Online' :
                                         'All'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filteredColleges.map((college) => {
                const isSelected = compareList.includes(college.id);
                return (
                  <div 
                    key={college.id} 
                    className={`bg-white rounded-2xl overflow-hidden shadow-sm border transition-all duration-300 group flex flex-col cursor-pointer hover:shadow-xl hover:-translate-y-1 ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-500 ring-opacity-50' : 'border-slate-100'}`}
                    onClick={() => handleCollegeClick(college.id)}
                  >
                    {/* Image Section */}
                    <div className="relative aspect-video overflow-hidden bg-slate-100">
                      <img 
                        src={college.image} 
                        alt={college.name} 
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/800/600?grayscale' }}
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm border border-slate-100">
                           {college.country === 'India' ? '🇮🇳' : '🌎'} {college.location.split(',')[0]}
                        </span>
                      </div>
                      
                      {/* Ranking Badge */}
                      <div className="absolute top-3 right-3 bg-indigo-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-lg shadow-indigo-900/20">
                        #{college.ranking}
                      </div>

                      {/* Compare Button (Overlay) */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleCompare(college.id); }}
                        className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 ${
                            isSelected 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-white text-slate-400 hover:text-indigo-600'
                        }`}
                        title="Compare"
                      >
                         {isSelected ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        )}
                      </button>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="mb-3">
                           <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-indigo-700 transition-colors line-clamp-2">{college.name}</h3>
                           <p className="text-xs text-slate-500 mt-1">{college.accreditation || 'Accredited Institute'}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                           <p className="text-[10px] uppercase font-semibold text-slate-400">Fees</p>
                           <p className="text-sm font-bold text-slate-700 truncate">{college.fees.split('/')[0]}</p>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                           <p className="text-[10px] uppercase font-semibold text-slate-400">Exam</p>
                           <p className="text-sm font-bold text-indigo-600 truncate">{college.exams[0]}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {college.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="bg-white border border-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Empty State */}
            {filteredColleges.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-4xl">
                        🤷‍♂️
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">No colleges found</h3>
                    <p className="text-slate-500 mb-6 max-w-xs">We couldn't find any matches. Try adjusting your filters.</p>
                    <button 
                        onClick={clearFilters}
                        className="px-6 py-2.5 bg-indigo-50 text-indigo-600 font-bold rounded-xl hover:bg-indigo-100 transition-colors"
                    >
                        Clear All Filters
                    </button>
                </div>
            )}

            {/* Floating Compare Bar (Bottom) */}
            {compareList.length > 0 && (
                <div className="fixed bottom-20 md:bottom-8 left-4 right-4 md:left-1/2 md:right-auto md:w-auto md:-translate-x-1/2 z-40 bg-slate-900/90 backdrop-blur-md text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center justify-between md:justify-start gap-6 border border-slate-700 animate-bounce-in">
                    <span className="font-medium text-sm whitespace-nowrap">{compareList.length} Selected</span>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setCompareList([])} className="text-slate-400 hover:text-white text-sm px-2">Clear</button>
                        <button 
                            onClick={() => setCurrentView(NavView.COMPARE)}
                            className="bg-indigo-500 hover:bg-indigo-400 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-900/50"
                        >
                            Compare
                        </button>
                    </div>
                </div>
            )}
          </div>
        );
      case NavView.MAGIC_CAMPUS:
        return <MagicCampus />;
      case NavView.VOICE_LOUNGE:
        return (
            <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-160px)] p-4 max-w-4xl mx-auto">
                <LiveCounselor />
            </div>
        );
      case NavView.REGISTER:
        return <CollegeRegistration onSubmit={handleRegisterCollege} onCancel={() => setCurrentView(NavView.HOME)} />;
      case NavView.INQUIRY:
        return <CollegeInquiry onCancel={() => setCurrentView(NavView.HOME)} />;
      case NavView.COMPARE:
        return (
            <CompareView 
                colleges={getCompareColleges()} 
                onRemove={toggleCompare} 
                onBack={() => setCurrentView(NavView.HOME)} 
            />
        );
      case NavView.DETAIL:
        return (
            <CollegeDetailView 
                college={getSelectedCollege()} 
                onBack={() => setCurrentView(NavView.HOME)}
                onInquiry={() => setCurrentView(NavView.INQUIRY)}
                onCompare={toggleCompare}
                isComparing={compareList.includes(selectedCollegeId || '')}
            />
        );
      default:
        return <div className="p-8 text-center text-slate-500">Feature coming soon!</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      {/* Header */}
      <header className="glass-nav sticky top-0 z-40 h-16 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between h-full items-center">
            <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => setCurrentView(NavView.HOME)}>
              <Logo className="w-9 h-9 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-600 tracking-tight">
                CollegeGate
              </span>
            </div>

            <nav className="hidden md:flex space-x-1 bg-slate-100/50 p-1 rounded-xl border border-slate-200/50">
              <button 
                onClick={() => setCurrentView(NavView.HOME)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${currentView === NavView.HOME || currentView === NavView.DETAIL ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Colleges
              </button>
              <button 
                onClick={() => setCurrentView(NavView.INQUIRY)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${currentView === NavView.INQUIRY ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Inquiry
              </button>
              <button 
                onClick={() => setCurrentView(NavView.MAGIC_CAMPUS)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${currentView === NavView.MAGIC_CAMPUS ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <span>✨</span> Editor
              </button>
              <button 
                onClick={() => setCurrentView(NavView.VOICE_LOUNGE)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${currentView === NavView.VOICE_LOUNGE ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                 <span>🎙️</span> Lounge
              </button>
            </nav>

            <div className="flex items-center gap-3">
                 <button 
                    onClick={() => setCurrentView(NavView.REGISTER)}
                    className="hidden md:block px-4 py-2 text-sm font-bold text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors"
                 >
                    Partner
                 </button>
                 <button className="px-5 py-2 text-sm font-bold text-white bg-slate-900 rounded-full hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all active:scale-95">
                    Sign In
                 </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Mobile Tab Bar (Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-50 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
          <div className="flex justify-around items-center h-16 px-1">
             <button onClick={() => setCurrentView(NavView.HOME)} className={`flex-1 flex flex-col items-center justify-center gap-1 h-full ${currentView === NavView.HOME || currentView === NavView.DETAIL ? 'text-indigo-600' : 'text-slate-400'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                <span className="text-[10px] font-semibold">Home</span>
             </button>
             <button onClick={() => setCurrentView(NavView.INQUIRY)} className={`flex-1 flex flex-col items-center justify-center gap-1 h-full ${currentView === NavView.INQUIRY ? 'text-indigo-600' : 'text-slate-400'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                <span className="text-[10px] font-semibold">Ask</span>
             </button>
             <button onClick={() => setCurrentView(NavView.MAGIC_CAMPUS)} className={`flex-1 flex flex-col items-center justify-center gap-1 h-full ${currentView === NavView.MAGIC_CAMPUS ? 'text-indigo-600' : 'text-slate-400'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                <span className="text-[10px] font-semibold">Magic</span>
             </button>
             <button onClick={() => setCurrentView(NavView.VOICE_LOUNGE)} className={`flex-1 flex flex-col items-center justify-center gap-1 h-full ${currentView === NavView.VOICE_LOUNGE ? 'text-indigo-600' : 'text-slate-400'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                <span className="text-[10px] font-semibold">Voice</span>
             </button>
          </div>
      </div>

      {/* Footer - Only visible on desktop or scrollable areas */}
      <footer className="bg-slate-900 text-slate-300 py-12 hidden md:block">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 gap-8">
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Logo className="w-8 h-8" />
                    <span className="text-xl font-bold text-white">CollegeGate</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                    AI-powered educational platform connecting students with their dream institutes globally.
                </p>
            </div>
            <div>
                <h4 className="text-white font-semibold mb-4">Platform</h4>
                <ul className="space-y-2 text-sm">
                    <li><button onClick={() => setCurrentView(NavView.HOME)} className="hover:text-white transition-colors">Colleges</button></li>
                    <li><button onClick={() => setCurrentView(NavView.MAGIC_CAMPUS)} className="hover:text-white transition-colors">AI Campus Editor</button></li>
                    <li><button onClick={() => setCurrentView(NavView.VOICE_LOUNGE)} className="hover:text-white transition-colors">Counselor Lounge</button></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-semibold mb-4">Discover</h4>
                <ul className="space-y-2 text-sm">
                    <li><button onClick={() => { setFilterCategory('Engineering'); setCurrentView(NavView.HOME); }} className="hover:text-white transition-colors">B.Tech Colleges</button></li>
                    <li><button onClick={() => { setFilterCategory('Management'); setCurrentView(NavView.HOME); }} className="hover:text-white transition-colors">MBA Colleges</button></li>
                    <li><button onClick={() => { setFilterCategory('Medical'); setCurrentView(NavView.HOME); }} className="hover:text-white transition-colors">Medical Colleges</button></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-semibold mb-4">Connect</h4>
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">𝕏</div>
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">In</div>
                </div>
                <p className="text-xs text-slate-500 mt-4">© 2024 CollegeGate Inc.</p>
            </div>
         </div>
      </footer>
    </div>
  );
}

export default App;