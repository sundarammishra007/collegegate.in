import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-black mb-4">About CollegeGate: Bridging the Gap from Campus to Career</h1>
        </div>
        
        <div className="p-8 md:p-12 space-y-8 text-slate-700 leading-relaxed">
          <div>
            <p className="text-lg mb-6">
              CollegeGate is a next-generation educational ecosystem designed to transform the journey from student life to professional success. We believe a degree is just the beginning; our mission is to provide the tools, data, and connections necessary to build a definitive future.
            </p>
            <p className="text-lg">
              By integrating real-time academic data with premium career opportunities, we serve as the central nervous system for India’s higher education landscape.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Our Ecosystem Roles</h2>

          <div className="grid md:grid-cols-2 gap-8 py-4">
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
              <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">🎓</span> For Students
              </h3>
              <p className="text-sm mb-2">The core of our platform. Students gain access to real-time cut-offs, premium internships, and world-class courses across Management, Engineering, Law, Medical, and Media.</p>
              <p className="text-sm font-semibold">Dynamic Profiles: Beyond simple resumes, students track their "Purpose of Life," "Dreams," and "Skills," ensuring they are seen as holistic candidates.</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">🏛️</span> University & College Partners
              </h3>
              <p className="text-sm mb-2">Verified institutions have the power to manage their digital presence and institutional data.</p>
              <p className="text-sm font-semibold">Data Control: Partners can update course listings and notify the audience instantly about upcoming deadlines or campus drives.</p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-8">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="text-2xl">🛡️</span> The Admin (The Gatekeeper)
            </h3>
            <p className="text-sm mb-2">The central authority ensuring quality and security for all ecosystem participants.</p>
            <p className="text-sm font-semibold mb-1">Verification: Admins manually approve all new college partnerships to ensure data integrity.</p>
            <p className="text-sm font-semibold">Validation: They maintain sole rights to edit and publish site-wide content, acting as the final layer of trust.</p>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Commitment to Transparency</h2>
            <p className="text-lg mb-4">
              We operate with a "Privacy First" mindset. Every user interaction is protected by our secure login system and a clear consent-based data policy.
            </p>
            <p className="text-lg font-medium text-indigo-700">
              For all official inquiries or partnership requests, our team is available at: <br/>
              <a href="mailto:info@collegegate.in" className="underline hover:text-indigo-900">📧 info@collegegate.in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
