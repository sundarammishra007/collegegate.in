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
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { User, UserRole, Inquiry, LiveUpdate } from '../types';

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// --- User Operations ---

export const saveUserToFirestore = async (user: FirebaseUser, role: UserRole = 'STUDENT') => {
  const userRef = doc(db, 'users', user.uid);
  try {
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
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'users');
    throw error;
  }
};

export const getUserProfile = async (uid: string): Promise<User | null> => {
  const userRef = doc(db, 'users', uid);
  try {
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data() as User;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'users');
    throw error;
  }
};

export const updateUserProfile = async (uid: string, data: Partial<User>) => {
  const userRef = doc(db, 'users', uid);
  try {
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, 'users');
    throw error;
  }
};

export const subscribeToAllUsers = (callback: (users: User[]) => void) => {
  const usersRef = collection(db, 'users');
  return onSnapshot(usersRef, (snapshot) => {
    const users = snapshot.docs.map(doc => doc.data() as User);
    callback(users);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, 'users');
  });
};

// --- Inquiry Operations ---

export const addInquiry = async (inquiry: Inquiry) => {
  const inquiryRef = doc(db, 'inquiries', inquiry.id);
  try {
    await setDoc(inquiryRef, inquiry);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'inquiries');
    throw error;
  }
};

export const subscribeToInquiries = (callback: (inquiries: Inquiry[]) => void) => {
  const inquiriesRef = collection(db, 'inquiries');
  return onSnapshot(inquiriesRef, (snapshot) => {
    const inquiries = snapshot.docs.map(doc => doc.data() as Inquiry);
    // Sort by timestamp descending
    inquiries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    callback(inquiries);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, 'inquiries');
  });
};

export const updateInquiry = async (id: string, data: Partial<Inquiry>) => {
  const inquiryRef = doc(db, 'inquiries', id);
  try {
    await updateDoc(inquiryRef, data);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, 'inquiries');
    throw error;
  }
};


