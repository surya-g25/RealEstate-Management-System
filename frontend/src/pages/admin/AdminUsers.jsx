import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import API_URL from '../../config'
import { HiOutlineFilter, HiOutlineIdentification, HiOutlineLockClosed, HiOutlineLockOpen, HiOutlineMail, HiOutlineTrash } from 'react-icons/hi';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [roleFilter, setRoleFilter] = useState("all");
    const [openFilter, setOpenFilter] = useState(false);
    const { token } = useAuth();
    const filterRef = useRef(null);

    // to fetch the users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/admin/users`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data.success) {
                    setUsers(res.data.users);
                }
                setLoading(false);
            }
            catch (err) {
                console.error("Failed to load users:", err);
                setLoading(false);
            }
        };
        fetchUsers();
    }, [token]);

    // to handle the click outside the box 
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (filterRef.current && !filterRef.current.contains(e.target)) {
                setOpenFilter(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // to filter user base on their role ,i.e, buyer or seller or admin
    const filteredUsers = useMemo(() => {
        if (roleFilter === "all") return users;
        return users.filter((user) => user.role === roleFilter);
    }, [users, roleFilter]);

    // to block a prticular user
    const handleBlock = async (id) => {
        try {
            const res = await axios.patch(`${API_URL}/api/admin/users/${id}/block`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                setUsers(
                    users.map((u) => 
                        u._id === id ? { ...u, isBlocked: res.data.isBlocked } : u
                    )
                );
            }
        }
        catch (err) {
            alert(err.response?.data?.message || "Operation Failed");
        }
    }

    // to delete a particular user
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure , you want to delete this user? This action cannot be undone.")) {
            return;
        }
        try {
            await axios.delete(`${API_URL}/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter((u) => u._id !== id));

        }
        catch (err) {
            alert(err.response?.data?.message || "Failed to delete user");
        }
    }

    if (loading) {
        return (
            <div className='loader-full-page'>
                <div className='loader'></div>
            </div>
        );
    }

    return (
        <>
            <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
                <div>
                    <h1 className="text-[1.75rem] font-extrabold text-text-main mb-1">User Management</h1>
                    <p className="text-text-muted text-[0.875rem]">
                        Monitor platform users and access levels.
                    </p>
                </div>
                <div className="relative" ref={filterRef}>
                    <button onClick={() => setOpenFilter(!openFilter)} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#e2e8f0] bg-white text-text-main shadow-sm hover:bg-[#f8fafc] transition-all duration-200 cursor-pointer">
                        <HiOutlineFilter size={18} /> Filter
                    </button>
                    {openFilter && (
                        <div className="absolute right-0 max-sm:left-0 max-sm:right-auto mt-2 w-44 rounded-xl border border-[#e2e8f0] bg-white shadow-lg z-20 overflow-hidden">
                            <button onClick={() => {
                                setRoleFilter("all");
                                setOpenFilter(false);
                            }}
                                className={`w-full text-left px-4 py-2.5 hover:bg-[#f8fafc] ${roleFilter === "all" ? "font-semibold text-primary" : "text-text-main"}`}
                            >
                                All Users
                            </button>

                            <button onClick={() => {
                                setRoleFilter("buyer");
                                setOpenFilter(false);
                            }}
                                className={`w-full text-left px-4 py-2.5 hover:bg-[#f8fafc] ${roleFilter === "buyer" ? "font-semibold text-primary" : "text-text-main"}`}
                            >
                                Buyer
                            </button>

                            <button onClick={() => {
                                setRoleFilter("seller");
                                setOpenFilter(false);
                            }}
                                className={`w-full text-left px-4 py-2.5 hover:bg-[#f8fafc] ${roleFilter === "seller" ? "font-semibold text-primary" : "text-text-main"}`}
                            >
                                Seller
                            </button>

                            <button onClick={() => {
                                setRoleFilter("admin");
                                setOpenFilter(false);
                            }}
                                className={`w-full text-left px-4 py-2.5 hover:bg-[#f8fafc] ${roleFilter === "admin" ? "font-semibold text-primary" : "text-text-main"}`}
                            >
                                Admin
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="card-premium overflow-hidden mb-8 p-0">
                <div className="pt-6 px-6 pb-2">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-[1.25rem] font-extrabold text-text-main">Platform Users</h2>
                        <div className="text-sm font-semibold text-text-muted">
                            Showing {" "}
                            <span className="text-text-main">{filteredUsers.length}</span>{" "} users
                        </div>
                    </div>
                </div>
                <div className="w-full border-collapse min-w-[800px]">
                    <thead className="bg-[#f8fafc] text-[#64748b] text-[0.7rem] font-bold uppercase tracking-[0.05em]">
                        <tr className="border-b border-[#f1f5f9]">
                            <th className="py-4 px-6 text-left">User Info</th>
                            <th className="py-4 px-6 text-center">Role</th>
                            <th className="py-4 px-6 text-left">Contact Details</th>
                            <th className="py-4 px-6 text-center">Account Status</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ?
                            filteredUsers.map((user) => (
                                <tr key={user._id} className="border-b border-[#f1f5f9]">
                                    <td className="py-6 px-8">
                                        <div className='flex items-center gap-4'>
                                            <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-bold text-[0.9375rem]">{user.name}</div>
                                                <div className="text-[0.75rem] text-text-muted">
                                                    ID:{user._id.slice(-8).toUpperCase()}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6 px-6 text-center">
                                        <span className={`px-3 py-1.5 rounded-full text-[0.75rem] font-bold uppercase ${user.role === "admin" ? "bg-[#fef3c7] text-[#92400e]" :
                                            user.role === "seller" ? "bg-[#dcfce7] text-[#166534]" :
                                                "bg-[#dbeafe] text-[#1e40af]"
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-6 px-6">
                                        <div className="flex flex-col gap-1">
                                            <div className="text-[0.875rem] flex items-center gap-2 text-text-main">
                                                <HiOutlineMail color='#94a2b8' />{user.email}
                                            </div>
                                            {user.phone && (
                                                <div className="text-[0.875rem] flex items-center gap-2 text-text-main">
                                                    <HiOutlineIdentification color='#94a3b8' />{" "}
                                                    {user.phone}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-6 px-6 text-center">
                                        {user.isBlocked ? (
                                            <span className="text-[#dc2626] text-[0.8125rem] font-bold inline-flex items-center gap-1.5 justify-center bg-[#fff5f5] py-1 px-2 rounded-lg border border-[#fee2e2]">
                                                <HiOutlineLockClosed size={14} /> Suspended
                                            </span>
                                        ) : (
                                            <span className="text-[#10b981] text-[0.8125rem] font-bold inline-flex items-center gap-1.5 justify-center bg-[#f0fdf4] py-1 px-2 rounded-lg border border-[#dcfce7]">
                                                <HiOutlineLockOpen size={14} /> Active
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-6 px-6 text-right">
                                        <div className="flex gap-2 justify-end">
                                            <button onClick={() => handleBlock(user._id)} className={`w-9 h-9 rounded-lg border border-[#e2e8f0] bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50 ${user.isBlocked ? "text-[#10b981]" : "text-[#f59e0b]"}`} title={user.isBlocked ? "Unblock user" : "Block user"}>

                                                {user.isBlocked ? (
                                                    <HiOutlineLockOpen size={18} />
                                                ) : (
                                                    <HiOutlineLockClosed size={18} />
                                                )}
                                            </button>
                                            <button onClick={() => handleDelete(user._id)} className="w-9 h-9 rounded-lg border-none bg-[#fef2f2] text-[#dc2626] flex items-center justify-center cursor-pointer hover:bg-red-100" title='Delete User'>
                                                <HiOutlineTrash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                            ) : (
                                <tr>
                                    <td className="py-16 text-center text-text-muted" colSpan="5">
                                        No user found for this filter
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </div>
            </div>
        </>
    )
}

export default AdminUsers