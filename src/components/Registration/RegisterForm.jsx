import React, { useEffect, useState } from "react";
import StepIndicator from "./StepIndicator";
import CareerYouNeed from "./CareerYouNeed";
import GuestDetails from "./GuestDetails";
import Submission from "./Submission";
import Images from "../../assets/images/Image";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/features/authSlice";
import { formatDateForInput } from "../../utils/dateUtils";
import { useNavigate } from "react-router-dom";

const steps = [
  { title: "Questionnaire", image: Images.Steper1 },
  { title: "Details", image: Images.Steper2 },
  { title: "Thank You", image: Images.Steper3 },
];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [stepIndicator, setStepIndicator] = useState(true);
  const { user } = useSelector((state) => state.auth)
  const [userData, setUserData] = useState(user || {})
  const [formData, setFormData] = useState({
    role: userData?.role || "",
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    dob: formatDateForInput(userData?.dob) || "",
    email: userData.email,
    address: userData?.address || "",
    mobileNo: userData?.mobileNo || "",
    country: userData?.country || "",
    nationality: userData?.nationality || "",
    gender: userData?.gender || 'male',
    additionalInfo: userData?.additionalInfo || "",
    career: userData?.career || "",
    position: userData?.position || "",
    profileImage: userData?.profileImage || ""
  });
  const [isFocused, setIsFocused] = useState({
    firstName: false,
    lastName: false,
    email: false,
    mobileNo: false,
    country: false,
    city: false,
    dob: false,
    address: false,
    position: false,
    additionalInfo: false,
  });
  const [errors, setErrors] = useState({});

  const nextStep = () => {
    if (currentStep === 1 && !validateForm()) return; // Validate only on step 1

    if (currentStep === 1) {

      // Create a copy of formData excluding profileImage
      const { profileImage, ...updatedFormData } = formData;

      dispatch(updateUser(updatedFormData)).then(() => {
        setCurrentStep(currentStep + 1);
      });
      return; // Ensure that the step increment does not happen twice
    }

    if (currentStep < steps.length - 1 && currentStep !== 1) {
      setCurrentStep(currentStep + 1);
    }
  };


  const prevStep = () => {
    if (currentStep === 2) navigation('/student-dashboard')
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };
  const validateForm = () => {
    const newErrors = {};
    // Check required fields
    if (!formData.firstName) {
      newErrors.firstName = true;
      setIsFocused((prev) => ({ ...prev, firstName: true }));
    }
    if (!formData.lastName) {
      newErrors.lastName = true;
      setIsFocused((prev) => ({ ...prev, lastName: true }));
    }
    if (!formData.dob) {
      newErrors.dob = true;
      setIsFocused((prev) => ({ ...prev, dob: true }));
    }
    if (!formData.email) {
      newErrors.email = true;
      setIsFocused((prev) => ({ ...prev, email: true }));
    }
    if (!formData.address) {
      newErrors.address = true;
      setIsFocused((prev) => ({ ...prev, address: true }));
    }
    if (!formData.mobileNo) {
      newErrors.mobileNo = true;
      setIsFocused((prev) => ({ ...prev, mobileNo: true }));
    }
    if (!formData.country) {
      newErrors.country = true;
      setIsFocused((prev) => ({ ...prev, country: true }));
    }
    if (!formData.nationality) {
      newErrors.nationality = true;
      setIsFocused((prev) => ({ ...prev, nationality: true }));
    }
    if (!formData.gender) {
      newErrors.gender = true;
      setIsFocused((prev) => ({ ...prev, gender: true }));
    }
    if (!formData.additionalInfo) {
      newErrors.additionalInfo = true;
      setIsFocused((prev) => ({ ...prev, additionalInfo: true }));
    }
    if (!formData.career) {
      newErrors.career = true;
      setIsFocused((prev) => ({ ...prev, career: true }));
    }
    if (!formData.position) {
      newErrors.position = true;
      setIsFocused((prev) => ({ ...prev, position: true }));
    }
    if (!formData.profileImage) {
      newErrors.profileImage = true;
      setIsFocused((prev) => ({ ...prev, profileImage: true }));
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setStepIndicator(true);
      }
      else {
        setStepIndicator(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex-none lg:flex justify-between itmes-center px-3 md:px-16 py-10 gap-3 font-[OmnesArabic]">
      {stepIndicator && <div className="w-1/4">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>}

      {/* sadha */}
      <div className="relative">
        <button
          className="lg:hidden fixed top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <AiOutlineMenu size={24} />
        </button>

        <div
          className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-5 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out z-50`}
        >
          <button
            className="absolute top-4 right-4 text-gray-600"
            onClick={() => setIsOpen(false)}
          >
            <AiOutlineClose size={24} />
          </button>

          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </div>
      {/* sadha */}
      <div className="w-full lg:w-3/4 py-4">
        <div className="bg-[linear-gradient(350deg,#e8f8fd,#FFFFFF)] h-full  px-4  rounded-lg shadow-[2px_2px_4px_rgba(41,171,226,200)]">
          <div className="">
            {currentStep === 0 && <CareerYouNeed formData={formData} setFormData={setFormData} />}
            {currentStep === 1 && <GuestDetails formData={formData} setFormData={setFormData} isFocused={isFocused} setIsFocused={setIsFocused} errors={errors} setErrors={setErrors} />}
            {currentStep === 2 && <Submission />}
          </div>

          <div className="flex justify-end space-x-4 mt-7 mr-14 pb-5">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-[#29ABE2] text-white rounded-full"
              >
                {currentStep === 2 ? "BACK TO HOME" : "BACK"}
              </button>
            )}
            {currentStep < steps.length - 1 && (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-[#29ABE2] text-white rounded-full"
              >
                NEXT
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;

