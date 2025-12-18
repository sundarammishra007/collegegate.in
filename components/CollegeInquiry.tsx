import React, { useState } from 'react';
import { User, Inquiry } from '../types';

interface CollegeInquiryProps {
  user?: User | null;
  onSubmit?: (inquiry: Inquiry) => void;
  onCancel: () => void;
}

const CollegeInquiry: React.FC<CollegeInquiryProps> = ({ user, onSubmit, onCancel }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
      course: '',
      query: '',
      city: '',
      phone: ''
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInquiry: Inquiry = {
        id: Date.now().toString(),
        studentName: user ? user.name : 'Anonymous Student',
        studentId: user?.studentId || 'GUEST',
        course: formData.course,
        query: formData.query,
        timestamp: new Date().toLocaleString(),
        status: 'PENDING'
    };
    if (onSubmit) onSubmit(newInquiry);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-12 text-center bg-white rounded-3xl shadow-2xl border border-green-100 mt-10">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-4">Inquiry Received!</h2>
        <p className="text-slate-500 mb-8 font-medium">Our counselors specialize in Art, Agri, and Tech paths and will review your request shortly.</p>
        <button onClick={onCancel} className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg">Back to Explore</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="bg-slate-900 md:w-1/3 p-10 text-white flex flex-col justify-between relative">
          <div className="z-10">
            <h2 className="text-3xl font-black mb-4">Consultation</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">Whether it's a Fine Arts degree in Mumbai or a Data Science course on Coursera, we're here to guide you.</p>
            <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-bold text-indigo-400 uppercase tracking-widest"><span className="w-2 h-2 rounded-full bg-indigo-400"></span> Career Roadmaps</div>
                <div className="flex items-center gap-3 text-xs font-bold text-emerald-400 uppercase tracking-widest"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Fee Comparisons</div>
                <div className="flex items-center gap-3 text-xs font-bold text-orange-400 uppercase tracking-widest"><span className="w-2 h-2 rounded-full bg-orange-400"></span> Placement Stats</div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        </div>

        <div className="md:w-2/3 p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-2xl font-black text-slate-800">What are you looking for?</h3>
            <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Academic Interest</label>
                <select 
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold text-slate-700 outline-none focus:border-indigo-500 transition-all appearance-none" 
                    required
                >
                  <option value="">Course Selection</option>
                  <option value="ART">Fine Arts / Design</option>
                  <option value="AGRICULTURE">Agriculture / Farming Tech</option>
                  <option value="BTECH">Engineering (B.Tech)</option>
                  <option value="MBA">Management (MBA)</option>
                  <option value="ONLINE">Online Degrees (Remote)</option>
                  <option value="SKILLS">Specific Skill Training</option>
                </select>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Message</label>
               <textarea rows={4} value={formData.query} onChange={(e) => setFormData({...formData, query: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold text-slate-700 outline-none focus:border-indigo-500 transition-all" placeholder="Tell us about your background or the specific skill you want to learn..." required />
            </div>

            <div className="flex gap-4 pt-4">
              <button type="button" onClick={onCancel} className="px-8 py-4 rounded-2xl text-slate-400 font-black hover:bg-slate-50 transition-all">Cancel</button>
              <button type="submit" className="flex-grow px-8 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 shadow-xl active:scale-95 transition-all">Send Inquiry</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CollegeInquiry;