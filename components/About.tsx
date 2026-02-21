import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-black mb-4">About CollegeGate</h1>
          <p className="text-indigo-100 text-lg font-medium max-w-2xl">
            Democratizing college education across India.
          </p>
        </div>
        
        <div className="p-8 md:p-12 space-y-8 text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-lg">
              CollegeGate is India's pioneering platform designed to democratize college education. We believe that every student deserves access to accurate, comprehensive information about colleges without paying a single rupee.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 py-4">
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
              <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">🎓</span> For Students
              </h3>
              <p className="text-sm">Discover dream colleges with AI assistance and get guidance without barriers.</p>
            </div>
            <div className="bg-violet-50 p-6 rounded-2xl border border-violet-100">
              <h3 className="font-bold text-violet-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">🏛️</span> For Colleges
              </h3>
              <p className="text-sm">Connect directly with prospective students in a unified ecosystem.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">🧭</span> For Counselors
              </h3>
              <p className="text-sm">Guide aspirants and share expertise to help the next generation.</p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <h3 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">🤝</span> For Volunteers
              </h3>
              <p className="text-sm">Contribute knowledge to help others succeed in their educational journey.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">The Movement</h2>
            <p className="text-lg">
              We're more than a platform—we're a movement to make quality college guidance accessible to every student in India, regardless of their background or financial situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
