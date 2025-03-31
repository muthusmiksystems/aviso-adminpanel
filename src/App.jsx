import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import ToastMessage from "./components/common/toast/Toast";

// Lazy-loaded pages
const Home = React.lazy(() => import("./pages/Home/index"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const JobTypes = React.lazy(() => import("./pages/JobTypes"));
const Categories = React.lazy(() => import("./pages/Categories"));
const Enquiries = React.lazy(() => import("./pages/Enquiries"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobtypes" element={<JobTypes />} />
          <Route path="/jobtypes" element={<JobTypes />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/enquiries" element={<Enquiries />} />
        </Routes>
      </Suspense>

      {/* <ToastMessage /> */}
    </Router>
  );
}

export default App;
