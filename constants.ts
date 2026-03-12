import { College, Course, University } from './types';

export const COURSES_DATA: Course[] = [
  // --- Diploma Programs ---
  {
    id: 'd1',
    name: 'Diploma in Computer Science Engineering',
    type: 'Diploma',
    modes: ['Regular', 'Distance'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000',
    description: 'Foundation in computing, programming, and system design.'
  },
  {
    id: 'd2',
    name: 'Diploma in Mechanical Engineering',
    type: 'Diploma',
    modes: ['Regular', 'Distance'],
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=1000',
    description: 'Study of mechanics, thermodynamics, and structural analysis.'
  },
  {
    id: 'd3',
    name: 'Diploma in Civil Engineering',
    type: 'Diploma',
    modes: ['Regular', 'Distance'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000',
    description: 'Construction, design, and maintenance of physical environments.'
  },
  {
    id: 'd4',
    name: 'Diploma in Electronics & Communication',
    type: 'Diploma',
    modes: ['Regular', 'Distance'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000',
    description: 'Electronic circuits, communication systems, and signal processing.'
  },
  {
    id: 'd5',
    name: 'Diploma in Electrical Engineering',
    type: 'Diploma',
    modes: ['Regular', 'Distance'],
    image: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&q=80&w=1000',
    description: 'Study of electricity, electronics, and electromagnetism.'
  },
  {
    id: 'd6',
    name: 'Diploma in Pharmacy',
    type: 'Diploma',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=1000',
    description: 'Fundamentals of pharmaceutical sciences and drug dispensing.'
  },
  {
    id: 'd7',
    name: 'Diploma in Marine Engineering',
    type: 'Diploma',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1505672675380-412294c87e93?auto=format&fit=crop&q=80&w=1000',
    description: 'Operation and maintenance of ship machinery.'
  },
  {
    id: 'd8',
    name: 'D.El.Ed (Diploma in Elementary Education)',
    type: 'Diploma',
    modes: ['Regular', 'Distance'],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000',
    description: 'Training for primary school teaching.'
  },
  {
    id: 'd9',
    name: '1 Year Diploma : Hotel, Hospital Operation',
    type: 'Diploma',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000',
    description: 'Diploma in hotel and hospital operations management.'
  },

  // --- Undergraduate (UG) ---
  {
    id: 'u1',
    name: 'BA - Bachelor of Arts',
    type: 'UG',
    modes: ['Regular', 'Online', 'Distance'],
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=1000',
    description: 'Humanities, social sciences, and liberal arts.'
  },
  {
    id: 'u2',
    name: 'B.Com - Bachelor of Commerce',
    type: 'UG',
    modes: ['Regular', 'Online', 'Distance'],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000',
    description: 'Commerce, accounting, finance, and business law.'
  },
  {
    id: 'u3',
    name: 'BA LL.B',
    type: 'UG',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1000',
    description: 'Integrated arts and law degree.'
  },
  {
    id: 'u4',
    name: 'B.Sc Nursing',
    type: 'UG',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000',
    description: 'Professional nursing and healthcare.'
  },
  {
    id: 'u5',
    name: 'B.Sc Agriculture',
    type: 'UG',
    modes: ['Regular', 'Distance'],
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1000',
    description: 'Agricultural science and modern farming techniques.'
  },
  {
    id: 'u6',
    name: 'B.Sc Biotechnology',
    type: 'UG',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000',
    description: 'Biological systems and technology application.'
  },
  {
    id: 'u7',
    name: 'B.Sc Forensic Science',
    type: 'UG',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1000',
    description: 'Application of science to criminal and civil laws.'
  },
  {
    id: 'u8',
    name: 'BCA - Bachelor of Computer Application',
    type: 'UG',
    modes: ['Regular', 'Online', 'Distance'],
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=1000',
    description: 'Software development and computer applications.'
  },
  {
    id: 'u9',
    name: 'BBA - Bachelor of Business Administration',
    type: 'UG',
    modes: ['Regular', 'Online', 'Distance'],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000',
    description: 'Business management and administration principles.'
  },
  {
    id: 'u10',
    name: 'BFA (Bachelor of Fine Arts) in Fashion Designing',
    type: 'UG',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1000',
    description: 'Visual arts and fashion design.'
  },
  {
    id: 'u11',
    name: 'B.Tech - Bachelor of Technology',
    type: 'UG',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?auto=format&fit=crop&q=80&w=1000',
    description: 'Engineering and technology disciplines.'
  },
  {
    id: 'u12',
    name: 'BPT - Bachelor of Physiotherapy',
    type: 'UG',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1576091160550-217358c7e618?auto=format&fit=crop&q=80&w=1000',
    description: 'Physical therapy and rehabilitation.'
  },
  {
    id: 'u13',
    name: 'B.Pharma - Bachelor of Pharmacy',
    type: 'UG',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=1000',
    description: 'Pharmaceutical sciences and medicine.'
  },
  {
    id: 'u14',
    name: 'B.Ed (Bachelor of Education)',
    type: 'UG',
    modes: ['Regular', 'Distance'],
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000',
    description: 'Professional degree for teaching.'
  },
  {
    id: 'u15',
    name: 'B.Lib (Bachelor of Library Science)',
    type: 'UG',
    modes: ['Regular', 'Distance'],
    image: 'https://images.unsplash.com/photo-1507842217121-9e962835d75d?auto=format&fit=crop&q=80&w=1000',
    description: 'Library and information science.'
  },
  {
    id: 'u16',
    name: 'LLB',
    type: 'UG',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&q=80&w=1000',
    description: 'Law and legal studies.'
  },
  {
    id: 'u17',
    name: 'BJMC (Bachelor of Journalism & Mass Communication)',
    type: 'UG',
    modes: ['Regular', 'Online', 'Distance'],
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000',
    description: 'Journalism, media, and communication.'
  },
  {
    id: 'u18',
    name: 'BHM / BHMCT',
    type: 'UG',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&q=80&w=1000',
    description: 'Hotel management and catering technology.'
  },
  {
    id: 'u19',
    name: 'BSc Hotel Management',
    type: 'UG',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1551882547-ff40c0d5bf8f?auto=format&fit=crop&q=80&w=1000',
    description: 'Bachelor of Science in Hotel Management.'
  },
  {
    id: 'u20',
    name: 'Bachelor Degree : Hotel & Hospitality Management',
    type: 'UG',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000',
    description: 'Comprehensive degree in hotel and hospitality management.'
  },
  {
    id: 'u21',
    name: 'Bachelor in Travel & Tourism Management',
    type: 'UG',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1000',
    description: 'Degree in travel and tourism operations.'
  },
  {
    id: 'u22',
    name: 'Bachelor Degree : Culinary Arts (Chef)',
    type: 'UG',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=1000',
    description: 'Professional culinary arts and chef training.'
  },

  // --- Postgraduate (PG) ---
  {
    id: 'p1',
    name: 'Master of Commerce',
    type: 'PG',
    modes: ['Regular', 'Online', 'Distance'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    description: 'Advanced commerce and business studies.'
  },
  {
    id: 'p2',
    name: 'MA (Master of Arts)',
    type: 'PG',
    modes: ['Regular', 'Online', 'Distance'],
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1000',
    description: 'Advanced studies in arts and humanities.'
  },
  {
    id: 'p3',
    name: 'MCA - Master of Computer Applications',
    type: 'PG',
    modes: ['Regular', 'Online', 'Distance'],
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1000',
    description: 'Advanced computer applications and software.'
  },
  {
    id: 'p4',
    name: 'MBA (Master of Business Administration)',
    type: 'PG',
    modes: ['Regular', 'Online', 'Distance'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000',
    description: 'Business administration and management.'
  },
  {
    id: 'p5',
    name: 'M.Tech (Master of Technology)',
    type: 'PG',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000',
    description: 'Advanced technology and engineering.'
  },
  {
    id: 'p6',
    name: 'M.Lib (Master of Library Science)',
    type: 'PG',
    modes: ['Regular', 'Distance'],
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1000',
    description: 'Advanced library science.'
  },
  {
    id: 'p7',
    name: 'LL.M - Master of Laws',
    type: 'PG',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1000',
    description: 'Advanced legal studies.'
  },
  {
    id: 'p8',
    name: 'GNM - General Nursing and Midwifery',
    type: 'Diploma', // GNM is typically a diploma, though listed under PG in the prompt list, I'll classify as Diploma/PG based on context, but usually it's a diploma. Let's stick to the prompt's grouping or just put it in Diploma? The prompt had it at the end. I'll put it in Diploma for accuracy or PG if strictly following the list order. Let's put it in Diploma as it's a Diploma course.
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1584515933487-9bdbb7d43153?auto=format&fit=crop&q=80&w=1000',
    description: 'Nursing and midwifery.'
  },
  {
    id: 'p9',
    name: 'MBA : Hotel Management , Hospitality Management',
    type: 'PG',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000',
    description: 'Master of Business Administration in Hotel and Hospitality Management.'
  },
  {
    id: 'p10',
    name: 'Master Degree',
    type: 'PG',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000',
    description: 'General Master Degree programs.'
  },
  {
    id: 'p11',
    name: 'MBA : Hospital, Health Care Management',
    type: 'PG',
    modes: ['Regular'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    description: 'Master of Business Administration in Hospital and Healthcare Management.'
  }
];

export const UNIVERSITIES_DATA: University[] = [
    {
        id: 'sbihm-01',
        name: 'Subhas Bose Institute of Hotel Management (SBIHM Group)',
        location: 'Kolkata, West Bengal',
        country: 'India',
        modes: ['Regular'],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000',
        logo: 'https://ui-avatars.com/api/?name=SBIHM&background=random&color=fff&size=128',
        tags: ['AICTE Approved', 'UGC Recognized', 'MAKAUT', 'NCHMCT'],
        websiteUrl: '#'
    },
    {
        id: 'jnu',
        name: 'Jaipur National University',
        location: 'Jaipur, Rajasthan',
        country: 'India',
        modes: ['Regular', 'Online', 'Distance'],
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000',
        logo: 'https://ui-avatars.com/api/?name=Jaipur+National+University&background=random&color=fff&size=128',
        tags: ['UGC Approved', 'NAAC Accredited'],
        websiteUrl: 'https://admissioncell.online/university/jnu-regular.php'
    },
    {
        id: 'mangalayatan',
        name: 'Mangalayatan University',
        location: 'Aligarh, UP',
        country: 'India',
        modes: ['Regular', 'Online', 'Distance'],
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000',
        logo: 'https://ui-avatars.com/api/?name=Mangalayatan+University&background=random&color=fff&size=128',
        tags: ['UGC Approved', 'NAAC A+'],
        websiteUrl: 'https://admissioncell.online/university/mangalayatan-regular.php'
    },
    {
        id: 'vgu',
        name: 'Vivekananda Global University (VGU)',
        location: 'Jaipur, Rajasthan',
        country: 'India',
        modes: ['Regular', 'Online', 'Distance'],
        image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1000',
        logo: 'https://ui-avatars.com/api/?name=Vivekananda+Global+University&background=random&color=fff&size=128',
        tags: ['NAAC A+', 'ICAR Approved'],
        websiteUrl: 'https://admissioncell.online/university/vgu-regular.php'
    },
    {
        id: 'usha_martin',
        name: 'Usha Martin University',
        location: 'Ranchi, Jharkhand',
        country: 'India',
        modes: ['Regular'],
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000',
        logo: 'https://ui-avatars.com/api/?name=Usha+Martin+University&background=random&color=fff&size=128',
        tags: ['UGC Approved', 'AIU Member'],
        websiteUrl: 'https://admissioncell.online/university/usha-marting.php'
    },
    {
        id: 'subharti',
        name: 'Subharti University',
        location: 'Meerut, UP',
        country: 'India',
        modes: ['Regular', 'Online'],
        image: 'https://images.unsplash.com/photo-1592280771884-131185386d28?auto=format&fit=crop&q=80&w=1000',
        logo: 'https://ui-avatars.com/api/?name=Subharti+University&background=random&color=fff&size=128',
        tags: ['NAAC A', 'Distance Education'],
        websiteUrl: 'https://admissioncell.online/university/subharti.php'
    },
    {
        id: 'srm',
        name: 'SRM University',
        location: 'Chennai, Tamil Nadu',
        country: 'India',
        modes: ['Regular'],
        image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=1000',
        logo: 'https://ui-avatars.com/api/?name=SRM+University&background=random&color=fff&size=128',
        tags: ['NAAC A++', 'Top Ranked'],
        websiteUrl: 'https://admissioncell.online/university/srm-university.php'
    },
    {
        id: 'sandeep',
        name: 'Sandeep University',
        location: 'Nashik, Maharashtra',
        country: 'India',
        modes: ['Regular'],
        image: 'https://images.unsplash.com/photo-1590012314607-6da99985857e?auto=format&fit=crop&q=80&w=1000',
        logo: 'https://ui-avatars.com/api/?name=Sandeep+University&background=random&color=fff&size=128',
        tags: ['UGC Recognized'],
        websiteUrl: 'https://admissioncell.online/university/sandeep-university.php'
    },
    {
        id: 'sage',
        name: 'SAGE University',
        location: 'Indore/Bhopal',
        country: 'India',
        modes: ['Regular'],
        image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1000',
        logo: 'https://ui-avatars.com/api/?name=SAGE+University&background=random&color=fff&size=128',
        tags: ['Top Private University'],
        websiteUrl: 'https://admissioncell.online/university/sage-university.php'
    },
    {
        id: 'marwadi',
        name: 'Marwadi University',
        location: 'Rajkot, Gujarat',
        country: 'India',
        modes: ['Regular'],
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000',
        logo: 'https://ui-avatars.com/api/?name=Marwadi+University&background=random&color=fff&size=128',
        tags: ['NAAC A+', 'GTU Affiliated'],
        websiteUrl: 'https://admissioncell.online/university/marwadi-university.php'
    },
    {
        id: 'mangalmay',
        name: 'Mangalmay University',
        location: 'Greater Noida, UP',
        country: 'India',
        modes: ['Regular'],
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000',
        logo: 'https://ui-avatars.com/api/?name=Mangalmay+University&background=random&color=fff&size=128',
        tags: ['NBA Accredited'],
        websiteUrl: 'https://admissioncell.online/university/mangalmay-university.php'
    },
    {
        id: 'arka_jain',
        name: 'Arka Jain University',
        location: 'Jamshedpur, Jharkhand',
        country: 'India',
        modes: ['Regular'],
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000',
        logo: 'https://ui-avatars.com/api/?name=Arka+Jain+University&background=random&color=fff&size=128',
        tags: ['First Private University in Region'],
        websiteUrl: 'https://admissioncell.online/university/arka-jain.php'
    },
    {
        id: 'csjmu',
        name: 'Chatrapati Shahuji Maharaj University',
        location: 'Kanpur, UP',
        country: 'India',
        modes: ['Regular'],
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000',
        logo: 'https://ui-avatars.com/api/?name=CSJMU&background=random&color=fff&size=128',
        tags: ['B.Ed. Admission Open 2026', 'UGC Recognized'],
        websiteUrl: '#'
    },
    {
        id: 'gniot',
        name: 'Greater Noida Institute of Technology (GNIOT)',
        location: 'Greater Noida, Delhi NCR',
        country: 'India',
        modes: ['Regular'],
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000',
        logo: 'https://ui-avatars.com/api/?name=GNIOT&background=random&color=fff&size=128',
        tags: ['NAAC A+', 'AICTE Approved', 'BSCC Supported'],
        websiteUrl: '#'
    },
    {
        id: 'gku',
        name: 'Guru Kashi University',
        location: 'Talwandi Sabo, Punjab',
        country: 'India',
        modes: ['Regular'],
        image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1000',
        logo: 'https://ui-avatars.com/api/?name=Guru+Kashi+University&background=random&color=fff&size=128',
        tags: ['UGC Approved'],
        websiteUrl: '#'
    },
    {
        id: 'dbu',
        name: 'Desh Bhagat University',
        location: 'Mandi Gobindgarh, Punjab',
        country: 'India',
        modes: ['Regular'],
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000',
        logo: 'https://ui-avatars.com/api/?name=Desh+Bhagat+University&background=random&color=fff&size=128',
        tags: ['NAAC Accredited', 'UGC Approved', '100% Job Valid Degree'],
        websiteUrl: '#'
    },
    {
        id: 'riit',
        name: 'Roorkee Institute of Technology (RIT)',
        location: 'Roorkee, Uttarakhand',
        country: 'India',
        modes: ['Regular'],
        image: 'https://images.unsplash.com/photo-1592280771884-131185386d28?auto=format&fit=crop&q=80&w=1000',
        logo: 'https://ui-avatars.com/api/?name=RIT&background=random&color=fff&size=128',
        tags: ['NAAC Accredited', 'AICTE Approved'],
        websiteUrl: '#'
    },
    {
        id: 'niu',
        name: 'Noida International University',
        location: 'Greater Noida, UP',
        country: 'India',
        modes: ['Regular'],
        image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=1000',
        logo: 'https://ui-avatars.com/api/?name=NIU&background=random&color=fff&size=128',
        tags: ['NAAC Accredited', 'UGC Approved'],
        websiteUrl: '#'
    }
];

export const MOCK_COLLEGES: College[] = [
  // --- Top NIRF Ranked Colleges ---
  {
    id: 'nirf-1',
    name: 'Hindu College',
    location: 'Delhi, Delhi',
    country: 'India',
    rating: 4.9,
    reviews: 1200,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000',
    logo: 'https://ui-avatars.com/api/?name=Hindu+College&background=random&color=fff&size=128',
    tags: ['NIRF Rank 1', 'Government', 'NAAC A+'],
    courses: ['BA', 'B.Sc', 'B.Com', 'MA', 'M.Sc'],
    fees: '₹18,000 - ₹25,000 / year',
    placement: '₹10.5 LPA Avg',
    type: 'Government',
    established: '1899'
  },
  {
    id: 'nirf-2',
    name: 'Miranda House',
    location: 'Delhi, Delhi',
    country: 'India',
    rating: 4.9,
    reviews: 1150,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000',
    logo: 'https://ui-avatars.com/api/?name=Miranda+House&background=random&color=fff&size=128',
    tags: ['NIRF Rank 2', 'Government', 'NAAC A+'],
    courses: ['BA', 'B.Sc', 'MA', 'M.Sc'],
    fees: '₹14,000 - ₹19,000 / year',
    placement: '₹9.0 LPA Avg',
    type: 'Government',
    established: '1948'
  },
  {
    id: 'nirf-3',
    name: 'Hans Raj College',
    location: 'Delhi, Delhi',
    country: 'India',
    rating: 4.8,
    reviews: 1050,
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1000',
    logo: 'https://ui-avatars.com/api/?name=Hans+Raj+College&background=random&color=fff&size=128',
    tags: ['NIRF Rank 3', 'Government', 'NAAC A+'],
    courses: ['BA', 'B.Sc', 'B.Com', 'MA', 'M.Sc'],
    fees: '₹20,000 - ₹24,000 / year',
    placement: '₹9.8 LPA Avg',
    type: 'Government',
    established: '1948'
  },
  {
    id: 'nirf-4',
    name: 'Kirori Mal College',
    location: 'Delhi, Delhi',
    country: 'India',
    rating: 4.8,
    reviews: 980,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000',
    logo: 'https://ui-avatars.com/api/?name=Kirori+Mal+College&background=random&color=fff&size=128',
    tags: ['NIRF Rank 4', 'Government', 'NAAC A+'],
    courses: ['BA', 'B.Sc', 'B.Com', 'MA', 'M.Sc'],
    fees: '₹12,000 - ₹15,000 / year',
    placement: '₹8.5 LPA Avg',
    type: 'Government',
    established: '1954'
  },
  {
    id: 'nirf-5',
    name: "St. Stephen's College",
    location: 'Delhi, Delhi',
    country: 'India',
    rating: 4.9,
    reviews: 1300,
    image: 'https://images.unsplash.com/photo-1592280771884-131185386d28?auto=format&fit=crop&q=80&w=1000',
    logo: 'https://ui-avatars.com/api/?name=St+Stephens+College&background=random&color=fff&size=128',
    tags: ['NIRF Rank 5', 'Government', 'NAAC A++'],
    courses: ['BA', 'B.Sc', 'MA', 'M.Sc'],
    fees: '₹40,000 - ₹45,000 / year',
    placement: '₹11.0 LPA Avg',
    type: 'Government',
    established: '1881'
  },
  // --- Hospitality & Management ---
  {
    id: 'sbihm-01',
    name: 'Subhas Bose Institute of Hotel Management (SBIHM Group)',
    location: 'Kolkata, West Bengal',
    country: 'India',
    ranking: 1,
    fees: 'Contact for Details',
    exams: ['Direct Admission'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000',
    description: 'Subhas Bose Institute of Hotel Management (SBIHM Group), an educational institution approved by AICTE, UGC, MAKAUT & NCHMCT, having its campus and administrative office at Kolkata, West Bengal (hereinafter referred to as the “Institute”).\n\nCourses Offered:\n• BSc Hotel Management\n• Bachelor Degree: Hotel & Hospitality Management\n• MBA: Hotel Management, Hospitality Management\n• Master Degree\n• MBA: Hospital, Health Care Management\n• 1 Year Diploma: Hotel, Hospital Operation\n• Bachelor in Travel & Tourism Management\n• Bachelor Degree: Culinary Arts (Chef)\n• BBA / BCA',
    tags: ['Hotel Management', 'Hospitality', 'Culinary Arts', 'Healthcare Management', 'BBA', 'BCA'],
    accreditation: 'AICTE, UGC, MAKAUT & NCHMCT',
    facilities: ['Training Kitchens', 'Mock Bar', 'Housekeeping Lab', 'Front Office Lab', 'Computer Lab', 'Library']
  },
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
