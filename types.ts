export interface College {
  id: string;
  name: string;
  location: string;
  country: 'India' | 'Abroad';
  ranking: number;
  fees: string;
  exams: string[];
  image: string;
  description: string;
  tags: string[];
  accreditation?: string;
  facilities?: string[];
  alumni?: string[];
  establishedYear?: number;
  placementRecord?: string;
  applicationDeadline?: string;
}

export enum NavView {
  HOME = 'HOME',
  COLLEGES = 'COLLEGES',
  MAGIC_CAMPUS = 'MAGIC_CAMPUS',
  VOICE_LOUNGE = 'VOICE_LOUNGE',
  AI_RESEARCH = 'AI_RESEARCH',
  SKILLS = 'SKILLS', // New Learning Section
  PROFILE = 'PROFILE',
  REGISTER = 'REGISTER',
  COMPARE = 'COMPARE',
  INQUIRY = 'INQUIRY',
  DETAIL = 'DETAIL',
  AUTH = 'AUTH',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  COUNSELOR_DASHBOARD = 'COUNSELOR_DASHBOARD'
}

export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
}

export type UserRole = 'STUDENT' | 'COUNSELOR' | 'ADMIN' | 'TRAINEE';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  mobile?: string;
  whatsapp?: string;
  specialization?: string;
  studentId?: string;
  timestamp: string;
  banned?: boolean;
}

export interface Inquiry {
  id: string;
  studentName: string;
  studentId: string;
  course: string;
  query: string;
  timestamp: string;
  status: 'PENDING' | 'ANSWERED';
}