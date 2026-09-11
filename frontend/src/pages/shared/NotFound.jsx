import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50/40 px-4 py-16">
            <div className="max-w-lg w-full text-center">
                <div className="relative mb-6 select-none">
                    <span className="text-8xl sm:text-9xl font-black tracking-tight text-teal-600/15">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl sm:text-4xl font-extrabold text-slate-800">
                            Page Not Found
                        </span>
                    </div>
                </div>

                <p className="text-slate-600 text-base sm:text-lg mb-8 max-w-md mx-auto leading-relaxed">
                    The page you are looking for might have been moved, renamed, or temporarily unavailable.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-teal-600/20 hover:bg-teal-700 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <FaHome /> Return Home
                    </Link>
                    <Link
                        to="/properties"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-700 font-semibold px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <FaSearch /> Explore Properties
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
