import React, { useState } from 'react';
import { College, Inquiry, User } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { updateInquiry } from '../services/firebase';

interface CollegePartnerDashboardProps {
  partner: User;
  colleges: College[];
  setColleges: React.Dispatch<React.SetStateAction<College[]>>;
  inquiries: Inquiry[];
}

const CollegePartnerDashboard: React.FC<CollegePartnerDashboardProps> = ({ partner, colleges, setColleges, inquiries }) => {
  // For demo purposes, we'll assume the partner is linked to the first college if not specified
  // In a real app, the user object would have a collegeId
  const [myCollege, setMyCollege] = useState<College>(colleges[0]); 
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'inquiries'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<College>(colleges[0]);

  // Filter inquiries for this college (mock logic: matching by name or just showing all for demo)
  const myInquiries = inquiries.filter(i => i.query.toLowerCase().includes(myCollege.name.toLowerCase()) || true); // Showing all for demo

  const handleSave = () => {
    setColleges(prev => prev.map(c => c.id === myCollege.id ? editForm : c));
    setMyCollege(editForm);
    setIsEditing(false);
  };

  const handleMarkAnswered = async (inquiryId: string) => {
    await updateInquiry(inquiryId, { status: 'ANSWERED' });
  };

  const handleAddNote = async (inquiryId: string, currentNotes: string[] = []) => {
    const note = prompt("Enter note:");
    if (note) {
      await updateInquiry(inquiryId, { notes: [...currentNotes, note] });
    }
  };

  const handleViewProfile = (studentName: string) => {
    alert(`Viewing profile for ${studentName}\n(Feature to be implemented: Navigate to student profile details)`);
  };

  const stats = [
    { name: 'Total Inquiries', value: myInquiries.length },
    { name: 'Pending', value: myInquiries.filter(i => i.status === 'PENDING').length },
    { name: 'Answered', value: myInquiries.filter(i => i.status === 'ANSWERED').length },
  ];

  const chartData = [
    { name: 'Jan', inquiries: 4 },
    { name: 'Feb', inquiries: 7 },
    { name: 'Mar', inquiries: myInquiries.length },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Partner Dashboard</h1>
            <p className="text-slate-500">Manage your college profile and view insights.</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              {partner.name.charAt(0)}
            </div>
            <span className="font-bold text-slate-700">{partner.name}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['overview', 'details', 'inquiries'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                  : 'bg-white text-slate-500 hover:bg-slate-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{stat.name}</p>
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Analytics Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Inquiry Trends</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                      cursor={{ fill: '#F1F5F9' }}
                    />
                    <Bar dataKey="inquiries" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800">College Profile</h3>
              {!isEditing ? (
                <button 
                  onClick={() => {
                    setEditForm(myCollege);
                    setIsEditing(true);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors"
                >
                  Edit Details
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
            
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">College Name</label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-lg font-bold text-slate-800">{myCollege.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Location</label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={editForm.location}
                        onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-lg font-bold text-slate-800">{myCollege.location}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Fees Structure</label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={editForm.fees}
                        onChange={(e) => setEditForm({...editForm, fees: e.target.value})}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-lg font-bold text-slate-800">{myCollege.fees}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Application Deadline</label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={editForm.applicationDeadline || ''}
                        onChange={(e) => setEditForm({...editForm, applicationDeadline: e.target.value})}
                        placeholder="e.g. 30th June 2024"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-lg font-bold text-slate-800">{myCollege.applicationDeadline || 'Not Set'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Description</label>
                    {isEditing ? (
                      <textarea 
                        value={editForm.description}
                        onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                        rows={4}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-base text-slate-600 leading-relaxed">{myCollege.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800">Student Inquiries</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {myInquiries.length > 0 ? (
                myInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-slate-800">{inquiry.studentName}</h4>
                        <p className="text-xs text-slate-500">{inquiry.email} • {inquiry.mobile}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        inquiry.status === 'ANSWERED' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {inquiry.query}
                    </p>
                    {inquiry.notes && inquiry.notes.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {inquiry.notes.map((note, idx) => (
                          <p key={idx} className="text-xs text-slate-500 italic bg-yellow-50 p-1 rounded border border-yellow-100">Note: {note}</p>
                        ))}
                      </div>
                    )}
                    <div className="mt-3 flex justify-between items-center">
                      <div className="text-xs text-slate-400">
                        Received: {new Date(inquiry.timestamp).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                         {inquiry.status === 'PENDING' && (
                           <button 
                             onClick={() => handleMarkAnswered(inquiry.id)}
                             className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold hover:bg-emerald-200 transition-colors"
                           >
                             Mark Answered
                           </button>
                         )}
                         <button 
                           onClick={() => handleAddNote(inquiry.id, inquiry.notes)}
                           className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold hover:bg-indigo-200 transition-colors"
                         >
                           Add Note
                         </button>
                         <button 
                           onClick={() => handleViewProfile(inquiry.studentName)}
                           className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors"
                         >
                           View Profile
                         </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-slate-400">
                  No inquiries found for your college yet.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegePartnerDashboard;
