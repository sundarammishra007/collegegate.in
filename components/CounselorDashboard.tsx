import React from 'react';
import { Inquiry, User } from '../types';

interface CounselorDashboardProps {
  counselor: User;
  inquiries: Inquiry[];
}

const CounselorDashboard: React.FC<CounselorDashboardProps> = ({ counselor, inquiries }) => {
  const assignedInquiries = inquiries.filter(inq => inq.assignedTo === counselor.id);
  const isAmbassador = counselor.role === 'ASSOCIATE_PARTNER';
  const connectionCount = assignedInquiries.length; // Using assigned inquiries as connections for now

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-8 bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold">Welcome, {counselor.name}</h2>
        <p className="text-purple-100 mt-2">{isAmbassador ? 'College Ambassador' : `Specialization: ${counselor.specialization || 'General Counselor'}`}</p>
        <div className="mt-6 flex gap-4">
            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg border border-white/20">
                <span className="block text-2xl font-bold">{connectionCount}</span>
                <span className="text-xs text-purple-200">{isAmbassador ? 'Connections' : 'Assigned Inquiries'}</span>
            </div>
            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg border border-white/20">
                <span className="block text-2xl font-bold">Online</span>
                <span className="text-xs text-emerald-300">Status</span>
            </div>
            {isAmbassador && connectionCount >= 50 && (
                <div className="bg-emerald-500/20 backdrop-blur px-4 py-2 rounded-lg border border-emerald-400/30 flex items-center gap-3">
                    <div className="text-3xl">🏆</div>
                    <div>
                        <span className="block text-sm font-bold text-emerald-100">Milestone Unlocked!</span>
                        <button className="text-xs font-bold text-white bg-emerald-600 px-3 py-1 rounded hover:bg-emerald-700 transition-colors mt-1 shadow-sm">
                            Download Certificate of Excellence
                        </button>
                    </div>
                </div>
            )}
            {isAmbassador && connectionCount < 50 && (
                <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg border border-white/20 flex-1 max-w-xs">
                    <div className="flex justify-between text-xs text-purple-200 mb-1">
                        <span>Certificate Progress</span>
                        <span>{connectionCount} / 50</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-emerald-400 h-2 rounded-full" style={{ width: `${(connectionCount / 50) * 100}%` }}></div>
                    </div>
                </div>
            )}
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span>📥</span> Assigned Inquiries
      </h3>

      <div className="grid gap-4">
        {assignedInquiries.map((inq) => (
            <div key={inq.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-bold uppercase mr-2">
                            {inq.course}
                        </span>
                        <span className="text-slate-400 text-xs">{inq.timestamp}</span>
                    </div>
                    <span className="text-xs font-mono bg-slate-100 text-slate-500 px-2 py-1 rounded">
                        ID: {inq.studentId}
                    </span>
                </div>
                <h4 className="font-semibold text-slate-800 mb-2">Query:</h4>
                <p className="text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
                    "{inq.query}"
                </p>
                <div className="mt-4 flex gap-3">
                    <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors">
                        Start Chat
                    </button>
                    <button className="flex-1 bg-white text-indigo-600 border border-indigo-200 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors">
                        Mark as Resolved
                    </button>
                </div>
            </div>
        ))}

        {assignedInquiries.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500">No new student inquiries assigned to you at the moment.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default CounselorDashboard;