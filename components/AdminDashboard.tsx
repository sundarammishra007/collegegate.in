import React, { useEffect, useState } from 'react';
import { User, College, Course, Inquiry, UserRole, University } from '../types';
import { UNIVERSITIES_DATA } from '../constants';
import { subscribeToAllUsers, updateUserProfile, updateInquiry } from '../services/firebase';

interface AdminDashboardProps {
    colleges: College[];
    setColleges: (colleges: College[]) => void;
    courses: Course[];
    setCourses: (courses: Course[]) => void;
    universities: University[];
    setUniversities: (universities: University[]) => void;
    inquiries: Inquiry[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ colleges, setColleges, courses, setCourses, universities, setUniversities, inquiries }) => {
  const [activeSection, setActiveSection] = useState<'DASHBOARD' | 'USERS' | 'COLLEGES' | 'COURSES' | 'INQUIRIES' | 'VERIFICATION' | 'CONTENT'>('DASHBOARD');
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [showAddUniversity, setShowAddUniversity] = useState(false);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newUniversity, setNewUniversity] = useState<Partial<University>>({ name: '', location: '', modes: ['Regular'], image: 'https://picsum.photos/seed/uni/800/600', tags: [] });
  const [newCourse, setNewCourse] = useState<Partial<Course>>({ name: '', type: 'UG', modes: ['Regular'], image: 'https://picsum.photos/seed/course/800/600' });

  useEffect(() => {
    const unsubscribe = subscribeToAllUsers((fetchedUsers) => {
      setUsers(fetchedUsers);
    });
    return () => unsubscribe();
  }, []);

  const toggleBan = async (userId: string, currentStatus: boolean) => {
    await updateUserProfile(userId, { banned: !currentStatus });
  };

  const toggleCrmAccess = async (userId: string, currentAccess: boolean) => {
    await updateUserProfile(userId, { crmAccess: !currentAccess });
  };

  const deleteUser = (userId: string) => {
      if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
          // In Firestore, we might want to soft delete or actually delete. 
          // For now, let's just ban them as "delete" is dangerous without auth cleanup.
          // Or we can implement deleteUser in firebase service.
          // Let's just alert for now as delete requires Admin SDK or cloud function for full cleanup.
          alert("User deletion is restricted. Please ban the user instead.");
      }
  };

  const changeUserRole = async (userId: string, newRole: UserRole) => {
      await updateUserProfile(userId, { role: newRole });
      setEditingUser(null);
  };

  const handleDeleteUniversity = (id: string) => {
      setUniversities(universities.filter(u => u.id !== id));
  };

  const handleDeleteCourse = (id: string) => {
      setCourses(courses.filter(c => c.id !== id));
  };

  const handleAddUniversity = () => {
      if (!newUniversity.name || !newUniversity.location) return;
      const uni: University = {
          ...newUniversity,
          id: Date.now().toString()
      } as University;
      setUniversities([...universities, uni]);
      setShowAddUniversity(false);
      setNewUniversity({ name: '', location: '', modes: ['Regular'], image: 'https://picsum.photos/seed/uni/800/600', tags: [] });
  };

  const handleAddCourse = () => {
      if (!newCourse.name) return;
      const course: Course = {
          ...newCourse,
          id: Date.now().toString()
      } as Course;
      setCourses([...courses, course]);
      setShowAddCourse(false);
      setNewCourse({ name: '', type: 'UG', modes: ['Regular'], image: 'https://picsum.photos/seed/course/800/600' });
  };

  const renderDashboard = () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="text-slate-500 text-sm font-bold uppercase mb-2">Total Users</div>
              <div className="text-3xl font-black text-slate-800">{users.length}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="text-slate-500 text-sm font-bold uppercase mb-2">Students</div>
              <div className="text-3xl font-black text-slate-800">{users.filter(u => u.role === 'STUDENT').length}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="text-slate-500 text-sm font-bold uppercase mb-2">Partners</div>
              <div className="text-3xl font-black text-slate-800">{users.filter(u => u.role === 'COLLEGE_PARTNER').length}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="text-slate-500 text-sm font-bold uppercase mb-2">Companies</div>
              <div className="text-3xl font-black text-slate-800">{users.filter(u => u.role === 'COMPANY').length}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="text-slate-500 text-sm font-bold uppercase mb-2">Govt Officials</div>
              <div className="text-3xl font-black text-slate-800">{users.filter(u => u.role === 'GOVT_OFFICIAL').length}</div>
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
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                        <th className="p-4 font-semibold border-b">Role</th>
                        <th className="p-4 font-semibold border-b">Name</th>
                        <th className="p-4 font-semibold border-b">Email</th>
                        <th className="p-4 font-semibold border-b">Mobile</th>
                        <th className="p-4 font-semibold border-b">Status</th>
                        <th className="p-4 font-semibold border-b">CRM</th>
                        <th className="p-4 font-semibold border-b text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {users.map((user, idx) => (
                        <tr key={idx} className={`hover:bg-slate-50 transition-colors ${user.banned ? 'bg-red-50/50' : ''}`}>
                            <td className="p-4">
                                {editingUser === user.id ? (
                                    <select 
                                        value={user.role} 
                                        onChange={(e) => changeUserRole(user.id, e.target.value as UserRole)}
                                        className="text-xs font-bold p-1 rounded border border-slate-300"
                                    >
                                        <option value="STUDENT">STUDENT</option>
                                        <option value="COUNSELOR">COUNSELOR</option>
                                        <option value="COLLEGE_PARTNER">COLLEGE PARTNER</option>
                                        <option value="ASSOCIATE_PARTNER">ASSOCIATE</option>
                                        <option value="COMPANY">COMPANY</option>
                                        <option value="GOVT_OFFICIAL">GOVT OFFICIAL</option>
                                        <option value="ADMIN">ADMIN</option>
                                    </select>
                                ) : (
                                    <span 
                                        onClick={() => setEditingUser(user.id)}
                                        className={`cursor-pointer px-2 py-1 rounded text-xs font-bold ${
                                        user.role === 'ADMIN' ? 'bg-slate-800 text-white' :
                                        user.role === 'COUNSELOR' ? 'bg-purple-100 text-purple-700' :
                                        user.role === 'COLLEGE_PARTNER' ? 'bg-orange-100 text-orange-700' :
                                        user.role === 'ASSOCIATE_PARTNER' ? 'bg-teal-100 text-teal-700' :
                                        user.role === 'COMPANY' ? 'bg-blue-100 text-blue-700' :
                                        user.role === 'GOVT_OFFICIAL' ? 'bg-emerald-100 text-emerald-700' :
                                        'bg-indigo-100 text-indigo-700'
                                    }`}>
                                        {user.role}
                                    </span>
                                )}
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
                            <td className="p-4">
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    checked={user.crmAccess || user.role === 'ADMIN'} 
                                    onChange={() => toggleCrmAccess(user.id, !!user.crmAccess)}
                                    disabled={user.role === 'ADMIN'}
                                    className="sr-only peer" 
                                  />
                                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                                </label>
                            </td>
                            <td className="p-4 text-right flex justify-end gap-2">
                                {user.role !== 'ADMIN' && (
                                    <>
                                        <button 
                                            onClick={() => toggleBan(user.id, !!user.banned)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                                user.banned ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                            }`}
                                        >
                                            {user.banned ? 'Unban' : 'Ban'}
                                        </button>
                                        <button 
                                            onClick={() => deleteUser(user.id)}
                                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-100 text-red-700 hover:bg-red-200 transition-all"
                                        >
                                            Delete
                                        </button>
                                    </>
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
              <button 
                  onClick={() => setShowAddUniversity(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Add New College
              </button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {universities.map((uni) => (
                  <div key={uni.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:shadow-md transition-all">
                      <div className="flex items-center gap-4">
                          <img src={uni.image} alt={uni.name} className="w-16 h-16 rounded-lg object-cover" referrerPolicy="no-referrer" />
                          <div>
                              <div className="flex items-center gap-2">
                                  {uni.logo && <img src={uni.logo} alt="logo" className="w-6 h-6 rounded-full object-contain border border-slate-100" referrerPolicy="no-referrer" />}
                                  <h4 className="font-bold text-slate-800">{uni.name}</h4>
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5">{uni.location}</p>
                              <div className="flex gap-1 mt-1">
                                  {uni.modes.map(m => (
                                      <span key={m} className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{m}</span>
                                  ))}
                              </div>
                          </div>
                      </div>
                      <button 
                          onClick={() => handleDeleteUniversity(uni.id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          title="Remove University"
                      >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                  </div>
              ))}
          </div>
      </div>
  );

  const renderCourses = () => (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">Courses</h3>
              <button onClick={() => setShowAddCourse(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700">Add Course</button>
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
                            <td className="p-4 text-right flex justify-end gap-2">
                                <button className="text-indigo-600 hover:text-indigo-800 text-xs font-bold">Edit</button>
                                <button onClick={() => handleDeleteCourse(course.id)} className="text-red-600 hover:text-red-800 text-xs font-bold">Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
      </div>
  );

  const handleAssignInquiry = async (inquiryId: string, assigneeId: string) => {
      try {
          await updateInquiry(inquiryId, { assignedTo: assigneeId });
      } catch (error) {
          console.error("Error assigning inquiry:", error);
      }
  };

  const renderInquiries = () => {
      const assignableUsers = users.filter(u => u.role === 'COUNSELOR' || u.role === 'ASSOCIATE_PARTNER' || u.role === 'COLLEGE_PARTNER');

      return (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                  <h3 className="font-bold text-lg text-slate-800">All Inquiries</h3>
              </div>
              <div className="divide-y divide-slate-100">
                  {inquiries.length > 0 ? (
                      inquiries.map((inquiry) => (
                          <div key={inquiry.id} className="p-6 hover:bg-slate-50 transition-colors">
                              <div className="flex justify-between items-start mb-2">
                                  <div>
                                      <h4 className="font-bold text-slate-800">{inquiry.studentName}</h4>
                                      <p className="text-xs text-slate-500">{inquiry.email} • {inquiry.mobile}</p>
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                          inquiry.status === 'ANSWERED' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                                      }`}>
                                          {inquiry.status}
                                      </span>
                                      <select 
                                          value={inquiry.assignedTo || ''}
                                          onChange={(e) => handleAssignInquiry(inquiry.id, e.target.value)}
                                          className="text-xs border border-slate-200 rounded p-1 bg-white"
                                      >
                                          <option value="">Unassigned</option>
                                          {assignableUsers.map(u => (
                                              <option key={u.id} value={u.id}>Assign to: {u.name}</option>
                                          ))}
                                      </select>
                                  </div>
                              </div>
                              <div className="mb-2">
                                  <span className="text-xs font-bold text-slate-500 uppercase mr-2">Course:</span>
                                  <span className="text-sm font-medium text-slate-700">{inquiry.course} ({inquiry.mode})</span>
                              </div>
                              <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                  {inquiry.query}
                              </p>
                              <div className="mt-2 text-xs text-slate-400">
                                  Received: {new Date(inquiry.timestamp).toLocaleDateString()}
                              </div>
                          </div>
                      ))
                  ) : (
                      <div className="p-12 text-center text-slate-400">
                          No inquiries found.
                      </div>
                  )}
              </div>
          </div>
      );
  };

  const handleVerifyUser = async (userId: string, status: 'APPROVED' | 'REJECTED') => {
      await updateUserProfile(userId, { verificationStatus: status });
  };

  const renderVerificationQueue = () => {
      const pendingUsers = users.filter(u => u.verificationStatus === 'PENDING');

      return (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                  <h3 className="font-bold text-lg text-slate-800">Identity Verification Queue</h3>
                  <p className="text-sm text-slate-500">Review and approve student identity documents.</p>
              </div>
              <div className="divide-y divide-slate-100">
                  {pendingUsers.length > 0 ? (
                      pendingUsers.map((user) => (
                          <div key={user.id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">
                                      {user.name.charAt(0)}
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-slate-800">{user.name}</h4>
                                      <p className="text-xs text-slate-500">{user.email} • {user.role}</p>
                                      {user.idCardUrl ? (
                                          <a href={user.idCardUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-indigo-600 hover:underline mt-1 inline-block">View ID Document</a>
                                      ) : (
                                          <span className="text-xs text-red-500 mt-1 inline-block">No Document Uploaded</span>
                                      )}
                                  </div>
                              </div>
                              <div className="flex gap-2">
                                  <button 
                                      onClick={() => handleVerifyUser(user.id, 'APPROVED')}
                                      className="px-3 py-1.5 bg-emerald-100 text-emerald-700 font-bold text-xs rounded hover:bg-emerald-200 transition-colors"
                                  >
                                      Approve
                                  </button>
                                  <button 
                                      onClick={() => handleVerifyUser(user.id, 'REJECTED')}
                                      className="px-3 py-1.5 bg-red-100 text-red-700 font-bold text-xs rounded hover:bg-red-200 transition-colors"
                                  >
                                      Reject
                                  </button>
                              </div>
                          </div>
                      ))
                  ) : (
                      <div className="p-12 text-center text-slate-400">
                          No pending verifications.
                      </div>
                  )}
              </div>
          </div>
      );
  };

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
                <button onClick={() => setActiveSection('VERIFICATION')} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeSection === 'VERIFICATION' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    Verification Queue
                </button>
                <button onClick={() => setActiveSection('CONTENT')} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeSection === 'CONTENT' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    Content Management
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
                    {activeSection === 'VERIFICATION' && 'Identity Verification Queue'}
                    {activeSection === 'CONTENT' && 'Content Management'}
                </h1>
            </header>

            {activeSection === 'DASHBOARD' && renderDashboard()}
            {activeSection === 'USERS' && renderUsers()}
            {activeSection === 'COLLEGES' && renderUniversities()}
            {activeSection === 'COURSES' && renderCourses()}
            {activeSection === 'INQUIRIES' && renderInquiries()}
            {activeSection === 'VERIFICATION' && renderVerificationQueue()}
            {activeSection === 'CONTENT' && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-bold text-lg text-slate-800 mb-4">Manage Platform Content</h3>
                    <p className="text-sm text-slate-500 mb-6">Add, edit, or delete content across the platform.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border border-slate-200 p-6 rounded-xl hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-slate-800 mb-2">News & Updates</h4>
                            <p className="text-xs text-slate-500 mb-4">Manage the news feed on the homepage.</p>
                            <button className="w-full py-2 bg-indigo-50 text-indigo-600 font-bold rounded-lg hover:bg-indigo-100 transition-colors text-sm">
                                Manage News
                            </button>
                        </div>
                        <div className="border border-slate-200 p-6 rounded-xl hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-slate-800 mb-2">Cut-offs</h4>
                            <p className="text-xs text-slate-500 mb-4">Update exam cut-off data.</p>
                            <button className="w-full py-2 bg-indigo-50 text-indigo-600 font-bold rounded-lg hover:bg-indigo-100 transition-colors text-sm">
                                Manage Cut-offs
                            </button>
                        </div>
                        <div className="border border-slate-200 p-6 rounded-xl hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-slate-800 mb-2">Opportunities</h4>
                            <p className="text-xs text-slate-500 mb-4">Manage internships and apprenticeships.</p>
                            <button className="w-full py-2 bg-indigo-50 text-indigo-600 font-bold rounded-lg hover:bg-indigo-100 transition-colors text-sm">
                                Manage Opportunities
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Add University Modal */}
        {showAddUniversity && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                    <h2 className="text-xl font-bold mb-4">Add New University</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Name</label>
                            <input type="text" value={newUniversity.name} onChange={e => setNewUniversity({...newUniversity, name: e.target.value})} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Location</label>
                            <input type="text" value={newUniversity.location} onChange={e => setNewUniversity({...newUniversity, location: e.target.value})} className="w-full p-2 border rounded" />
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <button onClick={() => setShowAddUniversity(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded">Cancel</button>
                            <button onClick={handleAddUniversity} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Add Course Modal */}
        {showAddCourse && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                    <h2 className="text-xl font-bold mb-4">Add New Course</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Name</label>
                            <input type="text" value={newCourse.name} onChange={e => setNewCourse({...newCourse, name: e.target.value})} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Type</label>
                            <select value={newCourse.type} onChange={e => setNewCourse({...newCourse, type: e.target.value as any})} className="w-full p-2 border rounded">
                                <option value="UG">UG</option>
                                <option value="PG">PG</option>
                                <option value="Diploma">Diploma</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <button onClick={() => setShowAddCourse(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded">Cancel</button>
                            <button onClick={handleAddCourse} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default AdminDashboard;
