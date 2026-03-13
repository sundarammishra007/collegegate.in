import React from 'react';

const OpportunitiesSection: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 pb-24">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Opportunities Directory</h1>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                    Provide actionable, high-value resources for students.
                </p>
            </div>

            <div className="space-y-16">
                {/* Apprenticeships */}
                <section>
                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Apprenticeships</h2>
                        <p className="text-slate-600 text-lg">Earn while you learn. Gain hands-on experience with industry leaders.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <a href="https://www.apprenticeshipindia.gov.in/" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col items-start">
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">NAPS</h3>
                            <p className="text-slate-500 text-sm mb-4">National Apprenticeship Promotion Scheme</p>
                            <span className="mt-auto text-indigo-600 font-bold text-sm flex items-center">Explore <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></span>
                        </a>
                        <a href="https://internship.aicte-india.org/" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col items-start">
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">AICTE Internships</h3>
                            <p className="text-slate-500 text-sm mb-4">All India Council for Technical Education</p>
                            <span className="mt-auto text-indigo-600 font-bold text-sm flex items-center">Explore <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></span>
                        </a>
                    </div>
                </section>

                {/* Internships */}
                <section>
                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Internships</h2>
                        <p className="text-slate-600 text-lg">Kickstart your career with premium internships.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <a href="https://internshala.com/" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col items-start">
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">Internshala</h3>
                            <p className="text-slate-500 text-sm mb-4">Find internships and jobs in India.</p>
                            <span className="mt-auto text-indigo-600 font-bold text-sm flex items-center">Explore <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></span>
                        </a>
                        <a href="https://www.linkedin.com/jobs/internship-jobs/" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col items-start">
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">LinkedIn Internships</h3>
                            <p className="text-slate-500 text-sm mb-4">Discover internship opportunities on LinkedIn.</p>
                            <span className="mt-auto text-indigo-600 font-bold text-sm flex items-center">Explore <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></span>
                        </a>
                        <a href="https://wellfound.com/role/intern" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col items-start">
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">Wellfound (AngelList)</h3>
                            <p className="text-slate-500 text-sm mb-4">Startup internships and jobs.</p>
                            <span className="mt-auto text-indigo-600 font-bold text-sm flex items-center">Explore <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></span>
                        </a>
                    </div>
                </section>

                {/* Hackathons & Tech Challenges */}
                <section>
                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Hackathons & Tech Challenges</h2>
                        <p className="text-slate-600 text-lg">Test your skills, build your portfolio, and get hired.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <a href="https://unstop.com/" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col items-start">
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">Unstop</h3>
                            <p className="text-slate-500 text-sm mb-4">Formerly Dare2Compete. Competitions and hackathons.</p>
                            <span className="mt-auto text-indigo-600 font-bold text-sm flex items-center">Explore <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></span>
                        </a>
                        <a href="https://devfolio.co/" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col items-start">
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">Devfolio</h3>
                            <p className="text-slate-500 text-sm mb-4">Discover and participate in the best hackathons.</p>
                            <span className="mt-auto text-indigo-600 font-bold text-sm flex items-center">Explore <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></span>
                        </a>
                        <a href="https://www.hackerearth.com/challenges/" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col items-start">
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">HackerEarth</h3>
                            <p className="text-slate-500 text-sm mb-4">Coding challenges and hackathons.</p>
                            <span className="mt-auto text-indigo-600 font-bold text-sm flex items-center">Explore <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></span>
                        </a>
                    </div>
                </section>

                {/* Job Fairs & Career Events */}
                <section>
                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Job Fairs & Career Events</h2>
                        <p className="text-slate-600 text-lg">Network with top recruiters and land your dream job.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <a href="https://www.ncs.gov.in/" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col items-start">
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">NCS</h3>
                            <p className="text-slate-500 text-sm mb-4">National Career Service</p>
                            <span className="mt-auto text-indigo-600 font-bold text-sm flex items-center">Explore <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></span>
                        </a>
                        <a href="https://learning.tcsionhub.in/" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col items-start">
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">TCS iON</h3>
                            <p className="text-slate-500 text-sm mb-4">Learning and career opportunities.</p>
                            <span className="mt-auto text-indigo-600 font-bold text-sm flex items-center">Explore <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></span>
                        </a>
                        <a href="https://infyspringboard.onwingspan.com/" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col items-start">
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">Infosys Springboard</h3>
                            <p className="text-slate-500 text-sm mb-4">Empowering students with digital skills.</p>
                            <span className="mt-auto text-indigo-600 font-bold text-sm flex items-center">Explore <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></span>
                        </a>
                    </div>
                </section>
                
                {/* Seminars/Webinars */}
                <section>
                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Seminars & Webinars</h2>
                        <p className="text-slate-600 text-lg">Learn from industry experts and thought leaders.</p>
                    </div>
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center">
                        <p className="text-slate-600 mb-4">Upcoming seminars and webinars will be listed here. Stay tuned!</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default OpportunitiesSection;
