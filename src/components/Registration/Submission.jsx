import React from "react";
import { FaEnvelope } from "react-icons/fa";
import Images from "../../assets/images/Image";
import { useSelector } from "react-redux";

const Submission = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <div className="">
      <p className="text-gray-700 text-end font-semibold">Step 3</p>
      
      <img
        src={Images.Thanks}
        alt="Success"
        className="flex mx-auto w-64 md:w-70  object-contain"
      />

      
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4 text-center">
        Thank you for your submission
      </h2>

      <p className="text-gray-600 text-center mt-2">
        <span className="font-bold text-blue-500">{user.firstName} {user.lastName} </span> We will Email you soon!
      </p>

      
      <div className="flex items-center mx-auto bg-white shadow-md rounded-full mt-6 px-4 py-2 w-full max-w-md">
        <input
          type="email"
          placeholder="Subscribe for daily updates..."
          className="w-full outline-none text-gray-600 bg-transparent "
        />
        <FaEnvelope className="text-gray-400" />
      </div>

    </div>



  );
};

export default Submission;
