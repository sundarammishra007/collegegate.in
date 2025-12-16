import React, { useState } from 'react';
import { College } from '../types';

interface CollegeRegistrationProps {
  onSubmit: (college: College) => void;
  onCancel: () => void;
}

const CollegeRegistration: React.FC<CollegeRegistrationProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    country: 'India' as 'India' | 'Abroad',
    ranking: '',
    fees: '',
    exams: '',
    description: '',
    tags: '',
    image: '',
    accreditation: '',
    applicationDeadline: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.location || !formData.fees) {
      alert("Please fill in the required fields.");
      return;
    }

    const newCollege: College = {
      id: Date.now().toString(),
      name: formData.name,
      location: formData.location,
      country: formData.country,
      ranking: parseInt(formData.ranking) || 99,
      fees: formData.fees,
      exams: formData.exams.split(',').map(e => e.trim()).filter(e => e),
      image: formData.image || `https://picsum.photos/800/600?random=${Date.now()}`,
      description: formData.description || 'A newly registered institute.',
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      accreditation: formData.accreditation,
      applicationDeadline: formData.applicationDeadline
    };

    onSubmit(newCollege);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-indigo-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Institute Registration</h2>
          <p className="text-indigo-100 mt-1">Join CollegeGate to reach millions of students.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Institute Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Indian Institute of Science"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Bangalore, Karnataka"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Region</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="India">India</option>
                <option value="Abroad">Abroad</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">NIRF/Global Rank</label>
              <input
                type="number"
                name="ranking"
                value={formData.ranking}
                onChange={handleChange}
                placeholder="e.g. 1"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Accreditation</label>
              <input
                type="text"
                name="accreditation"
                value={formData.accreditation}
                onChange={handleChange}
                placeholder="e.g. NAAC A++, NBA, ABET"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Approx. Fees *</label>
              <input
                type="text"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                placeholder="e.g. ₹2 Lakhs/Year"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Application Deadline</label>
                <input
                type="text"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                placeholder="e.g. 30th April 2025"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Accepted Exams (comma separated)</label>
                <input
                type="text"
                name="exams"
                value={formData.exams}
                onChange={handleChange}
                placeholder="e.g. JEE Main, NEET, GATE, SAT"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">About the Institute</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Brief description about campus, courses, and history..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>

          <div className="space-y-2">
             <label className="text-sm font-semibold text-gray-700">Campus Image URL (Optional)</label>
             <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/campus.jpg"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
             />
             <p className="text-xs text-gray-500">Leave blank to generate a random placeholder image.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. Engineering, Research, Private, Public"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all transform hover:scale-105"
            >
              Register Institute
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CollegeRegistration;