import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection,
  onSnapshot
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { User, UserRole, Inquiry } from '../types';

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();

// --- User Operations ---

export const saveUserToFirestore = async (user: FirebaseUser, role: UserRole = 'STUDENT') => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const newUser: User = {
      id: user.uid,
      name: user.displayName || 'Anonymous',
      email: user.email || '',
      role: role,
      timestamp: new Date().toISOString(),
      crmAccess: role === 'ADMIN' // Admins get CRM access by default
    };
    await setDoc(userRef, newUser);
    return newUser;
  } else {
    return userSnap.data() as User;
  }
};

export const getUserProfile = async (uid: string): Promise<User | null> => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data() as User;
  }
  return null;
};

export const updateUserProfile = async (uid: string, data: Partial<User>) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    ...data,
    updatedAt: new Date().toISOString()
  });
};

export const subscribeToAllUsers = (callback: (users: User[]) => void) => {
  const usersRef = collection(db, 'users');
  return onSnapshot(usersRef, (snapshot) => {
    const users = snapshot.docs.map(doc => doc.data() as User);
    callback(users);
  });
};

// --- Inquiry Operations ---

export const addInquiry = async (inquiry: Inquiry) => {
  const inquiryRef = doc(db, 'inquiries', inquiry.id);
  await setDoc(inquiryRef, inquiry);
};

export const subscribeToInquiries = (callback: (inquiries: Inquiry[]) => void) => {
  const inquiriesRef = collection(db, 'inquiries');
  return onSnapshot(inquiriesRef, (snapshot) => {
    const inquiries = snapshot.docs.map(doc => doc.data() as Inquiry);
    // Sort by timestamp descending
    inquiries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    callback(inquiries);
  });
};

export const updateInquiry = async (id: string, data: Partial<Inquiry>) => {
  const inquiryRef = doc(db, 'inquiries', id);
  await updateDoc(inquiryRef, data);
};
