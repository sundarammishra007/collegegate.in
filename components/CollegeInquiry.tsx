import React, { useState } from 'react';

interface CollegeInquiryProps {
  onCancel: () => void;
}

const CollegeInquiry: React.FC<CollegeInquiryProps> = ({ onCancel }) => {
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center bg-white rounded-2xl shadow-xl border border-green-100 mt-10">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Inquiry Received!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for showing interest. Our expert counselors will analyze your profile and contact you within 24 hours with a personalized list of colleges.
        </p>
        <button 
          onClick={onCancel}
          className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
        >
          Explore More Colleges
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Visual */}
        <div className="bg-indigo-600 md:w-1/3 p-8 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Ask to College</h2>
            <p className="text-indigo-100 mb-6">
              Confused about MBA, B.Tech, or MBBS? Fill this form and let colleges compete for you.
            </p>
            <ul className="space-y-3 text-sm text-indigo-100">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Get Brochure & Fee Structure
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Compare Placement Records
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Scholarship Assistance
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <p className="text-xs opacity-70">Trusted by 2M+ Students</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-2/3 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Tell us about yourself</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Full Name</label>
                <input type="text" className="w-full border-b-2 border-gray-200 focus:border-indigo-600 outline-none py-2 transition-colors" placeholder="John Doe" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Phone Number</label>
                <input type="tel" className="w-full border-b-2 border-gray-200 focus:border-indigo-600 outline-none py-2 transition-colors" placeholder="+91 98765 43210" required />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Email Address</label>
              <input type="email" className="w-full border-b-2 border-gray-200 focus:border-indigo-600 outline-none py-2 transition-colors" placeholder="john@example.com" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Course Interest</label>
                <select className="w-full border-b-2 border-gray-200 focus:border-indigo-600 outline-none py-2 bg-transparent" required>
                  <option value="">Select Course</option>
                  <option value="MBA">MBA / PGDM</option>
                  <option value="BTECH">B.Tech / B.E</option>
                  <option value="MBBS">Medical (MBBS/BDS)</option>
                  <option value="LAW">Law (LLB/LLM)</option>
                  <option value="DESIGN">Design (Fashion/Interior)</option>
                  <option value="ONLINE">Online Degree (UG/PG)</option>
                  <option value="ABROAD">Study Abroad</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Current City</label>
                <input type="text" className="w-full border-b-2 border-gray-200 focus:border-indigo-600 outline-none py-2 transition-colors" placeholder="e.g. Mumbai" />
              </div>
            </div>

            <div className="space-y-1">
               <label className="text-xs font-semibold text-gray-500 uppercase">Specific Query (Optional)</label>
               <textarea rows={3} className="w-full border-2 border-gray-100 rounded-lg p-3 focus:border-indigo-600 outline-none transition-colors text-sm" placeholder="I am looking for colleges with low fees and good placement in Computer Science..."></textarea>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button 
                type="button" 
                onClick={onCancel}
                className="px-6 py-2 rounded-lg text-gray-500 hover:bg-gray-100 font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="flex-grow px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
              >
                Get Best Colleges
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CollegeInquiry;