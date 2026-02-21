import React, { useEffect, useState } from 'react';
import { User, College, Course, Inquiry } from '../types';
import { UNIVERSITIES_DATA } from '../constants';

interface AdminDashboardProps {
    colleges: College[];
    setColleges: (colleges: College[]) => void;
    courses: Course[];
    setCourses: (courses: Course[]) => void;
    inquiries: Inquiry[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ colleges, setColleges, courses, setCourses, inquiries }) => {
  const [activeSection, setActiveSection] = useState<'DASHBOARD' | 'USERS' | 'COLLEGES' | 'COURSES' | 'INQUIRIES'>('DASHBOARD');
  const [users, setUsers] = useState<User[]>([]);
  const [universities, setUniversities] = useState(UNIVERSITIES_DATA); // Local state for universities as they are in constants currently

  useEffect(() => {
    const storedUsers = localStorage.getItem('collegegate_users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const toggleBan = (userId: string) => {
    const updatedUsers = users.map(u => {
        if (u.id === userId) {
            return { ...u, banned: !u.banned };
        }
        return u;
    });
    setUsers(updatedUsers);
    localStorage.setItem('collegegate_users', JSON.stringify(updatedUsers));
  };

  const renderDashboard = () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="text-slate-500 text-sm font-bold uppercase mb-2">Total Users</div>
              <div className="text-3xl font-black text-slate-800">{users.length}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="text-slate-500 text-sm font-bold uppercase mb-2">Universities</div>
              <div className="text-3xl font-black text-slate-800">{universities.length}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="text-slate-500 text-sm font-bold uppercase mb-2">Courses</div>
              <div className="text-3xl font-black text-slate-800">{courses.length}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="text-slate-500 text-sm font-bold uppercase mb-2">Inquiries</div>
              <div className="text-3xl font-black text-slate-800">{inquiries.length}</div>
          </div>
      </div>
  );

  const renderUsers = () => (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">User Management</h3>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700">Add User</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                        <th className="p-4 font-semibold border-b">Role</th>
                        <th className="p-4 font-semibold border-b">Name</th>
                        <th className="p-4 font-semibold border-b">Email</th>
                        <th className="p-4 font-semibold border-b">Mobile</th>
                        <th className="p-4 font-semibold border-b">Status</th>
                        <th className="p-4 font-semibold border-b text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {users.map((user, idx) => (
                        <tr key={idx} className={`hover:bg-slate-50 transition-colors ${user.banned ? 'bg-red-50/50' : ''}`}>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${
                                    user.role === 'ADMIN' ? 'bg-slate-800 text-white' :
                                    user.role === 'COUNSELOR' ? 'bg-purple-100 text-purple-700' :
                                    user.role === 'COLLEGE_PARTNER' ? 'bg-orange-100 text-orange-700' :
                                    user.role === 'ASSOCIATE_PARTNER' ? 'bg-teal-100 text-teal-700' :
                                    'bg-indigo-100 text-indigo-700'
                                }`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="p-4 font-medium text-slate-800">{user.name}</td>
                            <td className="p-4 text-slate-600 font-mono text-xs">{user.email}</td>
                            <td className="p-4 text-slate-600 text-xs font-mono">{user.mobile || '-'}</td>
                            <td className="p-4">
                                {user.banned ? (
                                    <span className="inline-flex items-center gap-1 text-red-600 bg-red-100 px-2 py-1 rounded text-xs font-bold">Banned</span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-100 px-2 py-1 rounded text-xs font-bold">Active</span>
                                )}
                            </td>
                            <td className="p-4 text-right">
                                {user.role !== 'ADMIN' && (
                                    <button 
                                        onClick={() => toggleBan(user.id)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                            user.banned ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {user.banned ? 'Unban' : 'Ban'}
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
      </div>
  );

  const renderUniversities = () => (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">Universities</h3>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700">Add University</button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {universities.map((uni) => (
                  <div key={uni.id} className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:shadow-md transition-all">
                      <img src={uni.image} alt={uni.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div>
                          <h4 className="font-bold text-slate-800">{uni.name}</h4>
                          <p className="text-xs text-slate-500">{uni.location}</p>
                          <div className="flex gap-1 mt-1">
                              {uni.modes.map(m => (
                                  <span key={m} className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{m}</span>
                              ))}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );

  const renderCourses = () => (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">Courses</h3>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700">Add Course</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                        <th className="p-4 font-semibold border-b">Name</th>
                        <th className="p-4 font-semibold border-b">Type</th>
                        <th className="p-4 font-semibold border-b">Modes</th>
                        <th className="p-4 font-semibold border-b text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {courses.map((course) => (
                        <tr key={course.id} className="hover:bg-slate-50">
                            <td className="p-4 font-medium text-slate-800">{course.name}</td>
                            <td className="p-4">
                                <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600">{course.type}</span>
                            </td>
                            <td className="p-4 text-xs text-slate-500">{course.modes.join(', ')}</td>
                            <td className="p-4 text-right">
                                <button className="text-indigo-600 hover:text-indigo-800 text-xs font-bold">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
      </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
        {/* Sidebar */}
        <div className="w-64 bg-slate-900 text-white fixed h-full z-10 hidden md:flex flex-col">
            <div className="p-6 border-b border-slate-800">
                <div className="text-xl font-black tracking-tighter">C-PANEL</div>
                <div className="text-xs text-slate-500">Admin Control Center</div>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                <button onClick={() => setActiveSection('DASHBOARD')} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeSection === 'DASHBOARD' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    Dashboard
                </button>
                <button onClick={() => setActiveSection('USERS')} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeSection === 'USERS' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    User Management
                </button>
                <button onClick={() => setActiveSection('COLLEGES')} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeSection === 'COLLEGES' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    Universities
                </button>
                <button onClick={() => setActiveSection('COURSES')} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeSection === 'COURSES' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    Courses
                </button>
                <button onClick={() => setActiveSection('INQUIRIES')} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeSection === 'INQUIRIES' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    Inquiries
                </button>
            </nav>
            <div className="p-4 border-t border-slate-800">
                <div className="text-xs text-slate-500 mb-2">Logged in as Admin</div>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-64 p-8">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-black text-slate-800">
                    {activeSection === 'DASHBOARD' && 'Overview'}
                    {activeSection === 'USERS' && 'Manage Users'}
                    {activeSection === 'COLLEGES' && 'Manage Universities'}
                    {activeSection === 'COURSES' && 'Manage Courses'}
                    {activeSection === 'INQUIRIES' && 'Student Inquiries'}
                </h1>
            </header>

            {activeSection === 'DASHBOARD' && renderDashboard()}
            {activeSection === 'USERS' && renderUsers()}
            {activeSection === 'COLLEGES' && renderUniversities()}
            {activeSection === 'COURSES' && renderCourses()}
            {activeSection === 'INQUIRIES' && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center text-slate-500">
                    No inquiries found.
                </div>
            )}
        </div>
    </div>
  );
};

export default AdminDashboard;