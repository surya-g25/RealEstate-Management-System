import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Navbar from '../../components/common/Navbar';
import { HiCheck, HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone, HiOutlineUser, HiX } from 'react-icons/hi';
import axios from 'axios';
import API_URL from '../../config';

const Profile = () => {
  const { user, setUser, token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [removeProfilePic, setRemoveProfilePic] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      //only 10 digits
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: numericValue });
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setRemoveProfilePic(false);
    }
  }

  // to update your profile
  const handleUpdate = async (e) => {
    e.preventDefault(); // prevent the page from refreshing
    setLoading(true);
    setError(null);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("address", formData.address);
      if (imageFile) {
        data.append("profilePic", imageFile);
      }
      if (removeProfilePic) {
        data.append("removeProfilePic", true);
      }
      const res = await axios.put(`${API_URL}/api/user/profile`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      });
      if (res.data.success) {
        const updatedUser = res.data.user;
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsEditing(false);
        setImageFile(null);
        setImagePreview(null);
      }
    }
    catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className={user?.role !== 'seller' ? 'bg-bg-alt min-h-screen pt-32 max-lg:pt-28' : 'bg-transparent min-h-auto'}>
      {user?.role !== "seller" && <Navbar />}
      <div className={`container fade-in max-w-[800px] mb-16 ${user?.role !== 'seller' ? 'mx-auto pt-12' : 'mx-0 pt-0'}`}>
        <header className="mb-12 md:text-center md:mb-8">
          <h1 className="text-[2.5rem] mb-2 md:text-[2rem]">Personal Profile</h1>
          <p className="text-text-muted">
            Manage your personal information and account settings.
          </p>
        </header>
        <div name="one" className="card-premium p-12 md:p-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-10 md:mb-16 text-center md:text-left">
            <div className="relative">
              <div className="w-[120px] h-[120px] rounded-[2.5rem] bg-primary-light overflow-hidden flex items-center justify-center text-[3rem] font-bold text-primary border-4 border-white shadow-lg">
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                ) : !removeProfilePic && user?.profilePic ? (
                  <img src={user.profilePic} alt="pic" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-primary opacity-60">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </span>
                )}
              </div>
              {isEditing && (
                <>
                  {/* image upload button  */}
                  <label className="absolute -bottom-2.5 -right-2.5 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.2)] border-4 border-white z-10 hover:bg-primary-dark transition-colors">
                    <input type="file" onChange={handleImageChange} className='hidden'
                      accept='image/*' />
                    <HiOutlineUser size={20} />
                  </label>
                  {/* if there is a new image preview, or there is an existing profile picture that hasn't already been marked for removal */}
                  {(imagePreview || (!removeProfilePic && user?.profilePic)) && (
                    <button type="button" onClick={() => {
                      setImagePreview(null)
                      setImageFile(null)
                      setRemoveProfilePic(true)
                    }} className="absolute -top-2.5 -right-2.5 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.2)] border-4 border-white z-10 hover:bg-red-600 transition-colors" title='Remove Profile Picture'>
                      <HiX size={20} />
                    </button>
                  )}
                </>
              )}
            </div>
            <div>
              <h2 className="text-[1.75rem] mb-1 break-all sm:break-normal">{user?.name}</h2>
              <span className="badge badge-sale bg-primary-light text-primary px-4 py-2 rounded-xl">{user?.role?.toUpperCase()}</span>
            </div>
          </div>
          {error && (<div className="p-4 bg-red-100 text-red-600 rounded-xl mb-8">{error}</div>)}
          {isEditing ? (
            <form onSubmit={handleUpdate} className="flex flex-col gap-8">
              <div>
                <label className="block mb-2 text-sm font-semibold">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3.5 rounded-xl border border-border outline-none focus:border-primary transition-colors" required />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">Phone Number</label>
                <input type='tel' name="phone" value={formData.phone} onChange={handleInputChange} maxLength="10" pattern='\d*' className="w-full p-3.5 rounded-xl border border-border outline-none focus:border-primary transition-colors" placeholder='Enter your 10 digit phone number' />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">Address</label>
                <textarea name="address" value={formData.address} className="w-full h-[100px] p-3.5 rounded-xl border border-border outline-none resize-none focus:border-primary transition-colors" placeholder="Enter your full address" onChange={handleInputChange} />
              </div>
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <button type="submit" disabled={loading} className="btn btn-primary flex-1 flex items-center justify-center gap-2">
                  <HiCheck size={20} />{loading ? "Saving..." : "Save changes"}
                </button>
                <button type="button" onClick={() => {
                  setIsEditing(false);
                  setImageFile(null);
                  setImagePreview(null);
                  setRemoveProfilePic(false);
                }} className="btn btn-outline flex-1 flex items-center justify-center gap-2">
                  <HiX size={20} /> Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-10">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-[#f8fafc] flex items-center justify-center text-primary shrink-0">
                  <HiOutlineMail size={24} />
                </div>
                <div>
                  <div className="text-sm text-text-muted mb-0.5">Email Address</div>
                  <div className="font-semibold break-all sm:break-normal">{user?.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-[#f8fafc] flex items-center justify-center text-primary shrink-0">
                  <HiOutlinePhone size={24} />
                </div>
                <div>
                  <div className="text-sm text-text-muted mb-0.5">Phone Number</div>
                  <div className="font-semibold break-all sm:break-normal">{user?.phone || "Not provided"}</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-[#f8fafc] flex items-center justify-center text-primary shrink-0">
                  <HiOutlineLocationMarker size={24} />
                </div>
                <div>
                  <div className="text-sm text-text-muted mb-0.5">Location / Address</div>
                  <div className="font-semibold break-all sm:break-normal">{user?.address || "Not provided"}</div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <button onClick={() => setIsEditing(true)} className="btn btn-primary px-10 py-3.5">
                  Edit Profile Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile