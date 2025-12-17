import React, { useState } from 'react';
import { searchCollegeInfo, SearchResult } from '../services/geminiService';

const SUGGESTIONS = [
    "Top 10 Engineering Colleges in India 2024",
    "Placement Statistics of IIT Bombay vs IIT Delhi",
    "Latest NEET 2025 Exam Date and Syllabus",
    "Harvard University Scholarship for Indian Students",
    "MBA Fee Structure of IIM Ahmedabad"
];

const AIResearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<SearchResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) return;
        
        setLoading(true);
        setError(null);
        setResult(null);
        setQuery(searchQuery);

        try {
            const data = await searchCollegeInfo(searchQuery);
            setResult(data);
        } catch (err: any) {
            setError(err.message || "Failed to fetch information. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-[80vh]">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">AI College Research</h1>
                <p className="text-slate-500">Get up-to-date, grounded information about colleges, exams, and fees using Google Search.</p>
            </div>

            {/* Search Input */}
            <div className="relative max-w-2xl mx-auto mb-8">
                <div className="relative">
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                        placeholder="Ask anything about colleges..." 
                        className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 shadow-lg focus:ring-2 focus:ring-indigo-500 outline-none text-lg"
                    />
                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <button 
                        onClick={() => handleSearch(query)}
                        disabled={loading || !query.trim()}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="space-y-6">
                
                {/* Suggestions (only when no result/loading) */}
                {!result && !loading && (
                    <div className="text-center">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-4">Trending Topics</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {SUGGESTIONS.map((s) => (
                                <button 
                                    key={s}
                                    onClick={() => handleSearch(s)}
                                    className="px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors text-sm"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 animate-pulse">
                        <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-slate-200 rounded w-full mb-4"></div>
                        <div className="h-4 bg-slate-200 rounded w-5/6 mb-4"></div>
                        <div className="mt-8 pt-6 border-t border-slate-100">
                             <div className="h-3 bg-slate-100 rounded w-1/4 mb-2"></div>
                             <div className="h-3 bg-slate-100 rounded w-1/3"></div>
                        </div>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-red-600 text-center">
                        {error}
                    </div>
                )}

                {/* Results */}
                {result && (
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-indigo-50 animate-fade-in">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                ✨
                            </div>
                            <span className="font-bold text-slate-800">AI Response</span>
                        </div>
                        
                        <div className="prose prose-slate max-w-none mb-8 text-slate-700 leading-relaxed whitespace-pre-line">
                            {result.text}
                        </div>

                        {result.sources.length > 0 && (
                            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                    Sources & References
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {result.sources.map((source, idx) => (
                                        <a 
                                            key={idx} 
                                            href={source.uri} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all group"
                                        >
                                            <div className="w-8 h-8 rounded bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs text-slate-500 font-bold uppercase">
                                                {new URL(source.uri).hostname.charAt(0)}
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <p className="text-sm font-medium text-slate-700 truncate group-hover:text-indigo-600">{source.title}</p>
                                                <p className="text-xs text-slate-400 truncate">{new URL(source.uri).hostname}</p>
                                            </div>
                                            <svg className="w-4 h-4 text-slate-300 group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                         {result.sources.length === 0 && (
                             <p className="text-xs text-slate-400 italic mt-4 text-right">No direct web sources returned.</p>
                         )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIResearch;