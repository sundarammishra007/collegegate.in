import React from 'react';
import { College } from '../types';

interface CollegeRankingsProps {
  colleges: College[];
  onCollegeClick: (college: College) => void;
}

const CollegeRankings: React.FC<CollegeRankingsProps> = ({ colleges, onCollegeClick }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">College Rankings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colleges.slice(0, 6).map((college) => (
          <div
            key={college.id}
            onClick={() => onCollegeClick(college)}
            className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
          >
            <img src={college.image} alt={college.name} className="w-full h-32 object-cover rounded mb-2" />
            <h4 className="font-semibold">{college.name}</h4>
            <p className="text-sm text-gray-600">{college.location}</p>
            {college.rating && <p className="text-sm">Rating: {college.rating}/5</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollegeRankings;