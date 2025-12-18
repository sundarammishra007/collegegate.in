import { College } from './types';

export const MOCK_COLLEGES: College[] = [
  // --- Engineering & Tech ---
  {
    id: '30',
    name: 'Indian Institute of Technology, Madras',
    location: 'Chennai, Tamil Nadu',
    country: 'India',
    ranking: 1,
    fees: '₹2.15 Lakhs/Year',
    exams: ['JEE Advanced'],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000',
    description: 'Consistently ranked #1 in India by NIRF. Known for its lush green campus carved out of a natural forest.',
    tags: ['Engineering', 'Research', 'Govt', 'Top Tier'],
    accreditation: 'NAAC A++',
    establishedYear: 1959
  },
  // --- Art & Design ---
  {
    id: '90',
    name: 'National Institute of Design (NID)',
    location: 'Ahmedabad, Gujarat',
    country: 'India',
    ranking: 1,
    fees: '₹3.5 Lakhs/Year',
    exams: ['NID DAT'],
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000',
    description: 'The premier institute for design education. Known for its world-class focus on industrial, communication, and textile design.',
    tags: ['Art', 'Design', 'Creative', 'Govt'],
    accreditation: 'Institute of National Importance',
    establishedYear: 1961
  },
  {
    id: '91',
    name: 'Sir J.J. School of Art',
    location: 'Mumbai, Maharashtra',
    country: 'India',
    ranking: 2,
    fees: '₹50,000/Year',
    exams: ['MAH AAC CET'],
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=1000',
    description: 'One of the oldest and most prestigious art institutions in India, offering specialized courses in Fine Arts and Sculpture.',
    tags: ['Art', 'Fine Arts', 'Classic', 'Govt'],
    establishedYear: 1857
  },
  // --- Agriculture ---
  {
    id: '100',
    name: 'Punjab Agricultural University (PAU)',
    location: 'Ludhiana, Punjab',
    country: 'India',
    ranking: 1,
    fees: '₹85,000/Year',
    exams: ['PAU Entrance'],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000',
    description: 'A global leader in agricultural research, PAU played a pivotal role in the Green Revolution of India.',
    tags: ['Agriculture', 'Research', 'B.Sc Agriculture', 'Govt'],
    establishedYear: 1962
  },
  {
    id: '101',
    name: 'Tamil Nadu Agricultural University (TNAU)',
    location: 'Coimbatore, Tamil Nadu',
    country: 'India',
    ranking: 2,
    fees: '₹60,000/Year',
    exams: ['TNAU UG Entrance'],
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1000',
    description: 'A pioneer in the field of farm technology and crop management with extensive experimental fields.',
    tags: ['Agriculture', 'Tech', 'Farming', 'Govt'],
    establishedYear: 1971
  },
  // --- Online Degrees ---
  {
    id: '50',
    name: 'IGNOU - Online Division',
    location: 'New Delhi, India',
    country: 'India',
    ranking: 1,
    fees: '₹12,000/Year',
    exams: ['Direct Admission'],
    image: 'https://images.unsplash.com/photo-1501503060809-54bc97023d1b?auto=format&fit=crop&q=80&w=1000',
    description: 'Offering recognized degrees worldwide through flexible online learning modules.',
    tags: ['Online', 'Distance', 'Govt', 'Affordable'],
    establishedYear: 1985
  },
  {
    id: '51',
    name: 'Coursera x University of London (B.Sc CS)',
    location: 'Remote/Global',
    country: 'Abroad',
    ranking: 5,
    fees: '₹1.5 Lakhs/Year',
    exams: ['English Proficiency'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000',
    description: 'Earn a top-tier UK degree from anywhere in the world with flexible pacing and industry-ready skills.',
    tags: ['Online', 'Global', 'CS', 'Industry Partner'],
  },
  // --- Medical & Nursing ---
  {
    id: '3',
    name: 'AIIMS',
    location: 'New Delhi',
    country: 'India',
    ranking: 1,
    fees: '₹5,856/Total',
    exams: ['NEET'],
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=1000',
    description: 'The All India Institute of Medical Sciences (AIIMS) New Delhi is the premier medical research public university and hospital based in New Delhi, India.',
    tags: ['Medical', 'MBBS', 'Govt', 'Nursing']
  }
];

export const SYSTEM_INSTRUCTION_COUNSELOR = `You are "Guide", a professional and highly specialized college counselor for CollegeGate. Your expertise is strictly limited to education, college admissions, exams, and career skill roadmaps.

CONVERSATION RULES:
1. ONLY answer questions related to colleges, universities, degrees, exams (JEE, NEET, etc.), and academic roadmaps.
2. If a user asks about off-topic subjects (food, weather, etc.), politely refuse: "I apologize, but my expertise is limited to college counseling and education. How can I help you with your academic goals today?"
3. Skills Expertise: You can provide roadmaps for high-demand skills like Data Science, AI, Web Dev, etc.
4. Visualizations: Use the 'generateCollegeImage' tool whenever a student wants to see a college campus or architectural visualization.
5. Keep responses concise (1-3 sentences) for voice-call clarity.
6. If the user has been talking for a while, be supportive.

IMAGE TOOLING:
When you use 'generateCollegeImage', provide a vivid description of the campus or building.`;

export const SYSTEM_INSTRUCTION_STUDENT = `You are Alex, a curious high school student seeking admission advice. You have 85% grades and are interested in Tech or Nursing. You are talking to a human counselor trainee. Act like a student and ask relevant educational questions.`;
