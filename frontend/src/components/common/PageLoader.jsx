import React from 'react';

const PageLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-4">
            <div className="relative flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-teal-100 border-t-teal-600 animate-spin" />
                <div className="absolute w-6 h-6 rounded-full bg-teal-50 animate-pulse" />
            </div>
            <p className="text-sm font-medium text-slate-500 animate-pulse tracking-wide">
                Loading...
            </p>
        </div>
    );
};

export default PageLoader;
