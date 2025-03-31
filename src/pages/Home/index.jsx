import React from "react";
import Layout from "../../components/Layout";

const Home = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Welcome to the Admin Panel</h1>
      <p className="text-lg text-gray-700">
        Use the sidebar to navigate through the admin panel.
      </p>
    </Layout>
  );
};

export default Home;
