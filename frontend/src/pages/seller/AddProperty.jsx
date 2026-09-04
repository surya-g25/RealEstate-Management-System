import React, { useState } from 'react'
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import { HiUpload } from "react-icons/hi"
import API_URL from "../../config"
import axios from "axios"

const AddProperty = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        city: "",
        area: "",
        pincode: "",
        propertyType: "flat",
        bhk: "",
        bathrooms: "",
        areaSize: "",
        furnishing: "unfurnished",
        status: "sale",
        amenities: [],
        securityDeposit: "",
        maintenance: "",
    });

    const commonAmenities = [
        "Parking",
        "Pool",
        "Gym",
        "Security",
        "Wifi",
        "Power Backup",
        "Club House",
        "Garden",
    ];

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleAmenityChange = (amenity) => {
        setFormData((prev) => {
            const current = prev.amenities || [];
            if (current.includes(amenity)) {
                return { ...prev, amenities: current.filter((a) => a !== amenity) };
            } else {
                return { ...prev, amenities: [...current, amenity] };
            }
        });
    };

    // image handling
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length > 10) {
            setError("You can only upload upto 10 images.")
            return;
        }
        setImages((prev) => [...prev, ...files]);
        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...previews]);
    }

    // to remove an image
    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i != index));
        setImagePreviews((prev) => prev.filter((_, i) => i != index));
    }

    // to submit and create a new listing 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'amenities') {
                formData[key].forEach((a) => data.append("amenities", a));
            }
            else {
                data.append(key, formData[key]);
            }
        });
        images.forEach((img) => data.append("images", img));
        try {
            await axios.post(`${API_URL}/api/property`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            });
            navigate("/dashboard");
        }
        catch (err) {
            setError(err.response?.data?.message || "Failed to add property");
            setLoading(false);
        }
    }
    return (
        <div className="fade-in px-4 py-8 md:py-12 w-full mx-auto dashboard-content">
            <div className="max-w-[900px] w-full mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] mb-4 text-text-main font-extrabold">List Your Properties</h1>
                    <p className="text-text-muted text-base">
                        Fill in the details below to reach thousand of potential buyers.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="card-premium p-6 md:p-10">
                    {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-8">{error}</div>}
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-1 h-6 bg-primary rounded-sm"></div>
                            <h3 className="text-xl font-extrabold text-text-main">Content & Description</h3>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div>
                                <label className="block mb-2.5 text-sm font-bold text-text-main">Property Title</label>
                                <input type='text' name='title' value={formData.title}
                                    onChange={handleInputChange} className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors" placeholder='e.g. Luxury 3BHK apartment in Downtown' required
                                />
                            </div>
                            <div>
                                <label className="block mb-2.5 text-sm font-bold text-text-main">Detailed Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder='Describe the property highlights...' className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors h-[120px] resize-none leading-relaxed" required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 mb-12">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-1 h-6 bg-primary rounded-sm"></div>
                                <h3 className="text-xl font-extrabold text-text-main">Property Details</h3>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div>
                                    <label className="block mb-2 text-sm font-bold text-text-main">Property Type</label>
                                    <select name='propertyType' value={formData.propertyType}
                                        onChange={handleInputChange} className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors cursor-pointer"
                                    >
                                        <option value="flat">Flat/Apartment</option>
                                        <option value="villa">Independent House/Villa</option>
                                        <option value="penthouse">Penthouse</option>
                                        <option value="commercial">Commercial</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block mb-2 text-sm font-bold text-text-main">BHK</label>
                                        <input type='number' name='bhk' value={formData.bhk}
                                            onChange={handleInputChange} placeholder='e.g. 3' className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-bold text-text-main">Bathrooms</label>
                                        <input type='number' name='bathrooms' value={formData.bathrooms || ""} onChange={handleInputChange} placeholder='e.g. 2' className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-bold text-text-main">Area (sq.ft)</label>
                                        <input type='number' name='areaSize' value={formData.areaSize}
                                            onChange={handleInputChange} placeholder='e.g. 1500' className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors" required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-2 text-sm font-bold text-text-main">Furnishing</label>
                                        <select name='furnishing' value={formData.furnishing}
                                            onChange={handleInputChange} className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors cursor-pointer"
                                        >
                                            <option value="unfurnished">Unfurnished</option>
                                            <option value="semi-furnished">Semi-Furnished</option>
                                            <option value="furnished">Fully Furnished</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-bold text-text-main">Listing Status</label>
                                        <select name='status' value={formData.status} onChange={handleInputChange} className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors cursor-pointer"
                                        >
                                            <option value="sale">For Sale</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-1 h-6 bg-primary rounded-sm"></div>
                                <h3 className="text-xl font-extrabold text-text-main">Pricing & Location</h3>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div>
                                    <label className="block mb-2 text-sm font-bold text-text-main">Price (in Rs.)</label>
                                    <input type='number' name='price' value={formData.price} onChange={handleInputChange} placeholder='e.g. 5000000' className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors" required />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-2 text-sm font-bold text-text-main">City</label>
                                        <input type='text' name='city' value={formData.city} onChange={handleInputChange} placeholder='e.g. Orai' className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors" required />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-bold text-text-main">Pincode</label>
                                        <input type='text' name='pincode' value={formData.pincode} onChange={handleInputChange} placeholder='e.g. 285001' className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-bold text-text-main">Specific Area</label>
                                    <input type='text' name='area' value={formData.area} onChange={handleInputChange} placeholder='e.g. Tulsi nagar' className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors" required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-1 h-6 bg-primary rounded-sm"></div>
                            <h3 className="text-xl font-extrabold text-text-main">Amenities</h3>
                        </div>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
                            {commonAmenities.map((amenity) => (
                                <label key={amenity} className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl border transition-all duration-200 ${formData.amenities.includes(amenity) ? "bg-primary-light border-primary" : "bg-[#f8fafc] border-[#e2e8f0]"}`}
                                >
                                    <input type='checkbox' checked={formData.amenities.includes(amenity)}
                                        onChange={() => handleAmenityChange(amenity)}
                                        className="accent-primary w-4 h-4" />

                                    <span className={`text-sm font-semibold ${formData.amenities.includes(amenity) ? "text-primary" : "text-text-main"}`}
                                    >
                                        {amenity}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-1 h-6 bg-primary rounded-sm"></div>
                            <h3 className="text-xl font-extrabold text-text-main">Property Images</h3>
                        </div>
                        <div className="border-2 border-dashed border-[#cbd5e1] p-12 rounded-xl text-center cursor-pointer relative bg-[#f8fafc] transition-colors hover:border-primary">
                            <input type='file' multiple onChange={handleImageChange}
                                className='absolute inset-0 opacity-0 cursor-pointer' accept='image/*'
                            />
                            <div className="flex justify-center mb-4">
                                <HiUpload size={40} color='#64748b' />
                            </div>
                            <h4 className="mb-2 text-text-main font-bold">Click to upload OR drag and drop</h4>
                            <p className="text-sm text-text-muted">
                                Upload upto 10 high quality images (PNG, JPG)
                            </p>
                        </div>
                        {imagePreviews.length > 0 && (
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4 mt-8">
                                {imagePreviews.map((src, i) => (
                                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-[#f1f5f9] shadow-sm">
                                        <img src={src} alt='preview' className='w-full h-full object-cover' />
                                        <button type='button' onClick={() => removeImage(i)}
                                            className="absolute top-1 right-1 bg-[#dc2626] text-white border-none rounded-full w-5 h-5 flex items-center justify-center cursor-pointer z-10 shadow-md" style={{ transform: "rotate(45deg)" }}>
                                            <HiUpload size={12} />
                                        </button>
                                    </div>
                                ))}
                                {images.length < 10 && (
                                    <div className="aspect-square border-2 border-dashed border-[#cbd5e1] rounded-xl flex flex-col items-center justify-center cursor-pointer relative bg-[#f8fafc] transition-colors hover:border-primary">
                                        <input type='file' multiple onChange={handleImageChange}
                                            className='absolute inset-0 opacity-0 cursor-pointer' accept='image/*'
                                        />
                                        <HiUpload size={20} color='#64748b' />
                                        <span className="text-xs font-bold text-[#64748b] mt-1.5">Add More</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="mt-12 flex justify-center flex-wrap gap-5 border-t border-[#f1f5f9] pt-10">
                        <button type='button' onClick={() => navigate("/dashboard")} className="btn btn-outline py-3.5 px-10 font-bold min-w-[140px]">
                            Cancel
                        </button>
                        <button type='submit' className="btn btn-primary py-3.5 px-12 font-bold min-w-[180px]" disabled={loading}>
                            {loading ? "Publishing..." : "Publish listing"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProperty