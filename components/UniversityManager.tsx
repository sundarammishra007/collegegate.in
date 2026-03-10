import React, { useState, useEffect } from 'react';
import { universityService } from '../services/universityService';
import { INITIAL_UNIVERSITIES, INITIAL_COURSES } from '../seedData';
import { University, Course } from '../types';

export const UniversityManager: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [newUniversity, setNewUniversity] = useState<Partial<University>>({
    name: '',
    location: '',
    modes: [],
    image: '',
    websiteUrl: '',
    description: ''
  });
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    name: '',
    type: 'UG',
    modes: [],
    description: '',
    universityId: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const unis = await universityService.getAllUniversities();
      const crs = await universityService.getAllCourses();
      setUniversities(unis);
      setCourses(crs);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedData = async () => {
    setLoading(true);
    try {
      // Add initial university if none exist
      if (universities.length === 0) {
        for (const uni of INITIAL_UNIVERSITIES) {
          const uniId = await universityService.addUniversity(uni);
          // Add initial courses linked to this university
          for (const course of INITIAL_COURSES) {
            await universityService.addCourse({ ...course, universityId: uniId } as any);
          }
        }
        alert("Data seeded successfully!");
        loadData();
      } else {
        alert("Universities already exist. Skipping seed.");
      }
    } catch (error) {
      console.error("Error seeding data:", error);
      alert("Error seeding data.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUniversity = async () => {
    if (!newUniversity.name) return;
    setLoading(true);
    try {
      await universityService.addUniversity(newUniversity as any);
      setNewUniversity({ name: '', location: '', modes: [], image: '', websiteUrl: '', description: '' });
      loadData();
    } catch (error) {
      console.error("Error adding university:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async () => {
    if (!newCourse.name || !newCourse.universityId) return;
    setLoading(true);
    try {
      await universityService.addCourse(newCourse as any);
      setNewCourse({ name: '', type: 'UG', modes: [], description: '', universityId: '' });
      loadData();
    } catch (error) {
      console.error("Error adding course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6">University & Course Manager</h2>
      
      <div className="mb-8">
        <button 
          onClick={handleSeedData} 
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Seed Initial Data'}
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Click to populate with initial data scraped from admissioncell.online (if database is empty).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* University Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Add University</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="University Name"
              value={newUniversity.name}
              onChange={(e) => setNewUniversity({...newUniversity, name: e.target.value})}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Location"
              value={newUniversity.location}
              onChange={(e) => setNewUniversity({...newUniversity, location: e.target.value})}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newUniversity.image}
              onChange={(e) => setNewUniversity({...newUniversity, image: e.target.value})}
              className="w-full p-2 border rounded"
            />
             <input
              type="text"
              placeholder="Website URL"
              value={newUniversity.websiteUrl}
              onChange={(e) => setNewUniversity({...newUniversity, websiteUrl: e.target.value})}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={newUniversity.description}
              onChange={(e) => setNewUniversity({...newUniversity, description: e.target.value})}
              className="w-full p-2 border rounded"
            />
            <button 
              onClick={handleAddUniversity}
              disabled={loading}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              Add University
            </button>
          </div>

          <div className="mt-8">
            <h4 className="font-semibold mb-2">Existing Universities ({universities.length})</h4>
            <ul className="max-h-60 overflow-y-auto border rounded p-2">
              {universities.map(uni => (
                <li key={uni.id} className="p-2 border-b last:border-b-0 hover:bg-gray-50">
                  <div className="font-medium">{uni.name}</div>
                  <div className="text-xs text-gray-500">{uni.location}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Course Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Add Course</h3>
          <div className="space-y-4">
            <select
              value={newCourse.universityId}
              onChange={(e) => setNewCourse({...newCourse, universityId: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="">Select University</option>
              {universities.map(uni => (
                <option key={uni.id} value={uni.id}>{uni.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Course Name"
              value={newCourse.name}
              onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
              className="w-full p-2 border rounded"
            />
            <select
              value={newCourse.type}
              onChange={(e) => setNewCourse({...newCourse, type: e.target.value as any})}
              className="w-full p-2 border rounded"
            >
              <option value="UG">Undergraduate (UG)</option>
              <option value="PG">Postgraduate (PG)</option>
              <option value="Diploma">Diploma</option>
            </select>
            <textarea
              placeholder="Description"
              value={newCourse.description}
              onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
              className="w-full p-2 border rounded"
            />
            <button 
              onClick={handleAddCourse}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Add Course
            </button>
          </div>

          <div className="mt-8">
            <h4 className="font-semibold mb-2">Existing Courses ({courses.length})</h4>
            <ul className="max-h-60 overflow-y-auto border rounded p-2">
              {courses.map(course => (
                <li key={course.id} className="p-2 border-b last:border-b-0 hover:bg-gray-50">
                  <div className="font-medium">{course.name}</div>
                  <div className="text-xs text-gray-500">{course.type}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
