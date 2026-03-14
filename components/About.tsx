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
              <p className="text-sm font-semibold">Dynamic Profiles: Beyond simple resumes, students track their "Purpose of Life," "Dreams," and "Skills," ensuring they are seen as holistic candidates by top recruiters.</p>
            </div>
            <div className="bg-violet-50 p-6 rounded-2xl border border-violet-100">
              <h3 className="font-bold text-violet-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">🎖️</span> College Ambassadors
              </h3>
              <p className="text-sm mb-2">Our student leaders who drive the mission forward. Ambassadors represent CollegeGate within their campuses.</p>
              <p className="text-sm font-semibold">Impact & Rewards: By connecting peers to the platform, Ambassadors earn official Certificates of Excellence from CollegeGate once they reach the 50-connection milestone, validating their leadership and networking skills.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">🏛️</span> University & College Partners
              </h3>
              <p className="text-sm mb-2">Verified institutions have the power to manage their digital presence.</p>
              <p className="text-sm font-semibold">Data Control: Partners can update institutional data, manage course listings, and Notify the Audience instantly about upcoming deadlines, campus drives, or academic updates.</p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <h3 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">🏢</span> Company & Government Officials
              </h3>
              <p className="text-sm mb-2">The bridge to the professional world.</p>
              <p className="text-sm font-semibold">Opportunity Hub: Companies and government bodies can publish internships, job openings, and policy updates directly to the relevant student demographics, ensuring the right talent finds the right opportunity.</p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-8">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="text-2xl">🛡️</span> The Admin (The Gatekeeper)
            </h3>
            <p className="text-sm mb-2">The central authority ensuring quality and security.</p>
            <p className="text-sm font-semibold mb-1">Verification: Admins manually approve all new college partnerships and government info updates.</p>
            <p className="text-sm font-semibold">Validation: They oversee the final approval for Ambassador certifications and maintain sole rights to edit and publish site-wide content.</p>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Commitment to Transparency</h2>
            <p className="text-lg mb-4">
              We operate with a "Privacy First" mindset. Every user interaction is protected by our secure login system—featuring Best Friend security recovery—and a clear consent-based data policy.
            </p>
            <p className="text-lg font-medium text-indigo-700">
              For all official inquiries, partnership requests, or support, our team is available at: <br/>
              <a href="mailto:info@collegegate.in" className="underline hover:text-indigo-900">📧 info@collegegate.in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
