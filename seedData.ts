import { Course, University } from './types';

export const INITIAL_UNIVERSITIES: Omit<University, 'id'>[] = [
  {
    name: "Partner University (Generic)",
    location: "Various Locations",
    modes: ["Regular", "Online", "Distance"],
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    websiteUrl: "https://admissioncell.online",
    description: "A placeholder for partner universities. Contact for specific university details.",
    courses: []
  }
];

export const INITIAL_COURSES: Omit<Course, 'id'>[] = [
  { name: "Diploma in Computer Science Engineering", type: "Diploma", modes: ["Regular"], description: "Diploma in CSE" },
  { name: "Diploma in Mechanical Engineering", type: "Diploma", modes: ["Regular"], description: "Diploma in ME" },
  { name: "Diploma in Civil Engineering", type: "Diploma", modes: ["Regular"], description: "Diploma in CE" },
  { name: "Diploma in Electronics & Communication", type: "Diploma", modes: ["Regular"], description: "Diploma in EC" },
  { name: "Diploma in Electrical Engineering", type: "Diploma", modes: ["Regular"], description: "Diploma in EE" },
  { name: "Diploma in Pharmacy", type: "Diploma", modes: ["Regular"], description: "D.Pharma" },
  { name: "Master of Commerce", type: "PG", modes: ["Regular", "Distance"], description: "M.Com" },
  { name: "Diploma in Marine Engineering", type: "Diploma", modes: ["Regular"], description: "Marine Engineering" },
  { name: "D.El.Ed (Diploma in Elementary Education)", type: "Diploma", modes: ["Regular"], description: "D.El.Ed" },
  { name: "BA - Bachelor of Arts", type: "UG", modes: ["Regular", "Distance", "Online"], description: "BA" },
  { name: "B.Com - Bachelor of Commerce", type: "UG", modes: ["Regular", "Distance", "Online"], description: "B.Com" },
  { name: "BA LL.B", type: "UG", modes: ["Regular"], description: "Integrated Law" },
  { name: "B.Sc Nursing", type: "UG", modes: ["Regular"], description: "Nursing" },
  { name: "B.Sc Agriculture", type: "UG", modes: ["Regular"], description: "Agriculture" },
  { name: "B.Sc Biotechnology", type: "UG", modes: ["Regular"], description: "Biotech" },
  { name: "B.Sc Forensic Science", type: "UG", modes: ["Regular"], description: "Forensic Science" },
  { name: "BCA", type: "UG", modes: ["Regular", "Distance", "Online"], description: "Bachelor of Computer Applications" },
  { name: "BBA", type: "UG", modes: ["Regular", "Distance", "Online"], description: "Bachelor of Business Administration" },
  { name: "BFA in Fashion Designing", type: "UG", modes: ["Regular"], description: "Fashion Designing" },
  { name: "B.Tech", type: "UG", modes: ["Regular"], description: "Bachelor of Technology" },
  { name: "BPT", type: "UG", modes: ["Regular"], description: "Bachelor of Physiotherapy" },
  { name: "B.Pharma", type: "UG", modes: ["Regular"], description: "Bachelor of Pharmacy" },
  { name: "B.Ed", type: "UG", modes: ["Regular", "Distance"], description: "Bachelor of Education" },
  { name: "B.Lib", type: "UG", modes: ["Regular", "Distance"], description: "Bachelor of Library Science" },
  { name: "LLB", type: "UG", modes: ["Regular"], description: "Bachelor of Laws" },
  { name: "BJMC", type: "UG", modes: ["Regular"], description: "Journalism & Mass Communication" },
  { name: "BHM / BHMCT", type: "UG", modes: ["Regular"], description: "Hotel Management" },
  { name: "MA", type: "PG", modes: ["Regular", "Distance", "Online"], description: "Master of Arts" },
  { name: "MCA", type: "PG", modes: ["Regular", "Distance", "Online"], description: "Master of Computer Applications" },
  { name: "MBA", type: "PG", modes: ["Regular", "Distance", "Online"], description: "Master of Business Administration" },
  { name: "M.Tech", type: "PG", modes: ["Regular"], description: "Master of Technology" },
  { name: "M.Lib", type: "PG", modes: ["Regular", "Distance"], description: "Master of Library Science" },
  { name: "LL.M", type: "PG", modes: ["Regular"], description: "Master of Laws" },
  { name: "GNM", type: "Diploma", modes: ["Regular"], description: "General Nursing and Midwifery" },
  { name: "PGDCA", type: "PG", modes: ["Regular", "Distance"], description: "Post Graduate Diploma in Computer Applications" },
  { name: "PhD in Computer Science / IT", type: "PG", modes: ["Regular"], description: "PhD" }
];
