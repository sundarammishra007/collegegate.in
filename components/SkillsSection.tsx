import React, { useState } from 'react';

const SkillsSection: React.FC = () => {
    const [viewCourse, setViewCourse] = useState<{url: string, title: string} | null>(null);

    const handleCourseClick = (e: React.MouseEvent, url: string, title: string) => {
        e.preventDefault();
        setViewCourse({ url, title });
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 pb-24">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Master New Skills</h1>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                    Don't just choose a college, choose a career. Explore top-trending skills and languages to master them.
                </p>
            </div>

            {/* Language Courses Section */}
            <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-extrabold text-slate-900">Language Courses</h2>
                    <a 
                        href="https://alison.com/tag/languages?utm_source=alison_user&utm_medium=affiliates&utm_campaign=32099324" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 font-bold hover:text-indigo-800 flex items-center gap-2"
                    >
                        View All Languages <span className="text-xl">&rarr;</span>
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            title: 'English Language Skills',
                            description: 'Improve your spoken and written English for better career opportunities.',
                            image: 'https://cdn01.alison-static.net/courses/186/alison_courseware_intro_186.jpg',
                            link: 'https://alison.com/tag/english?utm_source=alison_user&utm_medium=affiliates&utm_campaign=32099324',
                            flag: '🇬🇧'
                        },
                        {
                            title: 'Spanish for Beginners',
                            description: 'Learn the basics of Spanish, one of the most spoken languages in the world.',
                            image: 'https://cdn01.alison-static.net/courses/262/alison_courseware_intro_262.jpg',
                            link: 'https://alison.com/tag/spanish?utm_source=alison_user&utm_medium=affiliates&utm_campaign=32099324',
                            flag: '🇪🇸'
                        },
                        {
                            title: 'French Language Studies',
                            description: 'Master the language of love and diplomacy with comprehensive lessons.',
                            image: 'https://cdn01.alison-static.net/courses/266/alison_courseware_intro_266.jpg',
                            link: 'https://alison.com/tag/french?utm_source=alison_user&utm_medium=affiliates&utm_campaign=32099324',
                            flag: '🇫🇷'
                        },
                        {
                            title: 'German Language Basics',
                            description: 'Start your journey into the German language for business and travel.',
                            image: 'https://cdn01.alison-static.net/courses/260/alison_courseware_intro_260.jpg',
                            link: 'https://alison.com/tag/german?utm_source=alison_user&utm_medium=affiliates&utm_campaign=32099324',
                            flag: '🇩🇪'
                        }
                    ].map((course, idx) => (
                        <a 
                            key={idx} 
                            href={course.link}
                            onClick={(e) => handleCourseClick(e, course.link, course.title)}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group block border border-slate-100 cursor-pointer"
                        >
                            <div className="h-40 overflow-hidden relative">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-2xl shadow-sm">
                                    {course.flag}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">{course.title}</h3>
                                <p className="text-slate-500 text-xs mb-4 line-clamp-2">{course.description}</p>
                                <div className="flex items-center text-indigo-600 font-bold text-xs uppercase tracking-wider">
                                    Start Learning <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Coding & Development Section */}
            <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-extrabold text-slate-900">Coding & Development</h2>
                    <a 
                        href="https://alison.com/tag/software-development?utm_source=alison_user&utm_medium=affiliates&utm_campaign=32099324" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 font-bold hover:text-indigo-800 flex items-center gap-2"
                    >
                        View All Coding Courses <span className="text-xl">&rarr;</span>
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            title: 'Python Programming',
                            description: 'Learn Python from scratch, the most popular language for Data Science and AI.',
                            image: 'https://cdn01.alison-static.net/courses/588/alison_courseware_intro_588.jpg',
                            link: 'https://alison.com/tag/python?utm_source=alison_user&utm_medium=affiliates&utm_campaign=32099324',
                            icon: '🐍'
                        },
                        {
                            title: 'Java Essentials',
                            description: 'Master Object-Oriented Programming with Java for enterprise applications.',
                            image: 'https://cdn01.alison-static.net/courses/30/alison_courseware_intro_30.jpg',
                            link: 'https://alison.com/tag/java?utm_source=alison_user&utm_medium=affiliates&utm_campaign=32099324',
                            icon: '☕'
                        },
                        {
                            title: 'Web Development',
                            description: 'Build responsive websites using HTML, CSS, and JavaScript.',
                            image: 'https://cdn01.alison-static.net/courses/203/alison_courseware_intro_203.jpg',
                            link: 'https://alison.com/tag/web-development?utm_source=alison_user&utm_medium=affiliates&utm_campaign=32099324',
                            icon: '🌐'
                        },
                        {
                            title: 'C# Programming',
                            description: 'Develop Windows applications and games using C# and .NET.',
                            image: 'https://cdn01.alison-static.net/courses/1583/alison_courseware_intro_1583.jpg',
                            link: 'https://alison.com/tag/c-sharp?utm_source=alison_user&utm_medium=affiliates&utm_campaign=32099324',
                            icon: '#️⃣'
                        }
                    ].map((course, idx) => (
                        <a 
                            key={idx} 
                            href={course.link}
                            onClick={(e) => handleCourseClick(e, course.link, course.title)}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group block border border-slate-100 cursor-pointer"
                        >
                            <div className="h-40 overflow-hidden relative">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-2xl shadow-sm">
                                    {course.icon}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">{course.title}</h3>
                                <p className="text-slate-500 text-xs mb-4 line-clamp-2">{course.description}</p>
                                <div className="flex items-center text-indigo-600 font-bold text-xs uppercase tracking-wider">
                                    Start Learning <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Artificial Intelligence (AI) Section */}
            <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-extrabold text-slate-900">Artificial Intelligence (AI)</h2>
                    <a 
                        href="https://alison.com/tag/artificial-intelligence?utm_source=alison_user&utm_medium=affiliates&utm_campaign=32099324" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 font-bold hover:text-indigo-800 flex items-center gap-2"
                    >
                        View All AI Courses <span className="text-xl">&rarr;</span>
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            title: 'Diploma in AI',
                            description: 'Understand the fundamentals of Artificial Intelligence and its applications.',
                            image: 'https://cdn01.alison-static.net/courses/1227/alison_courseware_intro_1227.jpg',
                            link: 'https://alison.com/course/diploma-in-artificial-intelligence?utm_source=alison_user&utm_medium=affiliates&utm_campaign=32099324',
                            icon: '🤖'
                        },
                        {
                            title: 'Machine Learning',
                            description: 'Dive into algorithms that allow computers to learn from data.',
                            image: 'https://cdn01.alison-static.net/courses/1228/alison_courseware_intro_1228.jpg',
                            link: 'https://alison.com/tag/machine-learning?utm_source=alison_user&utm_medium=affiliates&utm_campaign=32099324',
                            icon: '🧠'
                        },
                        {
                            title: 'Generative AI & LLMs',
                            description: 'Explore the world of ChatGPT, Large Language Models, and creative AI.',
                            image: 'https://cdn01.alison-static.net/courses/4399/alison_courseware_intro_4399.jpg',
                            link: 'https://alison.com/tag/generative-ai?utm_source=alison_user&utm_medium=affiliates&utm_campaign=32099324',
                            icon: '✨'
                        },
                        {
                            title: 'Neural Networks',
                            description: 'Learn how deep learning models mimic the human brain.',
                            image: 'https://cdn01.alison-static.net/courses/1229/alison_courseware_intro_1229.jpg',
                            link: 'https://alison.com/tag/neural-networks?utm_source=alison_user&utm_medium=affiliates&utm_campaign=32099324',
                            icon: '🕸️'
                        }
                    ].map((course, idx) => (
                        <a 
                            key={idx} 
                            href={course.link}
                            onClick={(e) => handleCourseClick(e, course.link, course.title)}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group block border border-slate-100 cursor-pointer"
                        >
                            <div className="h-40 overflow-hidden relative">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-2xl shadow-sm">
                                    {course.icon}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">{course.title}</h3>
                                <p className="text-slate-500 text-xs mb-4 line-clamp-2">{course.description}</p>
                                <div className="flex items-center text-indigo-600 font-bold text-xs uppercase tracking-wider">
                                    Start Learning <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-extrabold text-slate-900">Top Free Courses on Alison</h2>
                    <a 
                        href="https://alison.com/?utm_source=alison_user&utm_medium=affiliates&utm_campaign=32099324" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 font-bold hover:text-indigo-800 flex items-center gap-2"
                    >
                        View All Courses <span className="text-xl">&rarr;</span>
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            title: 'Diploma in Information Technology Management',
                            image: 'https://cdn01.alison-static.net/courses/199/alison_courseware_intro_199.jpg',
                            link: 'https://alison.com/course/diploma-in-information-technology-management?utm_source=alison_user&utm_medium=affiliates&utm_campaign=32099324',
                            category: 'IT'
                        },
                        {
                            title: 'Diploma in Business Management & Entrepreneurship',
                            image: 'https://cdn01.alison-static.net/courses/123/alison_courseware_intro_123.jpg',
                            link: 'https://alison.com/course/diploma-in-business-management-and-entrepreneurship?utm_source=alison_user&utm_medium=affiliates&utm_campaign=32099324',
                            category: 'Business'
                        },
                        {
                            title: 'Diploma in Caregiving',
                            image: 'https://cdn01.alison-static.net/courses/1429/alison_courseware_intro_1429.jpg',
                            link: 'https://alison.com/course/diploma-in-caregiving?utm_source=alison_user&utm_medium=affiliates&utm_campaign=32099324',
                            category: 'Health'
                        }
                    ].map((course, idx) => (
                        <a 
                            key={idx} 
                            href={course.link}
                            onClick={(e) => handleCourseClick(e, course.link, course.title)}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group block border border-slate-100 cursor-pointer"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-slate-800">
                                    {course.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">{course.title}</h3>
                                <p className="text-slate-500 text-sm mb-4">Master this skill for free with Alison's top-rated certification program.</p>
                                <div className="flex items-center text-indigo-600 font-bold text-sm">
                                    Start Learning Free <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
                <h2 className="text-3xl font-bold mb-4">Need Personalized Career Guidance?</h2>
                <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                    Our expert counselors can help you choose the right path, whether it's a degree or a skill-based career.
                </p>
                <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Contact CollegeGate Counselors
                </button>
            </div>

            {/* Course View Modal */}
            {viewCourse && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-scale-in">
                        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-lg text-slate-800 truncate pr-4">{viewCourse.title}</h3>
                            <div className="flex items-center gap-2">
                                <a 
                                    href={viewCourse.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                                >
                                    Open in New Tab <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                                <button 
                                    onClick={() => setViewCourse(null)}
                                    className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex-grow bg-slate-100 relative">
                            <iframe 
                                src={viewCourse.url} 
                                className="w-full h-full border-0" 
                                title={viewCourse.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                            <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center text-slate-400">
                                <p className="mb-2">Loading course content...</p>
                                <p className="text-sm max-w-md text-center">If the content doesn't load, it might be blocked by the provider. Please use the "Open in New Tab" button above.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillsSection;