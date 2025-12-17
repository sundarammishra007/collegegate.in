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
    specialization: '' // Only for counselor
  });
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password || !formData.name) {
        setError("All fields are required.");
        return;
    }

    if (activeTab === 'ADMIN' && formData.password !== 'admin123') {
        setError("Invalid Admin Password (Try: admin123)");
        return;
    }

    const newUser: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: activeTab,
        timestamp: new Date().toLocaleString(),
        specialization: activeTab === 'COUNSELOR' ? formData.specialization : undefined,
        studentId: activeTab === 'STUDENT' ? `ST-${Math.floor(Math.random() * 10000)}` : undefined
    };

    // --- Simulating Backend Storage in LocalStorage (The "Admin Log In" Data Store) ---
    const existingUsersStr = localStorage.getItem('collegegate_users');
    const existingUsers: User[] = existingUsersStr ? JSON.parse(existingUsersStr) : [];
    
    // Check for duplicates (simple email check)
    const isDuplicate = existingUsers.some(u => u.email === newUser.email && u.role === newUser.role);
    
    // For demo purposes, we log them in even if duplicate, but update the timestamp
    // In a real app, you'd check password hash
    if (!isDuplicate) {
        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem('collegegate_users', JSON.stringify(updatedUsers));
    }

    onLogin(newUser);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200">
            
            {/* Header / Tabs */}
            <div className="flex text-sm font-bold border-b border-slate-100">
                <button 
                    onClick={() => setActiveTab('STUDENT')}
                    className={`flex-1 py-4 text-center transition-colors ${activeTab === 'STUDENT' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                >
                    Student
                </button>
                <button 
                    onClick={() => setActiveTab('COUNSELOR')}
                    className={`flex-1 py-4 text-center transition-colors ${activeTab === 'COUNSELOR' ? 'bg-purple-600 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                >
                    Counselor
                </button>
                <button 
                    onClick={() => setActiveTab('ADMIN')}
                    className={`flex-1 py-4 text-center transition-colors ${activeTab === 'ADMIN' ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                >
                    Admin
                </button>
            </div>

            <div className="p-8">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">
                        {activeTab === 'STUDENT' && 'Student Login'}
                        {activeTab === 'COUNSELOR' && 'Counselor Portal'}
                        {activeTab === 'ADMIN' && 'Admin Access'}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        {activeTab === 'STUDENT' && 'Access AI tools and connect with counselors anonymously.'}
                        {activeTab === 'COUNSELOR' && 'Manage inquiries and guide students.'}
                        {activeTab === 'ADMIN' && 'View user logs and platform statistics.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">{error}</div>}
                    
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
                            'bg-slate-800 hover:bg-slate-900 shadow-slate-300'
                        }`}
                    >
                        Sign In
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