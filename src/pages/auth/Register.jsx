import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/features/authSlice";
import AuthContainer from "../../components/AuthContainer";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(
        registerUser({ ...formData, role: "admin" })
      ).unwrap();
      navigate("/login"); // Redirect to login on success
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <AuthContainer>
      <div className="flex justify-center px-8 lg:px-20 pt-16">
        <div className="w-full md:w-1/2 bg-white rounded-lg p-8">
          <h1 className="text-2xl font-semibold text-center">
            Admin Registration
          </h1>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="text-lg font-semibold text-[#606060]">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-3 rounded-lg mt-2 outline-none"
                style={{ backgroundColor: "rgba(148, 215, 244, 0.28)" }}
                required
              />
            </div>

            <div>
              <label className="text-lg font-semibold text-[#606060]">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg mt-2 outline-none"
                style={{ backgroundColor: "rgba(148, 215, 244, 0.28)" }}
                required
              />
            </div>

            <div>
              <label className="text-lg font-semibold text-[#606060]">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-3 rounded-lg mt-2 outline-none"
                style={{ backgroundColor: "rgba(148, 215, 244, 0.28)" }}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 font-semibold text-white bg-[#29ABE2] rounded-full shadow-md"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register as Admin"}
            </button>

            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}
          </form>

          <p className="text-sm text-center mt-4">
            Already registered?{" "}
            <Link to="/login" className="text-pink-500 font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Register;
