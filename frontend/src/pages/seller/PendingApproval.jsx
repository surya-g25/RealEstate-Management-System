import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { HiOutlineClock, HiOutlineRefresh, HiOutlineSupport } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const PendingApproval = () => {
    const {logout,user,refreshUser}=useAuth();
    const [refreshing,setRefreshing]=useState(false);

    //auto refresh
    useEffect(()=>{
        const interval=setInterval(()=>{
            refreshUser();
        },10000);
        return ()=>clearInterval(interval);
    },[refreshUser]);

    // handle manual refresh
    const handleManualRefresh=async()=>{
        setRefreshing(true);
        await refreshUser();
        setTimeout(()=>setRefreshing(false),1000);
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 max-w-xl mx-auto">
        <div className="w-24 h-24 bg-[#fef3c7] text-[#d97706] rounded-full flex items-center justify-center mb-6 animate-pulse">
            <HiOutlineClock size={48}/>
        </div>
        <h1 className="text-2xl font-bold text-[#0f172a] mb-3">Approval Pending</h1>
        <p className="text-[#64748b] leading-relaxed mb-8">
            Hello {user?.name}, your seller account is currently under review by our administration team. Approval usually takes less than 24 hours. You'll get full dashboard access on verified.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <a href='/properties' className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors no-underline">
                Browse Properties
            </a>
            <button onClick={handleManualRefresh} disabled={refreshing}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm ${ refreshing ? "bg-slate-100 text-slate-400 cursor-not-allowed" : 
                "bg-primary text-white hover:bg-primary-dark cursor-pointer"}`} 
            >
                <HiOutlineRefresh size={20} className={refreshing?"animate-spin":""}/>
                {refreshing?"Checking...":"Check status now"}
            </button>
        </div>
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-[#64748b]">
            <HiOutlineSupport size={18}/>
            Need Help?{" "}
            <Link to='/contact' className="text-primary font-semibold hover:underline no-underline">
                Contact Support
            </Link>
        </div>
    </div>

  )
}

export default PendingApproval