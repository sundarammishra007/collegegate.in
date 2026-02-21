import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface SignInProps {
  onLogin: (user: User) => void;
  onCancel: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onLogin, onCancel }) => {
  const [activeTab, setActiveTab] = useState<UserRole>('STUDENT');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    whatsapp: '',
    specialization: '' // Only for partners if needed
  });
  const [sameAsMobile, setSameAsMobile] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
        const newData = { ...prev, [name]: value };
        if (name === 'mobile' && sameAsMobile) {
            newData.whatsapp = value;
        }
        return newData;
    });
    setError('');
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      setSameAsMobile(isChecked);
      if (isChecked) {
          setFormData(prev => ({ ...prev, whatsapp: prev.mobile }));
      }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password || !formData.name || !formData.mobile) {
        setError("Name, Email, Password and Mobile Number are required.");
        return;
    }

    if (activeTab === 'ADMIN' && formData.password !== 'admin123') {
        setError("Invalid Admin Password (Try: admin123)");
        return;
    }

    // --- Backend Storage Simulation (Local Storage) ---
    const existingUsersStr = localStorage.getItem('collegegate_users');
    const existingUsers: User[] = existingUsersStr ? JSON.parse(existingUsersStr) : [];
    
    // Find if user already exists
    const existingUser = existingUsers.find(u => u.email === formData.email && u.role === activeTab);

    if (existingUser) {
        if (existingUser.banned) {
            setError("⛔ Access Denied: Your account has been suspended by the Administrator.");
            return;
        }
        onLogin(existingUser);
    } else {
        // Create NEW user
        const newUser: User = {
            id: Date.now().toString(),
            name: formData.name,
            email: formData.email,
            role: activeTab,
            mobile: formData.mobile,
            whatsapp: formData.whatsapp || formData.mobile,
            timestamp: new Date().toLocaleString(),
            specialization: (activeTab === 'COLLEGE_PARTNER' || activeTab === 'ASSOCIATE_PARTNER') ? formData.specialization : undefined,
            studentId: activeTab === 'STUDENT' ? `ST-${Math.floor(Math.random() * 10000)}` : undefined,
            banned: false
        };

        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem('collegegate_users', JSON.stringify(updatedUsers));
        
        onLogin(newUser);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200">
            
            {/* Header / Tabs */}
            <div className="flex text-xs font-bold border-b border-slate-100 overflow-x-auto scrollbar-hide">
                <button 
                    onClick={() => setActiveTab('STUDENT')}
                    className={`flex-1 py-4 px-2 text-center transition-colors whitespace-nowrap ${activeTab === 'STUDENT' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                >
                    Student
                </button>
                <button 
                    onClick={() => setActiveTab('COLLEGE_PARTNER')}
                    className={`flex-1 py-4 px-2 text-center transition-colors whitespace-nowrap ${activeTab === 'COLLEGE_PARTNER' ? 'bg-orange-600 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                >
                    College Partner
                </button>
                <button 
                    onClick={() => setActiveTab('ASSOCIATE_PARTNER')}
                    className={`flex-1 py-4 px-2 text-center transition-colors whitespace-nowrap ${activeTab === 'ASSOCIATE_PARTNER' ? 'bg-teal-600 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                >
                    Associate
                </button>
                <button 
                    onClick={() => setActiveTab('ADMIN')}
                    className={`flex-1 py-4 px-2 text-center transition-colors whitespace-nowrap ${activeTab === 'ADMIN' ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                >
                    Admin
                </button>
            </div>

            <div className="p-8">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">
                        {activeTab === 'STUDENT' && 'Student Login'}
                        {activeTab === 'COLLEGE_PARTNER' && 'College Partner'}
                        {activeTab === 'ASSOCIATE_PARTNER' && 'Associate Partner'}
                        {activeTab === 'ADMIN' && 'Admin Access'}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        {activeTab === 'STUDENT' && 'Access courses and connect with counselors.'}
                        {activeTab === 'COLLEGE_PARTNER' && 'Manage college profile and admissions.'}
                        {activeTab === 'ASSOCIATE_PARTNER' && 'Manage student leads and inquiries.'}
                        {activeTab === 'ADMIN' && 'Platform administration.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-semibold animate-pulse">{error}</div>}
                    
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                        <input 
                            name="name"
                            type="text" 
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
                        <input 
                            name="email"
                            type="email" 
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="name@example.com"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mobile Number</label>
                            <input 
                                name="mobile"
                                type="tel" 
                                value={formData.mobile}
                                onChange={handleInputChange}
                                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="+91 98765 43210"
                            />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="block text-xs font-bold text-slate-500 uppercase">WhatsApp Number</label>
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={sameAsMobile} 
                                        onChange={handleCheckboxChange}
                                        className="rounded text-indigo-600 focus:ring-indigo-500 w-3 h-3"
                                    />
                                    <span className="text-[10px] text-slate-500">Same as Mobile</span>
                                </label>
                            </div>
                            <input 
                                name="whatsapp"
                                type="tel" 
                                value={formData.whatsapp}
                                onChange={handleInputChange}
                                disabled={sameAsMobile}
                                className={`w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none ${sameAsMobile ? 'bg-slate-50 text-slate-400' : ''}`}
                                placeholder="Alternate / WhatsApp No"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Password</label>
                        <input 
                            name="password"
                            type="password" 
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <button 
                        type="submit"
                        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 mt-4 ${
                            activeTab === 'STUDENT' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' :
                            activeTab === 'COLLEGE_PARTNER' ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-200' :
                            activeTab === 'ASSOCIATE_PARTNER' ? 'bg-teal-600 hover:bg-teal-700 shadow-teal-200' :
                            'bg-slate-800 hover:bg-slate-900 shadow-slate-300'
                        }`}
                    >
                        {activeTab === 'ADMIN' ? 'Admin Login' : 'Register / Login'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 text-sm">
                        Continue as Guest
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SignIn;