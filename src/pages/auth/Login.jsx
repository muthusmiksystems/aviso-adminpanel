import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { loginUser } from "../../redux/features/authSlice";
import AuthContainer from "../../components/AuthContainer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response?.data?.user)); // Store user in localStorage
        if (response?.data?.user?.isRegistered) {
          navigate("/student-dashboard");
        } else {
          navigate("/dashboard");
        }
      })
      .catch(() => {});
  };

  return (
    <AuthContainer>
      <div className="flex justify-center px-8 lg:px-20 py-16">
        <div className="hidden md:flex flex-col  py-28 w-1/2 text-white">
          <h2 className="text-3xl font-bold ">Aviso Careers</h2>
          <h1 className="text-6xl mt-3 font-bold">Login</h1>
        </div>

        <div className="w-full md:w-1/2 bg-white rounded-lg p-8 mr-0 lg:mr-16">
          <h2 className="text-center text-3xl font-bold bg-gradient-to-b from-[#FB46E8] to-[#A82884] text-transparent bg-clip-text mb-6">
            Welcome Back!
          </h2>
          <hr className="border-gray-300 my-5 mx-auto w-3/4" />

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="text-lg font-semibold text-[#606060]">
                Your Email *
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3  rounded-lg mt-1 outline-none"
                style={{ backgroundColor: "rgba(148, 215, 244, 0.28)" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-lg font-semibold text-[#606060]">
                Password *
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3  rounded-lg mt-1 outline-none"
                style={{ backgroundColor: "rgba(148, 215, 244, 0.28)" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#29ABE2] shadow-md shadow-pink-200 text-white py-3 rounded-full font-semibold text-lg "
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center my-4 text-gray-500">or</div>

          <button className="w-full bg-gradient-to-b from-[#FB46E8] to-[#A82884] text-white py-3 rounded-full font-semibold text-lg flex items-center justify-center hover:opacity-90 transition">
            <span className="mr-2 text-xl">
              <FaGoogle className="text-lg" />
            </span>{" "}
            Continue with Google
          </button>

          <p className="text-center mt-6 text-gray-600">
            New to Aviso?{" "}
            <Link
              to="/register"
              className="text-pink-500 font-semibold cursor-pointer"
            >
              Sign up
            </Link>
          </p>
          <hr className="border-gray-300 my-5 mx-auto w-3/4" />
          <p className="text-xs text-[#8E8E8E] font-regular text-center mt-4 px-6 md:px-10 lg:px-24">
            <span className="text-regular">
              Having trouble <Link to="/login">logging in?</Link> Contact help
              center
            </span>
          </p>

          <p className="font-[OmnesArabic] font-regular text-xs text-[#8E8E8E] text-center mt-4 px-6 md:px-10 lg:px-24">
            This site is protected by reCAPTCHA Enterprise and the Google{" "}
            <Link to="#" className="text-[#606060] font-semibold">
              Privacy policy
            </Link>{" "}
            and{" "}
            <Link to="#" className="text-[#606060] font-semibold">
              Terms of Service
            </Link>{" "}
            apply.
          </p>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Login;
