import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Skill {
    id: string;
    title: string;
    icon: string;
    color: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const SKILLS_LIST: Skill[] = [
    { id: 'ds', title: 'Data Science', icon: '📊', color: 'bg-emerald-500', description: 'Analyze large datasets and uncover insights.', difficulty: 'Intermediate' },
    { id: 'ml', title: 'Machine Learning', icon: '🤖', color: 'bg-blue-500', description: 'Build predictive models and algorithms.', difficulty: 'Advanced' },
    { id: 'ai', title: 'Generative AI', icon: '✨', color: 'bg-violet-500', description: 'Master LLMs and prompt engineering.', difficulty: 'Intermediate' },
    { id: 'wd', title: 'Full-Stack Web', icon: '💻', color: 'bg-orange-500', description: 'Build modern web applications.', difficulty: 'Beginner' },
    { id: 'cs', title: 'Cyber Security', icon: '🔐', color: 'bg-red-500', description: 'Protect systems from digital attacks.', difficulty: 'Intermediate' },
    { id: 'dm', title: 'Digital Marketing', icon: '📈', color: 'bg-pink-500', description: 'Master SEO, SEM, and social growth.', difficulty: 'Beginner' },
];

const SkillsSection: React.FC = () => {
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [roadmap, setRoadmap] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const generateRoadmap = async (skill: Skill) => {
        setLoading(true);
        setSelectedSkill(skill);
        setRoadmap('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `Generate a structured learning roadmap for a student interested in ${skill.title}. 
                Include: 
                1. Core concepts to learn.
                2. Recommended projects.
                3. Career outlook.
                4. estimated time to reach ${skill.difficulty} level.
                Keep it in a professional Markdown format with clear headings.`,
            });
            setRoadmap(response.text || "Could not generate roadmap.");
        } catch (err) {
            console.error(err);
            setRoadmap("Error generating roadmap. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Master New Skills</h1>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                    Don't just choose a college, choose a career. Explore top-trending skills and get AI-powered roadmaps to master them.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SKILLS_LIST.map((skill) => (
                    <div 
                        key={skill.id}
                        className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
                        onClick={() => generateRoadmap(skill)}
                    >
                        <div className={`w-14 h-14 ${skill.color} rounded-2xl flex items-center justify-center text-3xl mb-4 text-white shadow-lg`}>
                            {skill.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{skill.title}</h3>
                        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{skill.description}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{skill.difficulty}</span>
                            <span className="text-indigo-600 font-bold group-hover:translate-x-1 transition-transform">Get Roadmap &rarr;</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal/Overlay for Roadmap */}
            {selectedSkill && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 ${selectedSkill.color} rounded-xl flex items-center justify-center text-2xl text-white`}>
                                    {selectedSkill.icon}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">{selectedSkill.title} Roadmap</h2>
                                    <p className="text-xs text-slate-500 font-bold uppercase">{selectedSkill.difficulty} Level Guide</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedSkill(null)}
                                className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-all"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex-grow overflow-y-auto p-8 prose prose-slate max-w-none">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="font-medium text-slate-500 animate-pulse text-lg">Gemini AI is building your custom career path...</p>
                                </div>
                            ) : (
                                <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-sans">
                                    {roadmap}
                                </div>
                            )}
                        </div>
                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-center">
                            <button 
                                onClick={() => window.print()} 
                                className="px-6 py-2.5 bg-slate-800 text-white rounded-full font-bold hover:bg-slate-700 transition-all flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                                Save PDF Roadmap
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillsSection;