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
  MAGIC_CAMPUS = 'MAGIC_CAMPUS', // Image Editing
  VOICE_LOUNGE = 'VOICE_LOUNGE', // Live API
  PROFILE = 'PROFILE',
  REGISTER = 'REGISTER', // New Registration View
  COMPARE = 'COMPARE', // New Compare View
  INQUIRY = 'INQUIRY',  // New Ask to College View
  DETAIL = 'DETAIL' // New College Detail View
}

export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
}