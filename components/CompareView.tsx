import React from 'react';
import { College } from '../types';

interface CompareViewProps {
  colleges: College[];
  onRemove: (id: string) => void;
  onBack: () => void;
}

const CompareView: React.FC<CompareViewProps> = ({ colleges, onRemove, onBack }) => {
  if (colleges.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">No Colleges Selected</h2>
        <p className="text-gray-500 mb-8">Please go back and select colleges to compare.</p>
        <button onClick={onBack} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 overflow-x-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">College Comparison</h2>
        <button onClick={onBack} className="text-indigo-600 hover:underline font-medium">
          &larr; Back to Listings
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 min-w-[800px]">
        <div className="grid divide-x divide-gray-200" style={{ gridTemplateColumns: `200px repeat(${colleges.length}, minmax(250px, 1fr))` }}>
          
          {/* Header Row: Images & Names */}
          <div className="p-4 bg-gray-50 font-semibold text-gray-500 flex items-center">
            Criteria
          </div>
          {colleges.map(college => (
            <div key={college.id} className="p-4 text-center relative group">
              <button 
                onClick={() => onRemove(college.id)}
                className="absolute top-2 right-2 bg-red-100 text-red-600 w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove"
              >
                ✕
              </button>
              <div className="h-32 w-full mb-3 rounded-lg overflow-hidden">
                <img src={college.image} alt={college.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-gray-800 text-sm md:text-base">{college.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{college.location}</p>
            </div>
          ))}

          {/* Ranking */}
          <div className="p-4 bg-gray-50 font-medium text-gray-600 flex items-center border-t border-gray-200">
            Ranking
          </div>
          {colleges.map(college => (
            <div key={college.id} className="p-4 text-center border-t border-gray-200 flex items-center justify-center">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                #{college.ranking}
              </span>
            </div>
          ))}

          {/* Fees */}
          <div className="p-4 bg-gray-50 font-medium text-gray-600 flex items-center border-t border-gray-200">
            Fees
          </div>
          {colleges.map(college => (
            <div key={college.id} className="p-4 text-center border-t border-gray-200 text-gray-800 font-medium">
              {college.fees}
            </div>
          ))}

          {/* Exams */}
          <div className="p-4 bg-gray-50 font-medium text-gray-600 flex items-center border-t border-gray-200">
            Accepted Exams
          </div>
          {colleges.map(college => (
            <div key={college.id} className="p-4 text-center border-t border-gray-200">
              <div className="flex flex-wrap gap-1 justify-center">
                {college.exams.map(exam => (
                  <span key={exam} className="text-xs border border-gray-300 px-2 py-0.5 rounded text-gray-600">
                    {exam}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Country/Type */}
          <div className="p-4 bg-gray-50 font-medium text-gray-600 flex items-center border-t border-gray-200">
            Region & Type
          </div>
          {colleges.map(college => (
            <div key={college.id} className="p-4 text-center border-t border-gray-200 text-sm text-gray-700">
               {college.country} • {college.tags.includes('Govt') ? 'Government' : 'Private'}
            </div>
          ))}

          {/* Description */}
           <div className="p-4 bg-gray-50 font-medium text-gray-600 flex items-center border-t border-gray-200">
            Highlights
          </div>
          {colleges.map(college => (
            <div key={college.id} className="p-4 text-sm text-gray-600 border-t border-gray-200 leading-relaxed">
              {college.description}
            </div>
          ))}

           {/* Action */}
           <div className="p-4 bg-gray-50 border-t border-gray-200"></div>
           {colleges.map(college => (
            <div key={college.id} className="p-4 text-center border-t border-gray-200">
              <button className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">
                Apply Now
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default CompareView;