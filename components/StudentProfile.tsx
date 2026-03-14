import React, { useState, useEffect } from 'react';
import { User, CourseMode } from '../types';
import { db } from '../services/firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface StudentProfileProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
  onBack: () => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ user, onUpdateUser, onBack }) => {
  const [formData, setFormData] = useState({
    academicAchievements: user.academicAchievements || '',
    interests: user.interests ? user.interests.join(', ') : '',
    preferredStudyModes: user.preferredStudyModes || [] as CourseMode[],
    dateOfBirth: user.dateOfBirth || '',
    hobby: user.hobby || '',
    dreamAndGoal: user.dreamAndGoal || '',
    project: user.project || '',
    bestFriendName: user.bestFriendName || '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingId, setUploadingId] = useState(false);

  // Check if profile is incomplete
  useEffect(() => {
    if (!user.dateOfBirth || !user.hobby || !user.dreamAndGoal || !user.project || !user.bestFriendName) {
      setIsEditing(true);
    }
  }, [user]);

  const handleIdUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploadingId(true);
      // Simulate upload delay
      setTimeout(async () => {
          try {
              // In a real app, upload to Firebase Storage here and get URL
              const fakeUrl = `https://fake-storage.com/${file.name}`;
              
              const updatedUser: User = {
                  ...user,
                  idCardUrl: fakeUrl,
                  verificationStatus: 'PENDING',
                  idUploadedAt: new Date().toISOString()
              };

              await updateDoc(doc(db, 'users', user.id), {
                  idCardUrl: fakeUrl,
                  verificationStatus: 'PENDING',
                  idUploadedAt: updatedUser.idUploadedAt
              });
              
              onUpdateUser(updatedUser);
              alert("ID Document uploaded successfully. It is now under review.");
          } catch (error) {
              console.error("Error uploading ID:", error);
              alert("Failed to upload ID document.");
          } finally {
              setUploadingId(false);
          }
      }, 1500);
  };

  const handleSave = async () => {
    setSaving(true);
    const updatedUser: User = {
      ...user,
      academicAchievements: formData.academicAchievements,
      interests: formData.interests.split(',').map(i => i.trim()).filter(i => i),
      preferredStudyModes: formData.preferredStudyModes,
      dateOfBirth: formData.dateOfBirth,
      hobby: formData.hobby,
      dreamAndGoal: formData.dreamAndGoal,
      project: formData.project,
      bestFriendName: formData.bestFriendName,
    };

    try {
        await updateDoc(doc(db, 'users', user.id), {
            academicAchievements: updatedUser.academicAchievements,
            interests: updatedUser.interests,
            preferredStudyModes: updatedUser.preferredStudyModes,
            dateOfBirth: updatedUser.dateOfBirth,
            hobby: updatedUser.hobby,
            dreamAndGoal: updatedUser.dreamAndGoal,
            project: updatedUser.project,
            bestFriendName: updatedUser.bestFriendName,
        });
        onUpdateUser(updatedUser);
        setIsEditing(false);
    } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to save profile changes.");
    } finally {
        setSaving(false);
    }
  };

  const toggleMode = (mode: CourseMode) => {
    setFormData(prev => {
      const modes = prev.preferredStudyModes?.includes(mode)
        ? prev.preferredStudyModes.filter(m => m !== mode)
        : [...(prev.preferredStudyModes || []), mode];
      return { ...prev, preferredStudyModes: modes };
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
        <button onClick={onBack} className="mb-6 flex items-center text-slate-500 hover:text-indigo-600 font-bold transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Dashboard
        </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white flex justify-between items-center">
          <div>
              <h1 className="text-3xl font-black mb-2">{user.name}</h1>
              <p className="text-indigo-100 font-medium">{user.email}</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-black backdrop-blur-sm">
              {user.name.charAt(0)}
          </div>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Academic Profile</h2>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-100 transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                    onClick={() => setIsEditing(false)}
                    disabled={saving}
                    className="px-6 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg flex items-center gap-2"
                >
                    {saving && <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                    Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="space-y-8">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-medium text-slate-700 outline-none focus:border-indigo-500 transition-all"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                ) : (
                  <p className="text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    {user.dateOfBirth || <span className="text-slate-400 italic">Not provided.</span>}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Best Friend Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-medium text-slate-700 outline-none focus:border-indigo-500 transition-all"
                    value={formData.bestFriendName}
                    onChange={(e) => setFormData({ ...formData, bestFriendName: e.target.value })}
                    placeholder="E.g., Rahul"
                  />
                ) : (
                  <p className="text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    {user.bestFriendName || <span className="text-slate-400 italic">Not provided.</span>}
                  </p>
                )}
              </div>
            </div>

            {/* Aspirations & Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Dream and Goal</label>
                {isEditing ? (
                  <textarea
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-medium text-slate-700 outline-none focus:border-indigo-500 transition-all"
                    rows={3}
                    value={formData.dreamAndGoal}
                    onChange={(e) => setFormData({ ...formData, dreamAndGoal: e.target.value })}
                    placeholder="E.g., To become a Software Engineer at Google"
                  />
                ) : (
                  <p className="text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    {user.dreamAndGoal || <span className="text-slate-400 italic">Not provided.</span>}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Project</label>
                {isEditing ? (
                  <textarea
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-medium text-slate-700 outline-none focus:border-indigo-500 transition-all"
                    rows={3}
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    placeholder="E.g., Built a weather app using React"
                  />
                ) : (
                  <p className="text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    {user.project || <span className="text-slate-400 italic">Not provided.</span>}
                  </p>
                )}
              </div>
            </div>

            {/* Academic Achievements */}
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Academic Achievements</label>
              {isEditing ? (
                <textarea
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-medium text-slate-700 outline-none focus:border-indigo-500 transition-all"
                  rows={4}
                  value={formData.academicAchievements}
                  onChange={(e) => setFormData({ ...formData, academicAchievements: e.target.value })}
                  placeholder="E.g., 90% in 12th Grade, Science Olympiad Winner..."
                />
              ) : (
                <p className="text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {user.academicAchievements || <span className="text-slate-400 italic">No achievements added yet.</span>}
                </p>
              )}
            </div>

            {/* Interests & Hobby */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Hobby</label>
                {isEditing ? (
                  <input
                    type="text"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-medium text-slate-700 outline-none focus:border-indigo-500 transition-all"
                    value={formData.hobby}
                    onChange={(e) => setFormData({ ...formData, hobby: e.target.value })}
                    placeholder="E.g., Playing Guitar"
                  />
                ) : (
                  <p className="text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    {user.hobby || <span className="text-slate-400 italic">Not provided.</span>}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Interests</label>
                {isEditing ? (
                  <input
                    type="text"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-medium text-slate-700 outline-none focus:border-indigo-500 transition-all"
                    value={formData.interests}
                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                    placeholder="E.g., Coding, Painting, Football (comma separated)"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.interests && user.interests.length > 0 ? (
                      user.interests.map((interest, index) => (
                        <span key={index} className="px-4 py-2 bg-violet-50 text-violet-700 rounded-xl font-bold text-sm border border-violet-100">
                          {interest}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400 italic bg-slate-50 p-4 rounded-2xl border border-slate-100 w-full block">No interests added yet.</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Preferred Study Modes */}
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Preferred Study Modes</label>
              <div className="flex flex-wrap gap-3">
                {(['Regular', 'Online', 'Distance'] as CourseMode[]).map((mode) => (
                  <button
                    key={mode}
                    disabled={!isEditing}
                    onClick={() => toggleMode(mode)}
                    className={`px-6 py-3 rounded-xl font-bold border-2 transition-all ${
                      formData.preferredStudyModes?.includes(mode)
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                        : 'bg-white text-slate-500 border-slate-200'
                    } ${!isEditing && !formData.preferredStudyModes?.includes(mode) ? 'opacity-50' : ''}`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Identity Verification */}
            <div className="pt-8 border-t border-slate-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-800">Identity Verification</h3>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                        user.verificationStatus === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
                        user.verificationStatus === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                        user.verificationStatus === 'REJECTED' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-600'
                    }`}>
                        {user.verificationStatus || 'NOT SUBMITTED'}
                    </span>
                </div>
                
                {user.verificationStatus === 'REJECTED' && user.rejectionReason && (
                    <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">
                        <span className="font-bold">Reason for rejection:</span> {user.rejectionReason}
                    </div>
                )}

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <p className="text-sm text-slate-600 mb-4">
                        Verify your identity to unlock premium features and apply for internships. Please upload a valid government-issued ID (Aadhar, PAN, Passport).
                    </p>
                    
                    {user.verificationStatus === 'APPROVED' ? (
                        <div className="flex items-center gap-2 text-emerald-600 font-bold">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Your identity has been successfully verified.
                        </div>
                    ) : user.verificationStatus === 'PENDING' ? (
                        <div className="flex items-center gap-2 text-amber-600 font-bold">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Your document is under review by our team.
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <input 
                                type="file" 
                                accept="image/*,.pdf"
                                onChange={handleIdUpload}
                                disabled={uploadingId}
                                className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer" 
                            />
                            {uploadingId && <span className="text-sm text-indigo-600 font-bold animate-pulse">Uploading...</span>}
                        </div>
                    )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
