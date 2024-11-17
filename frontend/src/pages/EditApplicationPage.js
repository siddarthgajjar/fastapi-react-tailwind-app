import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApplicationById, updateApplication } from '../api/applicationApi'; // Assume you have an API function for this

const EditApplicationPage = () => {
  const { id } = useParams(); // Extract 'id' from the URL
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    driver_license_number: '',
    birth_date: '',
    sex: '',
    height: '',
    street_number: '',
    street_name: '',
    unit_number: '',
    city: '',
    province: '',
    postal_code: '',
    status: 'in_progress',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        const response = await getApplicationById(id); // Fetch the application by ID
        if (response) {
          setApplication(response);
          setFormData({
            ...response,
            birth_date: response.birth_date.split('T')[0], // Adjust date format if needed
          });
        }
      } catch (error) {
        console.error("Error fetching application data", error);
      }
    };

    fetchApplicationData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSave = async () => {
    setIsSubmitting(true);
    setErrors({}); // Clear previous errors

    try {
      // Attempt to update the application
      await updateApplication(id, formData);
      navigate('/dashboard'); // Redirect to dashboard on success
    } catch (error) {
      console.error('Error saving application', error);

      if (error.response && error.response.data && error.response.data.detail) {
        // If the API returns validation errors
        const errorMessages = error.response.data.detail;
        const formattedErrors = {};

        errorMessages.forEach((err) => {
          const field = err.loc[1]; // Get the field name (e.g., 'first_name')
          const message = err.msg; // Get the error message

          formattedErrors[field] = message; // Store error messages for each field
        });

        setErrors(formattedErrors); // Update the state with the error messages
      } else {
        alert('Failed to save changes. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  // Handle discard form
  const handleDiscard = () => {
    navigate('/dashboard'); // Redirect back to dashboard without saving
  };

  // Handle submit application (this will set status to "submitted")
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({}); // Clear previous errors

    try {
      const dataToSubmit = {
        ...formData,
        status: 'submitted', // Set status to 'submitted'
      };

      // Attempt to submit the application
      await updateApplication(id, dataToSubmit);
      navigate('/dashboard'); // Redirect to dashboard on success
    } catch (error) {
      console.error('Error submitting application', error);

      if (error.response && error.response.data && error.response.data.detail) {
        const errorMessages = error.response.data.detail;
        const formattedErrors = {};

        errorMessages.forEach((err) => {
          const field = err.loc[1]; // Get the field name (e.g., 'first_name')
          const message = err.msg; // Get the error message

          formattedErrors[field] = message; // Store error messages for each field
        });

        setErrors(formattedErrors); // Update the state with the error messages
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const isSubmitted = formData.status === 'submitted';

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Driver License Application</h2>
      <form className="space-y-6">
        {/* Personal Information Section */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                disabled={isSubmitted}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
            </div>
            <div>
              <label htmlFor="middle_name" className="block text-sm font-medium text-gray-700">Middle Name</label>
              <input
                type="text"
                id="middle_name"
                name="middle_name"
                value={formData.middle_name}
                onChange={handleInputChange}
                disabled={isSubmitted}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.middle_name && <p className="text-red-500 text-sm">{errors.middle_name}</p>}
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                disabled={isSubmitted}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
            </div>
            <div>
              <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700">Birth Date</label>
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleInputChange}
                disabled={isSubmitted}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.birth_date && <p className="text-red-500 text-sm">{errors.birth_date}</p>}
            </div>

            <div>
              <label htmlFor="sex" className="block text-sm font-medium text-gray-700">Sex</label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                disabled={isSubmitted}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.sex && <p className="text-red-500 text-sm">{errors.sex}</p>}
            </div>
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height</label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                disabled={isSubmitted}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                required
              />
              {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}
            </div>
          </div>
        </div>

        {/* License Information Section */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">License Information</h3>
          <div>
            <label htmlFor="driver_license_number" className="block text-sm font-medium text-gray-700">Driver License Number</label>
            <input
              type="text"
              id="driver_license_number"
              name="driver_license_number"
              value={formData.driver_license_number}
              onChange={handleInputChange}
              disabled={isSubmitted}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.driver_license_number && <p className="text-red-500 text-sm">{errors.driver_license_number}</p>}
          </div>
        </div>

        {/* Address Section */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Address Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Unit Number</label>
              <input
                type="text"
                name="unit_number"
                value={formData.unit_number || ''}
                onChange={handleInputChange}
                disabled={isSubmitted}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
              />
              {errors.unit_number && <p className="text-red-500 text-sm">{errors.unit_number}</p>}
            </div>
            <div>
              <label htmlFor="street_number" className="block text-sm font-medium text-gray-700">Street Number</label>
              <input
                type="text"
                id="street_number"
                name="street_number"
                value={formData.street_number}
                onChange={handleInputChange}
                disabled={isSubmitted}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.street_number && <p className="text-red-500 text-sm">{errors.street_number}</p>}
            </div>
            <div>
              <label htmlFor="street_name" className="block text-sm font-medium text-gray-700">Street Name</label>
              <input
                type="text"
                id="street_name"
                name="street_name"
                value={formData.street_name}
                onChange={handleInputChange}
                disabled={isSubmitted}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.street_name && <p className="text-red-500 text-sm">{errors.street_name}</p>}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={isSubmitted}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>

            <div>
              <label htmlFor="province" className="block text-sm font-medium text-gray-700">Province</label>
              <input
                type="text"
                id="province"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
                disabled={isSubmitted}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.province && <p className="text-red-500 text-sm">{errors.province}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Postal Code</label>
              <input
                type="text"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleInputChange}
                disabled={isSubmitted}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
              />
              {errors.postal_code && <p className="text-red-500 text-sm">{errors.postal_code}</p>}
            </div>

          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex space-x-4 mt-6">
          <button type="button" onClick={handleDiscard} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
            Discard
          </button>
          <button type="button" onClick={handleSave} disabled={isSubmitted} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
            Save as Draft
          </button>
          <button type="button" onClick={handleSubmit} disabled={isSubmitted} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Submit Application
          </button>
        </div>
        {isSubmitted && (
          <p className="text-sm text-red-500 mt-4">
            This application has already been submitted and cannot be edited or resubmitted.
          </p>
        )}

      </form>
    </div>
  );
};

export default EditApplicationPage;
