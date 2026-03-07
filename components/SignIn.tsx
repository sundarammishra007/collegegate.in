import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { auth, db, googleProvider } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface SignInProps {
  onLogin: (user: User) => void;
  onCancel: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onLogin, onCancel }) => {
  const [activeTab, setActiveTab] = useState<UserRole>('STUDENT');
  const [isLogin, setIsLogin] = useState(true);
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
  const [loading, setLoading] = useState(false);

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

  const saveUserToFirestore = async (uid: string, email: string, name: string) => {
      const newUser: User = {
          id: uid,
          name: name,
          email: email,
          role: activeTab,
          mobile: formData.mobile,
          whatsapp: formData.whatsapp || formData.mobile,
          timestamp: new Date().toISOString(),
          specialization: (activeTab === 'COLLEGE_PARTNER' || activeTab === 'ASSOCIATE_PARTNER') ? formData.specialization : undefined,
          studentId: activeTab === 'STUDENT' ? `ST-${Math.floor(Math.random() * 10000)}` : undefined,
          banned: false
      };
      
      await setDoc(doc(db, 'users', uid), newUser);
      return newUser;
  };

  const handleGoogleSignIn = async () => {
      setLoading(true);
      setError('');
      try {
          const result = await signInWithPopup(auth, googleProvider);
          const user = result.user;
          
          // Check if user exists in Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          
          if (userDoc.exists()) {
              const userData = userDoc.data() as User;
              if (userData.banned) {
                  setError("⛔ Access Denied: Your account has been suspended.");
                  await auth.signOut();
                  return;
              }
              onLogin(userData);
          } else {
              // Create new user with selected role
              const newUser = await saveUserToFirestore(user.uid, user.email!, user.displayName || formData.name || 'User');
              onLogin(newUser);
          }
      } catch (err: any) {
          console.error("Google Sign In Error:", err);
          setError(err.message || "Failed to sign in with Google.");
      } finally {
          setLoading(false);
      }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Basic validation
    if (!formData.email || !formData.password) {
        setError("Email and Password are required.");
        setLoading(false);
        return;
    }

    if (!isLogin && (!formData.name || !formData.mobile)) {
        setError("Name and Mobile Number are required for registration.");
        setLoading(false);
        return;
    }

    if (activeTab === 'ADMIN' && formData.password !== 'admin123' && !isLogin) {
         // Simple check for admin registration, though ideally admin creation should be restricted
         // For now, we allow login if they have the password, or existing admin logic
    }

    try {
        if (isLogin) {
            // Login
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data() as User;
                if (userData.banned) {
                    setError("⛔ Access Denied: Your account has been suspended.");
                    await auth.signOut();
                    return;
                }
                // Check if role matches (optional, but good for security/UX)
                if (userData.role !== activeTab && activeTab !== 'ADMIN') {
                     // Allow login but maybe warn? Or just login as their actual role.
                     // For now, just login.
                }
                onLogin(userData);
            } else {
                setError("User profile not found. Please contact support.");
                await auth.signOut();
            }
        } else {
            // Register
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            
            if (formData.name) {
                await updateProfile(user, { displayName: formData.name });
            }

            const newUser = await saveUserToFirestore(user.uid, user.email!, formData.name);
            onLogin(newUser);
        }
    } catch (err: any) {
        console.error("Auth Error:", err);
        let msg = "Authentication failed.";
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
            msg = "Invalid email or password.";
        } else if (err.code === 'auth/email-already-in-use') {
            msg = "Email is already registered. Please login.";
        }
        setError(msg);
    } finally {
        setLoading(false);
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
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        {activeTab === 'STUDENT' && (isLogin ? 'Login to access your dashboard' : 'Join us to find your dream college')}
                        {activeTab === 'COLLEGE_PARTNER' && 'Manage college profile and admissions.'}
                        {activeTab === 'ASSOCIATE_PARTNER' && 'Manage student leads and inquiries.'}
                        {activeTab === 'ADMIN' && 'Platform administration.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-semibold animate-pulse">{error}</div>}
                    
                    {!isLogin && (
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
                    )}

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

                    {!isLogin && (
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
                        disabled={loading}
                        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 mt-4 flex justify-center items-center ${
                            loading ? 'opacity-70 cursor-not-allowed' : ''
                        } ${
                            activeTab === 'STUDENT' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' :
                            activeTab === 'COLLEGE_PARTNER' ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-200' :
                            activeTab === 'ASSOCIATE_PARTNER' ? 'bg-teal-600 hover:bg-teal-700 shadow-teal-200' :
                            'bg-slate-800 hover:bg-slate-900 shadow-slate-300'
                        }`}
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            isLogin ? 'Sign In' : 'Create Account'
                        )}
                    </button>
                </form>

                <div className="mt-4 flex flex-col gap-3">
                    <button 
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full py-3 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                        Sign in with Google
                    </button>

                    <div className="text-center text-sm text-slate-500">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button 
                            onClick={() => setIsLogin(!isLogin)} 
                            className="font-bold text-indigo-600 hover:underline"
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div>

                    <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 text-sm mt-2">
                        Continue as Guest
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SignIn;