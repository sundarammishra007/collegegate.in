import React, { useEffect, useState } from 'react';
import { User } from '../types';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('collegegate_users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const downloadCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Mobile', 'WhatsApp', 'Role', 'Status', 'Timestamp'];
    const csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n" 
        + users.map(u => `${u.id},${u.name},${u.email},${u.mobile || ''},${u.whatsapp || ''},${u.role},${u.banned ? 'Banned' : 'Active'},${u.timestamp}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "collegegate_users.csv");
    document.body.appendChild(link);
    link.click();
  };

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

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
            <h2 className="text-3xl font-bold text-slate-800">Admin Dashboard</h2>
            <p className="text-slate-500">Manage Users & Platform Access</p>
        </div>
        <button onClick={downloadCSV} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-700 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                        <th className="p-4 font-semibold border-b">Role</th>
                        <th className="p-4 font-semibold border-b">Name</th>
                        <th className="p-4 font-semibold border-b">Email</th>
                        <th className="p-4 font-semibold border-b">Mobile</th>
                        <th className="p-4 font-semibold border-b">WhatsApp</th>
                        <th className="p-4 font-semibold border-b">Joined At</th>
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
                                    'bg-indigo-100 text-indigo-700'
                                }`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="p-4 font-medium text-slate-800">{user.name}</td>
                            <td className="p-4 text-slate-600 font-mono text-xs">{user.email}</td>
                            <td className="p-4 text-slate-600 text-xs font-mono">{user.mobile || '-'}</td>
                            <td className="p-4 text-slate-600 text-xs font-mono">{user.whatsapp || '-'}</td>
                            <td className="p-4 text-slate-500 text-xs">{user.timestamp}</td>
                            <td className="p-4">
                                {user.banned ? (
                                    <span className="inline-flex items-center gap-1 text-red-600 bg-red-100 px-2 py-1 rounded text-xs font-bold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Banned
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-100 px-2 py-1 rounded text-xs font-bold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Active
                                    </span>
                                )}
                            </td>
                            <td className="p-4 text-right">
                                {user.role !== 'ADMIN' && (
                                    <button 
                                        onClick={() => toggleBan(user.id)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                            user.banned 
                                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                                        }`}
                                    >
                                        {user.banned ? 'Unban' : 'Ban'}
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan={8} className="p-8 text-center text-slate-400">No registered users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;