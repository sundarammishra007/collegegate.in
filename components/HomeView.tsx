import React from 'react';
import { Course, CourseMode, University } from '../types';
import { UNIVERSITIES_DATA } from '../constants';

interface HomeViewProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedMode: CourseMode;
  setSelectedMode: (mode: CourseMode) => void;
  courses: Course[];
  onInquiry: () => void;
  onUniversityClick: (id: string) => void;
  onAboutClick: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({
  searchTerm,
  setSearchTerm,
  selectedMode,
  setSelectedMode,
  courses,
  onInquiry,
  onUniversityClick,
  onAboutClick
}) => {
  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMode = c.modes.includes(selectedMode);
    return matchesSearch && matchesMode;
  });

  const groupedCourses = {
    Diploma: filteredCourses.filter(c => c.type === 'Diploma'),
    UG: filteredCourses.filter(c => c.type === 'UG'),
    PG: filteredCourses.filter(c => c.type === 'PG'),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative pb-24 md:pb-12">
      <div className="mb-6 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-xl shadow-indigo-200/50">
         <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold mb-1">Your Future Starts Here</h2>
            <p className="text-indigo-100">Explore top courses and universities.</p>
         </div>
         <div className="flex gap-3">
              <button onClick={onInquiry} className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-2xl font-bold hover:bg-white/30 transition-all border border-white/20">Enquire Now</button>
              <button onClick={onAboutClick} className="bg-white text-indigo-700 px-6 py-3 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-lg">About Us</button>
         </div>
      </div>

      <div className="sticky top-[64px] z-30 bg-[#f8fafc]/95 backdrop-blur-md pt-2 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:static md:bg-transparent mb-6">
          <div className="space-y-4">
              <div className="relative w-full shadow-sm">
                  <input type="text" placeholder="Search courses..." className="w-full pl-12 pr-10 py-4 rounded-2xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-slate-700 shadow-md" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  <svg className="absolute left-4 top-4.5 h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              
              <div className="flex w-full bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
                  {(['Regular', 'Online', 'Distance'] as const).map((mode) => (
                      <button
                          key={mode}
                          onClick={() => setSelectedMode(mode)}
                          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                              selectedMode === mode 
                              ? 'bg-indigo-600 text-white shadow-md' 
                              : 'text-slate-500 hover:bg-slate-50'
                          }`}
                      >
                          {mode}
                      </button>
                  ))}
              </div>
          </div>
      </div>

      <div className="space-y-12">
        {/* Course Sections */}
        {Object.entries(groupedCourses).map(([type, typeCourses]) => (
           typeCourses.length > 0 && (
              <div key={type}>
                  <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                      {type === 'UG' ? 'Undergraduate (UG)' : type === 'PG' ? 'Postgraduate (PG)' : 'Diploma Programs'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {typeCourses.map((course) => (
                          <div key={course.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer" onClick={onInquiry}>
                              <div className="flex items-start justify-between mb-4">
                                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                      🎓
                                  </div>
                                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{course.type}</span>
                              </div>
                              <h4 className="font-bold text-slate-800 text-lg mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{course.name}</h4>
                              <p className="text-sm text-slate-500 mb-4 line-clamp-2">{course.description}</p>
                              <div className="flex gap-2 mt-auto">
                                  {course.modes.map(m => (
                                      <span key={m} className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                                          m === 'Regular' ? 'bg-indigo-50 text-indigo-600' :
                                          m === 'Online' ? 'bg-emerald-50 text-emerald-600' :
                                          'bg-orange-50 text-orange-600'
                                      }`}>
                                          {m}
                                      </span>
                                  ))}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
           )
        ))}

        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No courses found matching your criteria.</p>
          </div>
        )}

        {/* Universities Section */}
        <div className="mt-16 pt-16 border-t border-slate-200">
            <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-2">
                <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
                Top Partner Universities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {UNIVERSITIES_DATA.filter(u => u.modes.includes(selectedMode) || u.modes.includes('Regular')).map((uni) => (
                    <div 
                      key={uni.id} 
                      className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center group cursor-pointer relative overflow-hidden"
                      onClick={() => onUniversityClick(uni.id)}
                    >
                        {/* Hurry Up Badge */}
                        <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-bl-xl animate-pulse z-10">
                            HURRY UP!
                        </div>

                        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-slate-50 group-hover:border-indigo-50 transition-colors">
                            <img src={uni.image} alt={uni.name} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-bold text-slate-800 mb-1 leading-tight">{uni.name}</h4>
                        <p className="text-xs text-slate-500 mb-3">{uni.location}</p>
                        <div className="flex flex-wrap justify-center gap-1 mb-3">
                            {uni.tags.map((tag, idx) => (
                                <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">{tag}</span>
                            ))}
                        </div>
                        <div className="mt-auto flex gap-1">
                            {uni.modes.map(m => (
                                <span key={m} className={`w-2 h-2 rounded-full ${m === 'Regular' ? 'bg-indigo-400' : m === 'Online' ? 'bg-emerald-400' : 'bg-orange-400'}`} title={m}></span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
