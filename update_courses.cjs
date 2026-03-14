const fs = require('fs');

let content = fs.readFileSync('./constants.ts', 'utf8');

const categoryMap = {
  'Diploma in Computer Science Engineering': 'Engineering',
  'Diploma in Mechanical Engineering': 'Engineering',
  'Diploma in Civil Engineering': 'Engineering',
  'Diploma in Electronics & Communication': 'Engineering',
  'Diploma in Electrical Engineering': 'Engineering',
  'Diploma in Pharmacy': 'Medical',
  'Diploma in Marine Engineering': 'Engineering',
  'D.El.Ed (Diploma in Elementary Education)': 'Other',
  '1 Year Diploma : Hotel, Hospital Operation': 'Management',
  'BA - Bachelor of Arts': 'Other',
  'B.Com - Bachelor of Commerce': 'Management',
  'BA LL.B': 'Law',
  'B.Sc Nursing': 'Medical',
  'B.Sc Agriculture': 'Other',
  'B.Sc Biotechnology': 'Medical',
  'B.Sc Forensic Science': 'Medical',
  'BCA - Bachelor of Computer Application': 'Engineering',
  'BBA - Bachelor of Business Administration': 'Management',
  'BFA (Bachelor of Fine Arts) in Fashion Designing': 'Other',
  'B.Tech - Bachelor of Technology': 'Engineering',
  'BPT - Bachelor of Physiotherapy': 'Medical',
  'B.Pharma - Bachelor of Pharmacy': 'Medical',
  'B.Ed (Bachelor of Education)': 'Other',
  'B.Lib (Bachelor of Library Science)': 'Other',
  'LLB': 'Law',
  'BJMC (Bachelor of Journalism & Mass Communication)': 'Media Courses',
  'BHM / BHMCT': 'Management',
  'BSc Hotel Management': 'Management',
  'Bachelor Degree : Hotel & Hospitality Management': 'Management',
  'Bachelor in Travel & Tourism Management': 'Management',
  'Bachelor Degree : Culinary Arts (Chef)': 'Management',
  'Master of Commerce': 'Management',
  'MA (Master of Arts)': 'Other',
  'MCA - Master of Computer Applications': 'Engineering',
  'MBA (Master of Business Administration)': 'Management',
  'M.Tech (Master of Technology)': 'Engineering',
  'M.Lib (Master of Library Science)': 'Other',
  'LL.M - Master of Laws': 'Law',
  'GNM - General Nursing and Midwifery': 'Medical',
  'MBA : Hotel Management , Hospitality Management': 'Management',
  'Master Degree': 'Other',
  'MBA : Hospital, Health Care Management': 'Management'
};

for (const [name, category] of Object.entries(categoryMap)) {
  const regex = new RegExp(`name: '${name.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}',\\s*type: '([^']+)',`, 'g');
  content = content.replace(regex, `name: '${name}',\n    type: '$1',\n    category: '${category}',`);
}

fs.writeFileSync('./constants.ts', content);
