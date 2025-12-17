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
    specialization: '' // Only for counselor
  });
  const [sameAsMobile, setSameAsMobile] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
        const newData = { ...prev, [name]: value };
        // If "Same as Mobile" is checked and we are updating mobile, update whatsapp too
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

  const handleSocialLogin = (provider: 'Google' | 'Apple') => {
      // Mock Social Login
      const newUser: User = {
          id: `social-${Date.now()}`,
          name: `${provider} User`,
          email: `user@${provider.toLowerCase()}.com`,
          role: 'STUDENT',
          mobile: '',
          whatsapp: '',
          timestamp: new Date().toLocaleString(),
          studentId: `ST-${Math.floor(Math.random() * 10000)}`,
          banned: false
      };
      
      const existingUsersStr = localStorage.getItem('collegegate_users');
      const existingUsers: User[] = existingUsersStr ? JSON.parse(existingUsersStr) : [];
      localStorage.setItem('collegegate_users', JSON.stringify([...existingUsers, newUser]));
      
      onLogin(newUser);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password || !formData.name) {
        setError("Name, Email and Password are required.");
        return;
    }

    if (activeTab !== 'ADMIN') {
        if (!formData.mobile) {
            setError("Mobile number is required.");
            return;
        }
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
        // CHECK BAN STATUS
        if (existingUser.banned) {
            setError("⛔ Access Denied: Your account has been suspended by the Administrator.");
            return;
        }

        // Log in with existing user data (preserves ID)
        onLogin(existingUser);
    } else {
        // Create NEW user
        const newUser: User = {
            id: Date.now().toString(),
            name: formData.name,
            email: formData.email,
            role: activeTab,
            mobile: formData.mobile,
            whatsapp: formData.whatsapp || formData.mobile, // Fallback to mobile if not provided
            timestamp: new Date().toLocaleString(),
            specialization: activeTab === 'COUNSELOR' ? formData.specialization : undefined,
            studentId: (activeTab === 'STUDENT' || activeTab === 'TRAINEE') ? `ST-${Math.floor(Math.random() * 10000)}` : undefined,
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
            <div className="flex text-sm font-bold border-b border-slate-100 overflow-x-auto scrollbar-hide">
                <button 
                    onClick={() => setActiveTab('STUDENT')}
                    className={`flex-1 py-4 px-2 text-center transition-colors min-w-[80px] ${activeTab === 'STUDENT' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                >
                    Student
                </button>
                <button 
                    onClick={() => setActiveTab('COUNSELOR')}
                    className={`flex-1 py-4 px-2 text-center transition-colors min-w-[80px] ${activeTab === 'COUNSELOR' ? 'bg-purple-600 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                >
                    Counselor
                </button>
                <button 
                    onClick={() => setActiveTab('TRAINEE')}
                    className={`flex-1 py-4 px-2 text-center transition-colors min-w-[80px] ${activeTab === 'TRAINEE' ? 'bg-teal-600 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                >
                    Trainee
                </button>
                <button 
                    onClick={() => setActiveTab('ADMIN')}
                    className={`flex-1 py-4 px-2 text-center transition-colors min-w-[80px] ${activeTab === 'ADMIN' ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                >
                    Admin
                </button>
            </div>

            <div className="p-8">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">
                        {activeTab === 'STUDENT' && 'Student Login'}
                        {activeTab === 'COUNSELOR' && 'Counselor Portal'}
                        {activeTab === 'TRAINEE' && 'Training Mode'}
                        {activeTab === 'ADMIN' && 'Admin Access'}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        {activeTab === 'STUDENT' && 'Access AI tools and connect with counselors.'}
                        {activeTab === 'COUNSELOR' && 'Manage inquiries and guide students.'}
                        {activeTab === 'TRAINEE' && 'Practice counseling with AI Students.'}
                        {activeTab === 'ADMIN' && 'Platform administration.'}
                    </p>
                </div>

                {/* Social Login Buttons (Only for Students) */}
                {activeTab === 'STUDENT' && (
                    <div className="space-y-3 mb-6">
                        <button 
                            onClick={() => handleSocialLogin('Google')}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-700 font-semibold text-sm"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            Continue with Google
                        </button>
                        <button 
                             onClick={() => handleSocialLogin('Apple')}
                             className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-black text-white hover:bg-gray-900 transition-colors font-semibold text-sm"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 384 512" fill="currentColor">
                                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                            </svg>
                            Continue with Apple
                        </button>
                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-slate-200"></div>
                            <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-semibold">OR</span>
                            <div className="flex-grow border-t border-slate-200"></div>
                        </div>
                    </div>
                )}

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
                            placeholder={activeTab === 'COUNSELOR' ? "Dr. Jane Doe" : "John Doe"}
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

                    {/* Contact Details (Visible for Student, Counselor & Trainee) */}
                    {activeTab !== 'ADMIN' && (
                        <>
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
                        </>
                    )}

                    {activeTab === 'COUNSELOR' && (
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Specialization</label>
                            <input 
                                name="specialization"
                                type="text" 
                                value={formData.specialization}
                                onChange={handleInputChange}
                                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none"
                                placeholder="e.g. Engineering, Study Abroad"
                            />
                        </div>
                    )}

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
                            activeTab === 'COUNSELOR' ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-200' :
                            activeTab === 'TRAINEE' ? 'bg-teal-600 hover:bg-teal-700 shadow-teal-200' :
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