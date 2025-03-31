import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchJobTypes,
  saveJobType, // Use saveJobType instead of addJobType
  deleteJobType,
} from "../redux/features/jobtypesSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import Layout from "../components/Layout";

const JobTypes = () => {
  const dispatch = useDispatch();
  const { jobTypes, status, error } = useSelector((state) => state.jobTypes);

  const [newJobType, setNewJobType] = useState({
    id: "",
    // categoryId: "",
    categoryName: "",
    title: "",
    description: "",
    salaryRange: "",
    status: "",
    // countryId: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchJobTypes());
    }
  }, [dispatch, status]);

  // Prevent background scrolling and apply blur when modal is open
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
    setNewJobType({ ...newJobType, [name]: value });
  };

  const handleSave = () => {
    if (
      // !newJobType.categoryId ||
      !newJobType.categoryName ||
      !newJobType.title ||
      !newJobType.description ||
      !newJobType.salaryRange ||
      !newJobType.status
      // !newJobType.countryId
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (isEditing) {
      dispatch(editJobType({ ...newJobType, id: editId }));
    } else {
      dispatch(saveJobType(newJobType));
    }

    setShowModal(false);
    resetForm();
  };

  const handleEdit = (id) => {
    const jobTypeToEdit = jobTypes.find((jobType) => jobType.id === id);
    setNewJobType(jobTypeToEdit);
    setIsEditing(true);
    setEditId(id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job type?"
    );
    if (confirmDelete) {
      dispatch(deleteJobType(id));
    }
  };

  const resetForm = () => {
    setNewJobType({
      id: "",
      // categoryId: "",
      categoryName: "",
      title: "",
      description: "",
      salaryRange: "",
      status: "",
      // countryId: "",
    });
    setIsEditing(false);
    setEditId(null);
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = jobTypes.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(jobTypes.length / entriesPerPage);

  return (
    <Layout>
      <div className="container mx-auto mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Job Types</h2>
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            + Add Job Type
          </button>
        </div>

        {/* Responsive Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Category ID
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Category Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Salary Range
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Country ID
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((jobType, index) => (
                <tr
                  key={jobType.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {indexOfFirstEntry + index + 1}
                  </th>
                  {/* <td className="px-6 py-4">{jobType.categoryId}</td> */}
                  <td className="px-6 py-4">{jobType.categoryName}</td>
                  <td className="px-6 py-4">{jobType.title}</td>
                  <td className="px-6 py-4">{jobType.description}</td>
                  <td className="px-6 py-4">{jobType.salaryRange}</td>
                  <td className="px-6 py-4">{jobType.status}</td>
                  {/* <td className="px-6 py-4">{jobType.countryId}</td> */}
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => handleEdit(jobType.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(jobType.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
          <div className="fixed inset-0 bg-gradient-to-r from-black/60 to-gray-800/60 bg-opacity-90 backdrop-blur-lg flex justify-center items-center z-60">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
              <h3 className="text-lg font-semibold mb-4">
                {isEditing ? "Edit Job Type" : "Add New Job Type"}
              </h3>
              <div className="space-y-4">
                {/* <input
                  type="text"
                  className="w-full border-2 border-gray-200 rounded px-3 py-2"
                  placeholder="Category ID"
                  name="categoryId"
                  value={newJobType.categoryId}
                  onChange={handleInputChange}
                /> */}
                <input
                  type="text"
                  className="w-full border-2 border-gray-200 rounded px-3 py-2"
                  placeholder="Category Name"
                  name="categoryName"
                  value={newJobType.categoryName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="w-full border-2 border-gray-200 rounded px-3 py-2"
                  placeholder="Title"
                  name="title"
                  value={newJobType.title}
                  onChange={handleInputChange}
                />
                <textarea
                  className="w-full border-2 border-gray-200 rounded px-3 py-2"
                  placeholder="Description"
                  name="description"
                  value={newJobType.description}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="w-full border-2 border-gray-200 rounded px-3 py-2"
                  placeholder="Salary Range"
                  name="salaryRange"
                  value={newJobType.salaryRange}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="w-full border-2 border-gray-200 rounded px-3 py-2"
                  placeholder="Status"
                  name="status"
                  value={newJobType.status}
                  onChange={handleInputChange}
                />
                {/* <input
                  type="text"
                  className="w-full border-2 border-gray-200 rounded px-3 py-2"
                  placeholder="Country ID"
                  name="countryId"
                  value={newJobType.countryId}
                  onChange={handleInputChange}
                /> */}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded hover:from-blue-600 hover:to-blue-700"
                  onClick={handleSave}
                >
                  {isEditing ? "Save Changes" : "Add Job Type"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default JobTypes;
