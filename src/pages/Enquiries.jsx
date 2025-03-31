import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEnquiries,
  addEnquiry,
  editEnquiry,
  deleteEnquiry,
} from "../redux/features/enquiriesSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import Layout from "../components/Layout";

const Enquiries = () => {
  const dispatch = useDispatch();
  const { enquiries, status, error } = useSelector((state) => state.enquiries);

  const [newEnquiry, setNewEnquiry] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEnquiries());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEnquiry({ ...newEnquiry, [name]: value });
  };

  const handleSave = () => {
    if (
      !newEnquiry.firstname ||
      !newEnquiry.lastname ||
      !newEnquiry.email ||
      !newEnquiry.phone ||
      !newEnquiry.message ||
      !newEnquiry.status
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (isEditing) {
      dispatch(editEnquiry({ ...newEnquiry, id: editId }));
    } else {
      dispatch(addEnquiry({ ...newEnquiry, id: enquiries.length + 1 }));
    }

    setShowModal(false);
    resetForm();
  };

  const handleEdit = (id) => {
    const enquiryToEdit = enquiries.find((enquiry) => enquiry.id === id);
    setNewEnquiry(enquiryToEdit);
    setIsEditing(true);
    setEditId(id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );
    if (confirmDelete) {
      dispatch(deleteEnquiry(id));
    }
  };

  const resetForm = () => {
    setNewEnquiry({
      id: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      message: "",
      status: "",
    });
    setIsEditing(false);
    setEditId(null);
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = enquiries.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(enquiries.length / entriesPerPage);

  return (
    <Layout>
      <div className="container mx-auto mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Enquiries</h2>
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            + Add Enquiry
          </button>
        </div>

        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}

        {status === "succeeded" && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">First Name</th>
                  <th className="px-6 py-3">Last Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Message</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.map((enquiry, index) => (
                  <tr key={enquiry.id} className="border-b">
                    <td className="px-6 py-4">
                      {indexOfFirstEntry + index + 1}
                    </td>
                    <td className="px-6 py-4">{enquiry.firstname}</td>
                    <td className="px-6 py-4">{enquiry.lastname}</td>
                    <td className="px-6 py-4">{enquiry.email}</td>
                    <td className="px-6 py-4">{enquiry.phone}</td>
                    <td className="px-6 py-4">{enquiry.message}</td>
                    <td className="px-6 py-4">{enquiry.status}</td>
                    <td className="px-6 py-4">
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-2"
                        onClick={() => handleEdit(enquiry.id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(enquiry.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div>
            <label className="text-sm text-gray-600">
              Show{" "}
              <select
                className="border-2 border-gray-200 rounded px-2 py-1 text-sm"
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>{" "}
              entries
            </label>
          </div>
          <div>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">
                {isEditing ? "Edit Enquiry" : "Add New Enquiry"}
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="First Name"
                  name="firstname"
                  value={newEnquiry.firstname}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Last Name"
                  name="lastname"
                  value={newEnquiry.lastname}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Email"
                  name="email"
                  value={newEnquiry.email}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Phone"
                  name="phone"
                  value={newEnquiry.phone}
                  onChange={handleInputChange}
                />
                <textarea
                  className="w-full border rounded px-3 py-2"
                  placeholder="Message"
                  name="message"
                  value={newEnquiry.message}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Status"
                  name="status"
                  value={newEnquiry.status}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-300 px-4 py-2 rounded mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleSave}
                >
                  {isEditing ? "Save Changes" : "Add Enquiry"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Enquiries;
