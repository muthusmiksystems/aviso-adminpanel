import React, { useState } from "react";
import { FaUser, FaPhone, FaCity, FaMapMarkerAlt, FaFeather, FaBuilding, FaFlagCheckered, FaTransgender } from "react-icons/fa";
import { MdEmail, MdFlag, MdCalendarToday, MdWork } from "react-icons/md";
import { IoIosMale, IoIosFemale } from "react-icons/io";
import { BsUpload } from "react-icons/bs";
import { GrAnnounce } from "react-icons/gr";
import { FaHandFist } from "react-icons/fa6";
import { ImLeaf } from "react-icons/im";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../redux/features/authSlice";

const GuestDetails = ({ formData, setFormData, isFocused, setIsFocused, errors, setErrors }) => {
  const dispatch = useDispatch()
  const [isUploading, setIsUploading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: false }))
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate the input value
    // if (value.trim() === "") {
    //   setErrors((prev) => ({ ...prev, [name]: `${name.replace(/([A-Z])/g, ' $1')}: is required.` }));
    // } else {
    //   setErrors((prev) => ({ ...prev, [name]: null }));
    // }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true); // Start uploading
      await dispatch(uploadImage(file));
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setIsUploading(false); // Upload complete
    }
  };

  const handleFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };


  const handleBlur = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: formData[field] !== "" }));
  };
  return (

    <>
      <p className="text-gray-700 text-end font-semibold">Step 2</p>


      <h1 className="text-3xl font-bold text-gray-900 text-center mt-2">
        Please Fill in your details
      </h1>
      <p className="text-gray-500 text-center mb-8">
        Lorem ipsum dolor sit amet consectetur.
      </p>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <tbody>
            <tr>
              <td className="px-3 py-4">
                <div className="relative">
                  {(isFocused.firstName || formData.firstName) && (
                    <label className={`absolute -top-3 left-3 ${errors.firstName ? 'bg-[#B82D97]' : 'bg-[#29ABE2]'} text-white text-xs px-2 py-1 rounded-lg transition-all`}>
                      First Name
                    </label>
                  )}
                  <div className={`bg-white shadow-lg flex items-center  p-3 focus-within:border ${errors.firstName ? 'border border-[#B82D97]' : ' border-[#29ABE2]'}  `}>
                    <FaUser className={`${isFocused.firstName ? `${errors.firstName ? 'text-[#B82D97]' : 'text-[#29ABE2]'}` : 'text-gray-400'} mr-3`} />

                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onFocus={() => handleFocus("firstName")}
                      onBlur={() => handleBlur("firstName")}
                      onChange={handleInputChange}
                      placeholder={!isFocused.firstName && !formData.firstName ? "First Name" : ""}
                      className="w-full outline-none text-gray-600"
                    />
                  </div>
                </div>
              </td>


              <td className="p-3">
                <div className="relative">
                  {(isFocused.lastName || formData.lastName) && (
                    <label className={`absolute -top-3 left-3 ${errors.lastName ? 'bg-[#B82D97]' : 'bg-[#29ABE2]'} text-white text-xs px-2 py-1 rounded-lg transition-all`}>
                      Last Name
                    </label>
                  )}

                  <div className={`bg-white shadow-lg flex items-center  p-3 focus-within:border ${errors.lastName ? 'border border-[#B82D97]' : ' border-[#29ABE2]'}`}>
                    <FaUser className={`${isFocused.lastName ? `${errors.lastName ? 'text-[#B82D97]' : 'text-[#29ABE2]'}` : 'text-gray-400'} mr-3`} />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onFocus={() => handleFocus("lastName")}
                      onBlur={() => handleBlur("lastName")}
                      onChange={handleInputChange}
                      placeholder={!isFocused.lastName && !formData.lastName ? "Last Name" : ""}
                      className="w-full outline-none text-gray-600"
                    />
                  </div>
                </div>
              </td>
              <td className="p-3">
                <div className="relative">
                  {(isFocused.email || formData.email) && (
                    <label className={`absolute -top-3 left-3 ${errors.email ? 'bg-[#B82D97]' : 'bg-[#29ABE2]'} text-white text-xs px-2 py-1 rounded-lg transition-all`}>
                      Email
                    </label>
                  )}

                  <div className={`bg-white shadow-lg flex items-center  p-3 focus-within:border ${errors.email ? 'border border-[#B82D97]' : ' border-[#29ABE2]'}`}>
                    <MdEmail className={`${isFocused.email ? `${errors.email ? 'text-[#B82D97]' : 'text-[#29ABE2]'}` : 'text-gray-400'} mr-3`} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onFocus={() => handleFocus("email")}
                      onBlur={() => handleBlur("email")}
                      onChange={handleInputChange}
                      placeholder={!isFocused.email && !formData.email ? "Email" : ""}
                      className="w-full outline-none text-gray-600"
                    />
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td className="p-3">
                <div className="relative">
                  {(isFocused.mobileNo || formData.mobileNo) && (
                    <label className={`absolute -top-3 left-3 ${errors.mobileNo ? 'bg-[#B82D97]' : 'bg-[#29ABE2]'} text-white text-xs px-2 py-1 rounded-lg transition-all`}>
                      Mobile No:
                    </label>
                  )}

                  <div className={`bg-white shadow-lg flex items-center  p-3 focus-within:border ${errors.mobileNo ? 'border border-[#B82D97]' : ' border-[#29ABE2]'}`}>
                    <FaPhone className={`${isFocused.mobileNo ? `${errors.mobileNo ? 'text-[#B82D97]' : 'text-[#29ABE2]'}` : 'text-gray-400'} mr-3`} />
                    <input
                      type="text"
                      name="mobileNo"
                      value={formData.mobileNo}
                      onFocus={() => handleFocus("mobileNo")}
                      onBlur={() => handleBlur("mobileNo")}
                      onChange={handleInputChange}
                      placeholder={!isFocused.mobileNo && !formData.mobileNo ? "Phone" : ""}
                      className="w-full outline-none text-gray-600"
                    />
                  </div>
                </div>
              </td>
              <td className="p-3" colSpan={2}>
                <div className="relative">
                  {(isFocused.country || formData.country) && (
                    <label className={`absolute -top-3 left-3 ${errors.country ? 'bg-[#B82D97]' : 'bg-[#29ABE2]'} text-white text-xs px-2 py-1 rounded-lg transition-all`}>
                      Country
                    </label>
                  )}
                  <div className={`bg-white shadow-lg flex items-center  p-2 focus-within:border ${errors.country ? 'border border-[#B82D97]' : ' border-[#29ABE2]'}`}>
                    <FaFlagCheckered className={`${isFocused.country ? `${errors.country ? 'text-[#B82D97]' : 'text-[#29ABE2]'}` : 'text-gray-400'} mr-3`} />
                    <select
                      name="country"
                      value={formData.country}
                      onFocus={() => handleFocus("country")}
                      onBlur={() => handleBlur("country")}
                      onChange={handleInputChange}
                      className="w-full outline-none text-gray-500"
                    >
                      <option value="">Select Country</option>
                      <option value="usa">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="india">India</option>
                      <option value="canada">Canada</option>
                      <option value="australia">Australia</option>
                    </select>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td className="p-3">
                <div className="relative">
                  {(isFocused.nationality || formData.nationality) && (
                    <label className={`absolute -top-3 left-3 ${errors.nationality ? 'bg-[#B82D97]' : 'bg-[#29ABE2]'} text-white text-xs px-2 py-1 rounded-lg transition-all`}>
                      City
                    </label>
                  )}
                  <div className={`bg-white shadow-lg flex items-center  p-2 focus-within:border ${errors.nationality ? 'border border-[#B82D97]' : ' border-[#29ABE2]'}`}>
                    <FaHandFist className={`${isFocused.nationality ? `${errors.nationality ? 'text-[#B82D97]' : 'text-[#29ABE2]'}` : 'text-gray-400'} mr-3`} />
                    <select
                      name="nationality"
                      value={formData.nationality}
                      onFocus={() => handleFocus("nationality")}
                      onBlur={() => handleBlur("nationality")}
                      onChange={handleInputChange}
                      className="w-full outline-none text-gray-500"
                    >
                      <option value="" className="">Select City</option>
                      <option value="tamilnadu">Tamilnadu</option>
                    </select>
                  </div>
                </div>
              </td>
              <td className="p-3">
                <div className="relative">
                  {(isFocused.dob || formData.dob) && (
                    <label className={`absolute -top-3 left-3 ${errors.dob ? 'bg-[#B82D97]' : 'bg-[#29ABE2]'} text-white text-xs px-2 py-1 rounded-lg transition-all`}>
                      Birth Date
                    </label>
                  )}
                  <div className={`flex items-center bg-white shadow-lg  p-2 focus-within:border ${errors.dob ? 'border border-[#B82D97]' : ' border-[#29ABE2]'}`}>
                    <GrAnnounce className={`${isFocused.dob ? `${errors.dob ? 'text-[#B82D97]' : 'text-[#29ABE2]'}` : 'text-gray-400'} mr-3`} />
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onFocus={() => handleFocus("dob")}
                      onBlur={() => handleBlur("dob")}
                      onChange={handleInputChange}
                      className="w-full outline-none text-gray-500"
                    />
                  </div>
                </div>
              </td>


              <td className="p-3" rowSpan={2}>
                <div className="bg-white shadow-lg  gap-4">
                  <div className="flex items-center justify-center">
                    <FaTransgender className={`${formData.gender ? `${errors.gender ? 'text-[#B82D97]' : 'text-[#29ABE2]'}` : 'text-gray-400'} mr-3`} />
                    <h2 className="p-3 text-gray-600 font-semibold">Gender</h2>
                  </div>

                  <div className="p-4 flex items-center justify-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleInputChange}
                        className="hidden peer"
                      />
                      <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-[#29ABE2]">
                        <div className="w-3 h-3 bg-gray-400 rounded-full peer-checked:bg-[#29ABE2]"></div>
                      </div>
                      Male
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleInputChange}
                        className="hidden peer"
                      />
                      <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-[#29ABE2]">
                        <div className="w-3 h-3 bg-gray-400 rounded-full peer-checked:bg-[#29ABE2]"></div>
                      </div>
                      Female
                    </label>
                  </div>
                </div>
              </td>
            </tr>

            <tr>

              <td className="p-3">
                <div className="relative">
                  {(isFocused.address || formData.address) && (
                    <label className={`absolute -top-3 left-3 ${errors.address ? 'bg-[#B82D97]' : 'bg-[#29ABE2]'} text-white text-xs px-2 py-1  transition-all`}>
                      Address
                    </label>
                  )}
                  <div className={`flex items-center bg-white shadow-lg  p-2 focus-within:border ${errors.address ? 'border border-[#B82D97]' : ' border-[#29ABE2]'}`}>
                    <FaMapMarkerAlt className={`${isFocused.address ? `${errors.address ? 'text-[#B82D97]' : 'text-[#29ABE2]'}` : 'text-gray-400'} mr-3`} />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("address")}
                      onBlur={() => handleBlur("address")}
                      placeholder={!isFocused.address && !formData.address ? "Address" : ""}
                      className="w-full outline-none text-gray-600"
                    />
                  </div>
                </div>
              </td>

              <td className="p-3">
                <div className="relative">
                  {(isFocused.position || formData.position) && (
                    <label className={`absolute -top-3 left-3 ${errors.position ? 'bg-[#B82D97]' : 'bg-[#29ABE2]'} text-white text-xs px-2 py-1 rounded-lg transition-all`}>
                      Position
                    </label>
                  )}
                  <div className={`flex items-center bg-white shadow-lg p-2 focus-within:border ${errors.position ? 'border border-[#B82D97]' : ' border-[#29ABE2]'}`}>
                    <MdWork className={`${isFocused.position ? `${errors.position ? 'text-[#B82D97]' : 'text-[#29ABE2]'}` : 'text-gray-400'} mr-3`} />
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("position")}
                      onBlur={() => handleBlur("position")}
                      className="w-full outline-none text-gray-600"
                    >
                      <option value="">Choose Position</option>
                      <option value="developer">Software Developer</option>
                      <option value="designer">UI/UX Designer</option>
                      <option value="manager">Project Manager</option>
                      <option value="analyst">Business Analyst</option>
                    </select>
                  </div>
                </div>
              </td>

            </tr>
            <tr>

              <td colSpan={3} className="p-3">
                <div className="relative">
                  {(isFocused.additionalInfo || formData.additionalInfo) && (
                    <label className={`absolute -top-3 left-3 ${errors.additionalInfo ? 'bg-[#B82D97]' : 'bg-[#29ABE2]'} text-white text-xs px-2 py-1  transition-all`}>
                      Additional Info
                    </label>
                  )}
                  <div className={`flex items-center bg-white shadow-lg  p-2 focus-within:border ${errors.additionalInfo ? 'border border-[#B82D97]' : ' border-[#29ABE2]'} h-24`}>
                    <ImLeaf className={`${isFocused.additionalInfo ? `${errors.additionalInfo ? 'text-[#B82D97]' : 'text-[#29ABE2]'}` : 'text-gray-400'} mr-3`} />
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("additionalInfo")}
                      onBlur={() => handleBlur("additionalInfo")}
                      placeholder={!isFocused.additionalInfo && !formData.additionalInfo ? "Additional Info" : ""}
                      className="w-full outline-none"
                    ></textarea>
                  </div>
                </div>
              </td>

            </tr>

            <tr>

              <td></td>
              <td colSpan={2} className="p-3">
                <div className="flex items-center gap-4 bg-white shadow-lg p-3">
                  {formData.profileImage ? (
                    <img
                      src={
                        typeof formData.profileImage === "string"
                          ? formData.profileImage
                          : URL.createObjectURL(formData.profileImage)
                      }
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <BsUpload className={`${errors.profileImage ? "text-[#B82D97]" : "text-[#29ABE2]"} mr-3`} />
                  )}

                  <span className={`${errors.profileImage ? "text-[#B82D97]" : "text-[#29ABE2]"}`}>
                    {isUploading ? "Uploading..." : formData.profileImage ? (formData?.profileImage?.name ? formData?.profileImage?.name : "Selected Image") : "Add your Image"}
                  </span>

                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="imageUpload"
                  />

                  <label
                    htmlFor="imageUpload"
                    className={`ml-auto ${errors.profileImage ? "bg-[#B82D97]" : "bg-[#29ABE2]"} text-white px-6 py-2 rounded-full cursor-pointer`}
                  >
                    {isUploading ? "Uploading..." : "Browse"}
                  </label>
                </div>
              </td>



            </tr>
            <tr>
              <td></td>
              <td colSpan={2} className="p-3 text-sm text-gray-500">
                Only: pdf, jpg, png, doc. Size: less than 1Mb
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </>
  );
};

export default GuestDetails;

