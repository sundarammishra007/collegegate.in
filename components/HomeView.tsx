import React, { useState, useEffect } from 'react';
import { Course, CourseMode, University, College, LiveUpdate } from '../types';
import { UNIVERSITIES_DATA, MOCK_LIVE_UPDATES } from '../constants';
// REMOVED: import { subscribeToLiveUpdates } from '../services/supabase'; 
import CollegeRankings from './CollegeRankings';

interface HomeViewProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedMode: CourseMode;
  setSelectedMode: (mode: CourseMode) => void;
  selectedCountry?: 'All' | 'India' | 'Abroad';
  courses: Course[];
  universities: University[];
  colleges: College[];
  activeTab: 'all' | 'courses' | 'colleges';
  onInquiry: () => void;
  onUniversityClick: (id: string) => void;
  onCollegeClick: (id: string) => void;
  onAboutClick: () => void;
  onGetStarted: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({
  searchTerm,
  setSearchTerm,
  selectedMode,
  setSelectedMode,
  selectedCountry = 'All',
  courses,
  universities,
  colleges,
  activeTab,
  onInquiry,
  onUniversityClick,
  onCollegeClick,
  onAboutClick,
  onGetStarted
}) => {
  // Initialize with MOCK_LIVE_UPDATES so the screen isn't empty
  const [liveUpdates, setLiveUpdates] = useState<LiveUpdate[]>(MOCK_LIVE_UPDATES);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    // Logic for Firebase Live Updates can be added here later.
    // For now, we use the MOCK_LIVE_UPDATES to ensure the build passes.
    setLiveUpdates(MOCK_LIVE_UPDATES);
  }, []);

  const heroSlides = liveUpdates.filter(update => update.is_highlight).slice(0, 3);

  useEffect(() => {
    if (heroSlides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative pb-24 md:pb-12">
      <div className="mb-6 relative rounded-3xl overflow-hidden shadow-xl shadow-indigo-200/50 min-h-[500px] flex flex-col md:flex-row items-stretch bg-slate-900">
          {/* Left Side: Value Proposition */}
          <div className="relative z-10 p-8 md:p-12 text-white flex flex-col justify-center w-full md:w-1/2 bg-gradient-to-br from-slate-900 to-indigo-900">
              <div className="mb-8 max-w-xl">
                 <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight">Bridge the Gap from Campus to Career.</h2>
                 <p className="text-slate-300 text-lg font-medium leading-relaxed">Access real-time cut-offs, premium internships, and world-class courses. Don't just get a degree—build a future.</p>
              </div>
              <div className="flex flex-col items-start gap-4">
                   <button onClick={onGetStarted} className="bg-[#E97D22] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#d6721e] transition-all shadow-lg shadow-orange-500/30 text-center whitespace-nowrap transform hover:scale-105">Get Started for Free</button>
                   <p className="text-sm font-semibold text-slate-400 tracking-wide uppercase">Don't wait. Switch to CollegeGate.</p>
              </div>
          </div>

          {/* Right Side: Dynamic Live Slider */}
          <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-full bg-slate-800 overflow-hidden">
             {heroSlides.map((slide, index) => (
                 <div 
                     key={slide.id} 
                     className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                 >
                     {slide.imageUrl && (
                         <img src={slide.imageUrl} alt={slide.title} className="absolute inset-0 w-full h-full object-cover opacity-40" />
                     )}
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                     
                     <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                         <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4 shadow-md">
                             🔥 {slide.category}
                         </span>
                         <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">{slide.title}</h3>
                         <ul className="space-y-2 mb-6">
                             {slide.description.map((point, i) => (
                                 <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                                     <span className="text-indigo-400 mt-0.5">•</span>
                                     <span>{point}</span>
                                 </li>
                             ))}
                         </ul>
                         <button 
                             onClick={() => window.open(slide.original_source_url, '_blank')}
                             className="text-white font-bold text-sm flex items-center gap-2 hover:text-indigo-300 transition-colors"
                         >
                             View Details <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                         </button>
                     </div>
                 </div>
             ))}
             
             {/* Slider Indicators */}
             <div className="absolute bottom-6 right-8 z-20 flex gap-2">
                 {heroSlides.map((_, index) => (
                     <button 
                         key={index}
                         onClick={() => setCurrentSlideIndex(index)}
                         className={`w-2 h-2 rounded-full transition-all ${index === currentSlideIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'}`}
                     />
                 ))}
             </div>
          </div>
      </div>

      <div className="space-y-12">
        {activeTab === 'all' && (
            <div className="mt-16 pt-16 border-t border-slate-200 space-y-16">
                
                {/* University Hub: Exams & Cut-offs */}
                <div>
                    <div className="flex justify-between items-end mb-8">
                        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                            <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                            University Hub: Exams & Cut-offs
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {liveUpdates.filter(u => u.category === 'Exam').map(update => (
                            <div key={update.id} onClick={() => window.open(update.original_source_url, '_blank')} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">{update.category}</span>
                                    <span className="text-xs text-slate-400 font-medium">{new Date(update.timestamp).toLocaleDateString()}</span>
                                </div>
                                <h4 className="font-bold text-slate-800 text-lg mb-3 group-hover:text-blue-600 transition-colors">{update.title}</h4>
                                <ul className="space-y-2 mb-4">
                                    {update.description.map((point, i) => (
                                        <li key={i} className="text-slate-500 text-sm flex items-start gap-2">
                                            <span className="text-blue-400 mt-0.5">•</span>
                                            <span className="line-clamp-2">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                                <span className="text-blue-600 text-sm font-bold flex items-center gap-1 mt-auto">
                                    Official Portal <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Opportunities: Apprenticeships & Internships */}
                <div>
                    <div className="flex justify-between items-end mb-8">
                        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                            Live Opportunities
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {liveUpdates.filter(u => u.category === 'Apprenticeship' || u.category === 'Internship').map(update => (
                            <div key={update.id} onClick={() => window.open(update.original_source_url, '_blank')} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${update.category === 'Apprenticeship' ? 'text-emerald-600 bg-emerald-50' : 'text-teal-600 bg-teal-50'}`}>{update.category}</span>
                                    <span className="text-xs text-slate-400 font-medium">{new Date(update.timestamp).toLocaleDateString()}</span>
                                </div>
                                <h4 className="font-bold text-slate-800 text-lg mb-3 group-hover:text-emerald-600 transition-colors">{update.title}</h4>
                                <ul className="space-y-2 mb-4">
                                    {update.description.map((point, i) => (
                                        <li key={i} className="text-slate-500 text-sm flex items-start gap-2">
                                            <span className="text-emerald-400 mt-0.5">•</span>
                                            <span className="line-clamp-2">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                                <span className="text-emerald-600 text-sm font-bold flex items-center gap-1 mt-auto">
                                    Apply Now <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* Universities & Colleges */}
        {(activeTab === 'all' || activeTab === 'colleges') && (
          <div className="mt-16 pt-16 border-t border-slate-200">
              <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-2">
                  <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
                  Top Partner Universities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {universities.filter(u => 
                    (selectedCountry === 'All' || u.country === selectedCountry)
                  ).map((uni) => (
                      <div 
                        key={uni.id} 
                        className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center group cursor-pointer relative overflow-hidden"
                        onClick={() => onUniversityClick(uni.id)}
                      >
                          <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-bl-xl animate-pulse z-10">
                              HURRY UP!
                          </div>

                          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-slate-50 group-hover:border-indigo-50 transition-colors">
                              <img src={uni.image} alt={uni.name} className="w-full h-full object-cover" />
                          </div>
                          <h4 className="font-bold text-slate-800 mb-1 leading-tight">{uni.name}</h4>
                          <p className="text-xs text-slate-500 mb-3">{uni.location}</p>
                          <button className="w-full py-2 bg-indigo-50 text-indigo-600 font-bold text-xs rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                              More Details
                          </button>
                      </div>
                  ))}
              </div>
              <CollegeRankings colleges={colleges} onCollegeClick={onCollegeClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeView;
