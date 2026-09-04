import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react';
import axios from 'axios';
import API_URL from '../../config';
import Navbar from '../../components/common/Navbar';
import { HiOutlineAnnotation, HiOutlineCheckCircle, HiOutlineMail, HiOutlinePhone, HiOutlineUser } from 'react-icons/hi';

const Contact = () => {
    const {user}=useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        message: "",
        role: user?.role || "buyer",
    });
    const [loading,setLoading]=useState(false);
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState("");

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    // to submit the data to server side
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res=await axios.post(`${API_URL}/api/contact`,formData);
            if(res.data.success)
            {
                setSuccess(true);
                setFormData({...formData,message:""});
            }
        } 
        catch (err) {
            setError(err.response?.data?.message || "Failed to send message");
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-32 max-lg:pt-28">
        {user?.role !== 'seller' && <Navbar/>}

        <div className="container py-16 px-6 max-w-[1000px] mx-auto">
            <div className="text-center mb-14">
                <h1 className="text-[2.5rem] font-extrabold text-text-main mb-4">Get in touch</h1>
                <p className="text-text-muted text-[1.1rem] max-w-[600px] mx-auto">
                    Have questions or feedback? We'd love to hear from you. Our team is here to help you with anything you need
                </p>
            </div>
            <div className="grid grid-cols-[1fr_1.5fr] gap-12 items-start max-lg:grid-cols-1 max-lg:gap-8">
                <div className="flex flex-col gap-8">
                    <div className="card-premium p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                                <HiOutlineMail size={24}/>
                            </div>
                            <div>
                                <div className="font-bold text-base">Email Us</div>
                                <div className="text-text-muted text-[0.9rem]">support@realestate.com</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                                <HiOutlinePhone size={24}/>
                            </div>
                            <div>
                                <div className="font-bold text-base">Call Us</div>
                                <div className="text-text-muted text-[0.9rem]">+1 (234) 567-7890</div>
                            </div>
                        </div>
                    </div>
                    <div className="card-premium h-[200px] bg-primary text-white flex flex-col justify-center items-center p-8 text-center">
                        <h3 className="mb-2 font-bold text-xl">Quick Support</h3>
                        <p className="text-[0.9rem] opacity-90">
                            Available 24/7 for our premium users. Your satisfaction is our priority.
                        </p>
                    </div>
                </div>
                {/* contact form */}
                <div className="card-premium p-10">
                    {success? (
                        <div className="text-center py-8">
                            <HiOutlineCheckCircle size={64} className="text-primary mx-auto mb-6"/>
                            <h2 className="mb-4 text-2xl font-bold">Message Sent!</h2>
                            <p className="text-text-muted mb-8">
                                Thank you for reaching out. We've received your message and will get back to you shortly.
                            </p>
                            <button onClick={()=>setSuccess(false)} className="btn btn-primary py-3 px-8">
                                Send another message.
                            </button>
                        </div>
                    ):(
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                                <div className="">
                                    <label className="block mb-2 font-semibold text-[0.9rem] items-center">
                                        <HiOutlineUser size={16} className='mr-1'/> Name
                                    </label>
                                    <input type='text' name='name' required value={formData.name} 
                                    onChange={handleChange} placeholder='John Doe' className="w-full p-3 rounded-xl border border-[#e2e8f0] outline-none transition-colors focus:border-primary"/>
                                </div>
                                <div className="">
                                    <label className="block mb-2 font-semibold text-[0.9rem] items-center">
                                        <HiOutlineMail size={16} className='mr-1'/> Email
                                    </label>
                                    <input type='email' name='email' required value={formData.email} 
                                    onChange={handleChange} placeholder='john@example.com' className="w-full p-3 rounded-xl border border-[#e2e8f0] outline-none transition-colors focus:border-primary"/>
                                </div>
                            </div>
                            <div className="">
                                <label className="block mb-2 font-semibold text-[0.9rem] items-center">
                                    <HiOutlinePhone size={16} className='mr-1'/> Phone
                                </label>
                                <input type='tel' name='phone' required value={formData.phone} 
                                onChange={handleChange} placeholder='+1 234 567 890' className="w-full p-3 rounded-xl border border-[#e2e8f0] outline-none transition-colors focus:border-primary"/>
                            </div>
                            <div className="">
                                    <label className="block mb-2 font-semibold text-[0.9rem] items-center">
                                        <HiOutlineAnnotation size={16} className='mr-1'/> Message
                                    </label>
                                    <textarea name='message' required value={formData.message} 
                                    onChange={handleChange} placeholder='Tell us how we can help...' rows='5' className="w-full p-3 rounded-xl border border-[#e2e8f0] outline-none transition-colors focus:border-primary resize-none"/> 
                            </div>
                            {error && <div className="text-red-600 text-[0.875rem] p-3 bg-red-50 rounded-lg">{error}</div>}
                            <button type='submit' disabled={loading} className="btn btn-primary w-full p-4 rounded-xl font-bold text-base mt-4">
                                {loading ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Contact