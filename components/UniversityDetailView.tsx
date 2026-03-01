import React from 'react';
import { University, Course, CourseMode } from '../types';
import { COURSES_DATA } from '../constants';

interface UniversityDetailViewProps {
  university: University;
  onBack: () => void;
  onInquiry: (courseName?: string) => void;
}

const UniversityDetailView: React.FC<UniversityDetailViewProps> = ({ university, onBack, onInquiry }) => {
  // Filter courses based on university modes
  // If university has 'Regular', show Regular courses.
  // If university has 'Online', show Online courses.
  // If university has 'Distance', show Distance courses.
  // We'll show a course if it supports ANY of the university's modes.
  // Actually, usually a university offers specific courses. 
  // Since we don't have a mapping, we will show ALL courses that *can* be taken in the modes this university supports.
  
  const availableCourses = COURSES_DATA.filter(course => 
    course.modes.some(mode => university.modes.includes(mode))
  );

  const groupedCourses = {
    Diploma: availableCourses.filter(c => c.type === 'Diploma'),
    UG: availableCourses.filter(c => c.type === 'UG'),
    PG: availableCourses.filter(c => c.type === 'PG'),
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-slate-900">
        <img 
            src={university.image} 
            alt={university.name} 
            className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        
        <button 
            onClick={onBack}
            className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition-colors"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap gap-2 mb-3">
                    {university.tags.map((tag, idx) => (
                        <span key={idx} className="bg-indigo-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            {tag}
                        </span>
                    ))}
                </div>
                <h1 className="text-3xl md:text-5xl font-black mb-2">{university.name}</h1>
                <p className="text-lg text-slate-300 flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {university.location}
                </p>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Modes Offered */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
            <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Study Modes Available</h3>
            <div className="flex gap-4">
                {university.modes.map(mode => (
                    <div key={mode} className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-slate-200">
                        <span className={`w-3 h-3 rounded-full ${mode === 'Regular' ? 'bg-indigo-500' : mode === 'Online' ? 'bg-emerald-500' : 'bg-orange-500'}`}></span>
                        <span className="font-bold text-slate-700">{mode}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Courses List */}
        <h2 className="text-2xl font-black text-slate-800 mb-6">Available Courses</h2>
        
        <div className="space-y-8">
            {Object.entries(groupedCourses).map(([type, courses]) => (
                courses.length > 0 && (
                    <div key={type}>
                        <h3 className="text-xl font-bold text-slate-700 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                            {type === 'UG' ? 'Undergraduate (UG)' : type === 'PG' ? 'Postgraduate (PG)' : 'Diploma Programs'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {courses.map(course => (
                                <div key={course.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col">
                                    <div className="flex items-start justify-between mb-3">
                                        <h4 className="font-bold text-slate-800 line-clamp-2">{course.name}</h4>
                                        <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-1 rounded font-bold uppercase">{course.type}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-4 line-clamp-2">{course.description}</p>
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex gap-1">
                                            {course.modes.filter(m => university.modes.includes(m)).map(m => (
                                                <span key={m} className={`w-2 h-2 rounded-full ${m === 'Regular' ? 'bg-indigo-400' : m === 'Online' ? 'bg-emerald-400' : 'bg-orange-400'}`} title={m}></span>
                                            ))}
                                        </div>
                                        <button 
                                            onClick={() => onInquiry(course.name)}
                                            className="text-indigo-600 text-xs font-bold hover:text-indigo-800 flex items-center gap-1"
                                        >
                                            Enquire
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>

        {availableCourses.length === 0 && (
            <div className="text-center py-12 text-slate-400">
                No courses found matching the available modes.
            </div>
        )}

      </div>
    </div>
  );
};

export default UniversityDetailView;
