import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UNIVERSITIES_DATA, COURSES_DATA } from '../constants';

const RegularUniversities = () => {
  const navigate = useNavigate();

  const regularCourses = COURSES_DATA.filter(c => c.modes.includes('Regular'));
  const regularUniversities = UNIVERSITIES_DATA.filter(u => u.modes.includes('Regular'));

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-orange-500 text-white text-xs font-bold tracking-wider mb-4 animate-pulse">
            ADMISSION OPEN 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            All Regular Universities <br/>
            <span className="text-orange-400">Regular Courses</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 font-light">
            100% Govt & Private Job Valid Degree | Campus Based Study
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="text-yellow-400">⭐</span>
              <span className="font-semibold">UGC Approved</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="text-yellow-400">⭐</span>
              <span className="font-semibold">NAAC Accredited</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="text-yellow-400">⭐</span>
              <span className="font-semibold">AICTE Recognized</span>
            </div>
          </div>

          <button 
            onClick={() => window.open('https://wa.me/917033827101?text=REGULAR%20YES', '_blank')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-orange-500/30 transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <span>Reply: REGULAR YES</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        {/* Stats/Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
          {[
            { title: 'Campus Classes', icon: '🏫', desc: 'Regular classroom learning' },
            { title: 'Practical Training', icon: '🔬', desc: 'Hands-on lab experience' },
            { title: 'Internship', icon: '💼', desc: 'Industry exposure' },
            { title: 'Placement Support', icon: '🚀', desc: 'Career assistance' }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-lg text-slate-800 mb-1">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Study Domains */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Regular Mode – Campus Based Study</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Engineering', 'Management', 'Law', 'Pharmacy', 'Agriculture', 'IT', 'Commerce'].map((domain) => (
              <span key={domain} className="px-6 py-3 rounded-lg bg-indigo-50 text-indigo-700 font-bold border border-indigo-100 hover:bg-indigo-100 transition-colors cursor-default">
                {domain}
              </span>
            ))}
          </div>
        </div>

        {/* Popular Courses */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Popular Courses</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {['B.Tech', 'BCA', 'BBA', 'B.Com', 'MBA', 'MCA', 'B.Pharm', 'LL.B', 'B.Sc', 'M.Tech'].map((course) => (
              <div key={course} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center hover:border-indigo-500 transition-colors group cursor-pointer">
                <div className="font-bold text-slate-700 group-hover:text-indigo-600">{course}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Universities List */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Participating Universities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularUniversities.map((uni) => (
              <div key={uni.id} onClick={() => navigate(`/university/${uni.id}`)} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group border border-slate-100">
                <div className="h-48 overflow-hidden relative">
                  <img src={uni.image} alt={uni.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indigo-600 shadow-sm">
                    Regular
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={uni.logo} alt="logo" className="w-10 h-10 rounded-full border border-slate-200" />
                    <div>
                      <h3 className="font-bold text-slate-900 line-clamp-1">{uni.name}</h3>
                      <p className="text-xs text-slate-500">{uni.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {uni.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="w-full py-2 rounded-lg bg-indigo-50 text-indigo-600 font-bold text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h2 className="text-3xl font-bold mb-4 relative z-10">Limited Seats – Apply Now</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
            Secure your future with a valid degree from top UGC approved universities. 
            Don't miss the opportunity for the 2026 academic session.
          </p>
          <button 
            onClick={() => window.open('https://wa.me/917033827101?text=REGULAR%20YES', '_blank')}
            className="bg-white text-slate-900 font-bold py-3 px-8 rounded-full hover:bg-indigo-50 transition-colors relative z-10"
          >
            Chat on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegularUniversities;
