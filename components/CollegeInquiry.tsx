import React, { useState } from 'react';
import { User, Inquiry, CourseMode } from '../types';

interface CollegeInquiryProps {
  user?: User | null;
  collegeName?: string;
  onSubmit?: (inquiry: Inquiry) => void;
  onClose: () => void;
}

const CollegeInquiry: React.FC<CollegeInquiryProps> = ({ user, collegeName, onSubmit, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
      name: user?.name || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
      whatsapp: user?.whatsapp || '',
      course: '',
      mode: 'Regular' as CourseMode,
      query: ''
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInquiry: Inquiry = {
        id: Date.now().toString(),
        studentName: formData.name,
        studentId: user?.studentId || 'GUEST',
        email: formData.email,
        mobile: formData.mobile,
        whatsapp: formData.whatsapp,
        course: formData.course,
        mode: formData.mode,
        query: formData.query,
        timestamp: new Date().toLocaleString(),
        status: 'PENDING'
    };
    if (onSubmit) onSubmit(newInquiry);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Inquiry Sent!</h2>
        <p className="text-slate-500 mb-6">Our counselors will contact you shortly via WhatsApp or Phone.</p>
        <button onClick={onClose} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all w-full">Close</button>
      </div>
    );
  }

  return (
    <div className="p-6 max-h-[80vh] overflow-y-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
            <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="John Doe"
                required
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mobile Number</label>
                <input 
                    type="tel" 
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="+91 98765 43210"
                    required
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">WhatsApp Number</label>
                <input 
                    type="tel" 
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Optional"
                />
            </div>
        </div>

        <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
            <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="name@example.com"
                required
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Interested Course</label>
                <input 
                    type="text" 
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g. B.Tech, MBA"
                    required
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Preferred Mode</label>
                <select 
                    value={formData.mode}
                    onChange={(e) => setFormData({...formData, mode: e.target.value as CourseMode})}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                >
                    <option value="Regular">Regular</option>
                    <option value="Online">Online</option>
                    <option value="Distance">Distance</option>
                </select>
            </div>
        </div>

        <div>
           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Your Query</label>
           <textarea 
                rows={3} 
                value={formData.query} 
                onChange={(e) => setFormData({...formData, query: e.target.value})} 
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="Any specific questions?" 
                required 
            />
        </div>

        <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:scale-95 transition-all mt-2">
            Submit Inquiry
        </button>
      </form>
    </div>
  );
};

export default CollegeInquiry;