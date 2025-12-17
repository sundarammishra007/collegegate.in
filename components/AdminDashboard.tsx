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
    const headers = ['ID', 'Name', 'Email', 'Role', 'Timestamp'];
    const csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n" 
        + users.map(u => `${u.id},${u.name},${u.email},${u.role},${u.timestamp}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "collegegate_users.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h2 className="text-3xl font-bold text-slate-800">Admin Dashboard</h2>
            <p className="text-slate-500">Centralized User Data Store</p>
        </div>
        <button onClick={downloadCSV} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-700">
            Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                        <th className="p-4 font-semibold border-b">Role</th>
                        <th className="p-4 font-semibold border-b">Name</th>
                        <th className="p-4 font-semibold border-b">Email</th>
                        <th className="p-4 font-semibold border-b">Joined At</th>
                        <th className="p-4 font-semibold border-b">ID</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {users.map((user, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
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
                            <td className="p-4 text-slate-600 font-mono text-sm">{user.email}</td>
                            <td className="p-4 text-slate-500 text-sm">{user.timestamp}</td>
                            <td className="p-4 text-slate-400 text-xs">{user.id}</td>
                        </tr>
                    ))}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan={5} className="p-8 text-center text-slate-400">No registered users found in local storage.</td>
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