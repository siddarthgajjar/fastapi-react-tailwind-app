import React, { useState, useEffect } from 'react';
import { getUserApplications, deleteApplication } from '../api/applicationApi';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const [selectedApplication, setSelectedApplication] = useState(null); // For viewing application details
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // To control confirmation modal visibility

  useEffect(() => {
    // Fetch applications from API
    const fetchApplications = async () => {
      try {
        const response = await getUserApplications();
        // Ensure response.data exists and is an array
        if (response && Array.isArray(response)) {
          setApplications(response);
        } else {
          console.error("Invalid data format received:", response);
          setApplications([]); // Default to an empty array if invalid data
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        setApplications([]); // Handle error gracefully
      }
    };
    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteApplication(id); // Delete application by ID
      setApplications(applications.filter(app => app.id !== id)); // Update state after deletion
      closeConfirmationModal();
    } catch (error) {
      console.error("Failed to delete application", error);
    }
  };

  const handleCreateApplication = () => {
    navigate('/applications/create'); // Navigate to the create application page
  };
  const handleEdit = (id) => {
    navigate(`/applications/edit/${id}`);
  };
  const handleViewDetails = (application) => {
    setSelectedApplication(application); // Open the modal with application details
  };
  const closeModal = () => {
    setSelectedApplication(null); // Close the modal
  };


  const openConfirmationModal = (application) => {
    setSelectedApplication(application); // Set the application to be deleted
    setShowConfirmationModal(true); // Open the confirmation modal
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false); // Close the confirmation modal
    setSelectedApplication(null); // Clear selected application
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            In Progress
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            Submitted
          </span>
        );
    }
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-indigo-700 mb-6">Your Applications</h2>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleCreateApplication}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
        >
          Create New Application
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Driver License</th>
              <th className="py-3 px-6 text-left">Birth Date</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">You have no applications yet.</td>
              </tr>
            ) : (
              applications.map((application) => (
                <tr key={application.id} className="border-t hover:bg-indigo-50 transition duration-200">
                  <td className="py-4 px-6">{application.first_name} {application.middle_name ? application.middle_name : ''} {application.last_name}</td>
                  <td className="py-4 px-6">{application.driver_license_number || 'Not Provided'}</td>
                  <td className="py-4 px-6">{application.birth_date}</td>
                  <td className="py-4 px-6">
                    {getStatusBadge(application.status)}
                  </td>

                  <td className="py-4 px-6 text-center">
                    {/* View Details Button */}
                    <button
                      onClick={() => handleViewDetails(application)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 mr-2"
                    >
                      View Details
                    </button>
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEdit(application.id)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200 mr-2"
                    >
                      Edit
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => openConfirmationModal(application)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Modal for Confirmation */}
      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete the application for {selectedApplication?.first_name} {selectedApplication?.last_name}? This action cannot be undone.</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button 
                onClick={() => handleDelete(selectedApplication.id)}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-200"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeConfirmationModal}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for View Details */}
      {selectedApplication && !showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">Application Details</h3>
            <p><strong>Name:</strong> {selectedApplication.first_name} {selectedApplication.middle_name || ''} {selectedApplication.last_name}</p>
            <p><strong>Driver License Number:</strong> {selectedApplication.driver_license_number || 'Not Provided'}</p>
            <p><strong>Birth Date:</strong> {selectedApplication.birth_date}</p>
            <p><strong>Status:</strong> <span className={`font-semibold ${selectedApplication.status === 'in_progress' ? 'text-yellow-600' : 'text-green-600'}`}>{selectedApplication.status}</span></p>
            <p><strong>Height:</strong> {selectedApplication.height} cm</p>

            <h4 className="font-semibold text-indigo-600 mt-4">Address</h4>
            <p><strong>Street:</strong> {selectedApplication.street_number} {selectedApplication.street_name}</p>
            {selectedApplication.unit_number && <p><strong>Unit Number:</strong> {selectedApplication.unit_number}</p>}
            <p><strong>City:</strong> {selectedApplication.city}, {selectedApplication.province}</p>
            <p><strong>Postal Code:</strong> {selectedApplication.postal_code}</p>

            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

};

export default DashboardPage;
