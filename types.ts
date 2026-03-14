export type CourseMode = 'Regular' | 'Online' | 'Distance';

export interface Course {
  id: string;
  name: string;
  type: 'Diploma' | 'UG' | 'PG';
  category?: 'Management' | 'Engineering' | 'Law' | 'Medical' | 'Media Courses' | 'Other';
  modes: CourseMode[];
  image: string;
  description?: string;
}

export interface University {
  id: string;
  name: string;
  location: string;
  country?: 'India' | 'Abroad';
  modes: CourseMode[];
  image: string;
  logo?: string;
  tags: string[];
  websiteUrl?: string;
}

export interface College {
  id: string;
  name: string;
  location: string;
  country?: 'India' | 'Abroad';
  ranking?: number;
  fees: string;
  exams?: string[];
  image: string;
  description?: string;
  tags: string[];
  accreditation?: string;
  facilities?: string[];
  alumni?: string[];
  establishedYear?: number;
  placementRecord?: string;
  applicationDeadline?: string;
  rating?: number;
  reviews?: number;
  logo?: string;
  courses?: string[];
  placement?: string;
  type?: string;
  established?: string;
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
  UNIVERSITY_DETAIL = 'UNIVERSITY_DETAIL',
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

export type UserRole = 'STUDENT' | 'COUNSELOR' | 'ADMIN' | 'TRAINEE' | 'COLLEGE_PARTNER' | 'ASSOCIATE_PARTNER';

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
  crmAccess?: boolean; // New field for CRM access control
  academicAchievements?: string;
  interests?: string[];
  preferredStudyModes?: CourseMode[];
  dateOfBirth?: string;
  hobby?: string;
  dreamAndGoal?: string;
  project?: string;
  bestFriendName?: string;
  idCardUrl?: string;
  verificationStatus?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'NOT_SUBMITTED';
  idUploadedAt?: string;
  rejectionReason?: string;
}

export interface Exam {
  id: string;
  name: string;
  description: string;
  officialWebsite: string;
  examDate: string;
  registrationDeadline: string;
}

export interface CutoffData {
  id: string;
  examId: string;
  collegeId: string;
  courseId: string;
  year: number;
  category: string; // e.g., General, OBC, SC, ST
  openingRank: number;
  closingRank: number;
  round: number;
}

export interface ExamFact {
  id: string;
  examId: string;
  factTitle: string;
  factDescription: string;
}

export interface Inquiry {
  id: string;
  studentName: string;
  studentId: string;
  email: string;
  mobile: string;
  whatsapp?: string;
  course: string;
  mode: CourseMode;
  query: string;
  timestamp: string;
  status: 'PENDING' | 'ANSWERED';
  notes?: string[]; // New field for CRM notes
  collegeId?: string; // To link inquiry to specific college
  assignedTo?: string; // ID of the counselor/associate assigned
}