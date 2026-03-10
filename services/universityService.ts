import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { University, Course } from '../types';

const UNIVERSITIES_COLLECTION = 'universities';
const COURSES_COLLECTION = 'courses';

export const universityService = {
  // University Operations
  getAllUniversities: async (): Promise<University[]> => {
    const querySnapshot = await getDocs(collection(db, UNIVERSITIES_COLLECTION));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as University));
  },

  getUniversityById: async (id: string): Promise<University | null> => {
    const docRef = doc(db, UNIVERSITIES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as University) : null;
  },

  addUniversity: async (university: Omit<University, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, UNIVERSITIES_COLLECTION), university);
    return docRef.id;
  },

  updateUniversity: async (id: string, updates: Partial<University>): Promise<void> => {
    const docRef = doc(db, UNIVERSITIES_COLLECTION, id);
    await updateDoc(docRef, updates);
  },

  deleteUniversity: async (id: string): Promise<void> => {
    await deleteDoc(doc(db, UNIVERSITIES_COLLECTION, id));
  },

  // Course Operations
  getAllCourses: async (): Promise<Course[]> => {
    const querySnapshot = await getDocs(collection(db, COURSES_COLLECTION));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
  },

  getCoursesByUniversity: async (universityId: string): Promise<Course[]> => {
    const q = query(collection(db, COURSES_COLLECTION), where('universityId', '==', universityId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
  },

  addCourse: async (course: Omit<Course, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, COURSES_COLLECTION), course);
    return docRef.id;
  },

  updateCourse: async (id: string, updates: Partial<Course>): Promise<void> => {
    const docRef = doc(db, COURSES_COLLECTION, id);
    await updateDoc(docRef, updates);
  },

  deleteCourse: async (id: string): Promise<void> => {
    await deleteDoc(doc(db, COURSES_COLLECTION, id));
  }
};
