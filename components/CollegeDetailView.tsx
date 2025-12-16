import React, { useState, useEffect } from 'react';
import { College } from '../types';

interface CollegeDetailViewProps {
  college: College;
  onBack: () => void;
  onInquiry: () => void;
  onCompare: (id: string) => void;
  isComparing: boolean;
}

const CollegeDetailView: React.FC<CollegeDetailViewProps> = ({ college, onBack, onInquiry, onCompare, isComparing }) => {
  const [imageError, setImageError] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  // Reset error state when college ID changes
  useEffect(() => {
    setImageError(false);
  }, [college.id]);

  // Generate a deterministic gradient based on the name string
  const getAvatarGradient = (name: string) => {
    const gradients = [
      'from-blue-500 to-indigo-600',
      'from-emerald-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-purple-500 to-fuchsia-600',
      'from-pink-500 to-rose-600',
      'from-yellow-500 to-amber-600',
      'from-cyan-500 to-blue-600',
      'from-lime-500 to-green-600',
      'from-violet-500 to-purple-700',
      'from-teal-400 to-cyan-600'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return gradients[Math.abs(hash) % gradients.length];
  };

  const handleShare = async () => {
    try {
        const shareData = {
            title: college.name,
            text: `Check out ${college.name} on CollegeGate!`,
            url: window.location.href
        };
        
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(window.location.href);
            setShowShareToast(true);
            setTimeout(() => setShowShareToast(false), 2000);
        }
    } catch (err) {
        console.error('Error sharing:', err);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-0">
      {/* Hero Header */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden bg-slate-800">
        {!imageError ? (
          <img 
            src={college.image} 
            alt={college.name} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[20s]"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <svg className="w-20 h-20 text-slate-700 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-slate-500 font-medium">Image Preview Unavailable</span>
          </div>
        )}
        
        {/* Overlay Gradient - Ensures text visibility even over placeholder */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-transparent pointer-events-none"></div>
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 z-10 bg-black/20 backdrop-blur-md p-2.5 rounded-full text-white hover:bg-black/40 transition-colors border border-white/10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>

        {/* Share Button */}
        <button 
          onClick={handleShare}
          className="absolute top-4 right-4 z-10 bg-black/20 backdrop-blur-md p-2.5 rounded-full text-white hover:bg-black/40 transition-colors border border-white/10 group"
          title="Share"
        >
          <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>

        {/* Share Toast */}
        {showShareToast && (
            <div className="absolute top-16 right-4 z-20 bg-emerald-500/90 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-md shadow-lg animate-bounce-in flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Link Copied
            </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white z-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-900/30">
                #{college.ranking} in Ranking
                </span>
                <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 border border-white/10">
                {college.country === 'India' ? '🇮🇳 India' : '🌎 International'}
                </span>
                {college.establishedYear && (
                    <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 border border-white/10">
                       Est. {college.establishedYear}
                    </span>
                )}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white mb-2 shadow-sm">{college.name}</h1>
            <p className="text-lg text-slate-200 flex items-center gap-2 opacity-90 font-medium">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {college.location}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Quick Stats (Mobile Friendly Grid) */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
               <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                 <div className="border-l-2 border-indigo-100 pl-4">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Annual Fees</p>
                    <p className="text-lg font-bold text-slate-800 mt-1">{college.fees}</p>
                 </div>
                 <div className="border-l-2 border-indigo-100 pl-4">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Exam Accepted</p>
                    <p className="text-lg font-bold text-indigo-600 mt-1">{college.exams[0]}</p>
                 </div>
                 <div className="border-l-2 border-indigo-100 pl-4">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Accreditation</p>
                    <p className="text-lg font-bold text-slate-800 mt-1">{college.accreditation || 'N/A'}</p>
                 </div>
                 <div className="border-l-2 border-indigo-100 pl-4">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Institution Type</p>
                    <p className="text-lg font-bold text-slate-800 mt-1">{college.tags.includes('Govt') ? 'Government' : 'Private'}</p>
                 </div>
                 {college.applicationDeadline && (
                     <div className="border-l-2 border-indigo-100 pl-4">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Deadline</p>
                        <p className="text-lg font-bold text-red-500 mt-1">{college.applicationDeadline}</p>
                     </div>
                 )}
                 {college.placementRecord && (
                     <div className="border-l-2 border-emerald-100 pl-4 col-span-2 md:col-span-1">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Placement Record</p>
                        <p className="text-lg font-bold text-emerald-600 mt-1">{college.placementRecord}</p>
                     </div>
                 )}
               </div>
            </section>

            {/* About Section */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-1 bg-indigo-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-slate-800">About the Institute</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg text-justify md:text-left">
                {college.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                 {college.tags.map(tag => (
                   <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">
                     #{tag}
                   </span>
                 ))}
              </div>
            </section>

            {/* Campus Facilities */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-1 bg-indigo-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-slate-800">Campus Life & Facilities</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {college.facilities?.map((facility, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-white border border-slate-100 shadow-sm rounded-xl hover:shadow-md transition-shadow group">
                       <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                       </div>
                       <span className="font-medium text-slate-700 text-sm">{facility}</span>
                    </div>
                 )) || <p className="text-slate-500 italic">Facility information not available.</p>}
              </div>
            </section>

            {/* Notable Alumni */}
            <section>
               <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-1 bg-indigo-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-slate-800">Notable Alumni</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {college.alumni?.map((alum, index) => (
                     <div key={index} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarGradient(alum)} flex items-center justify-center text-white font-bold text-xl shadow-md transform hover:scale-110 transition-transform duration-300`}>
                           {alum.charAt(0)}
                        </div>
                        <div>
                           <p className="font-bold text-slate-800">{alum}</p>
                           <p className="text-xs text-slate-500 font-medium">Distinguished Alumnus</p>
                        </div>
                     </div>
                  )) || <p className="text-slate-500 italic">Alumni information not available.</p>}
               </div>
            </section>
          </div>

          {/* Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
             <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-24">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Admissions 2025</h3>
                
                <div className="space-y-4 mb-8">
                   <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Status</span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        Open
                      </span>
                   </div>
                   <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Application Fee</span>
                      <span className="text-slate-800 font-bold">₹1,500</span>
                   </div>
                   <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Deadline</span>
                      <span className="text-red-600 font-bold">{college.applicationDeadline || 'Rolling'}</span>
                   </div>
                   <div className="flex justify-between items-start pb-3 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Exams</span>
                      <div className="text-right flex flex-col items-end gap-1">
                         {college.exams.map(e => <span key={e} className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded text-sm">{e}</span>)}
                      </div>
                   </div>
                </div>

                <div className="space-y-3">
                   <button 
                     onClick={onInquiry}
                     className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                   >
                      Apply Now
                   </button>
                   <button 
                      onClick={() => onCompare(college.id)}
                      className={`w-full py-3 font-bold rounded-xl border-2 transition-colors flex items-center justify-center gap-2 ${isComparing ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-600 hover:text-indigo-600'}`}
                   >
                      {isComparing ? (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            Remove
                          </>
                      ) : (
                          <>
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                             Compare
                          </>
                      )}
                   </button>
                   <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-xl border border-slate-200 transition-colors">
                      Download Brochure
                   </button>
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* Sticky Bottom Action Bar (Mobile Only) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-safe z-50 flex items-center gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <button 
            onClick={() => onCompare(college.id)}
            className={`p-3 rounded-xl border-2 ${isComparing ? 'bg-red-50 text-red-500 border-red-100' : 'bg-slate-50 text-slate-500 border-slate-200'}`}
          >
             {isComparing ? (
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
             ) : (
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
             )}
          </button>
          <button 
            onClick={onInquiry}
            className="flex-grow bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 active:scale-95 transition-transform"
          >
            Apply Now
          </button>
      </div>

    </div>
  );
};

export default CollegeDetailView;