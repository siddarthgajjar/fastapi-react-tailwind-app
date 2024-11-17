import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createApplication } from '../api/applicationApi';

const CreateApplicationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    last_name: '',
    first_name: '',
    middle_name: '',
    driver_license_number: '',
    birth_date: '',
    sex: '',
    height: '',
    unit_number: '',
    street_number: '',
    street_name: '',
    po_box: '',
    city: '',
    province: '',
    postal_code: '',
    status: 'in_progress',
    user_id: 1,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.middle_name) newErrors.middle_name = 'Middle name is required';
    if (!formData.last_name) newErrors.last_name = 'Last name is required';
    if (!formData.birth_date) newErrors.birth_date = 'Birth date is required';
    if (!formData.sex) newErrors.sex = 'Sex is required';
    if (!formData.height || isNaN(formData.height)) newErrors.height = 'Height must be a valid number';
    if (!formData.driver_license_number) newErrors.driver_license_number = 'License Number is required';
    if (!formData.unit_number) newErrors.unit_number = 'Unit number is required';
    if (!formData.street_number) newErrors.street_number = 'Street number is required';
    if (!formData.street_name) newErrors.street_name = 'Street name is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.province) newErrors.province = 'Province is required';
    if (!formData.postal_code) newErrors.postal_code = 'Postal code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const response = await createApplication(formData);
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data) {
        // Backend validation errors
        setErrors(error.response.data);
      } else {
        // Other errors (e.g., network issues)
        alert('Failed to save application. Please try again.');
      }
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    const dataToSubmit = { ...formData, status: 'submitted' };
    try {
      const response = await createApplication(dataToSubmit);
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data) {
        // Backend validation errors
        setErrors(error.response.data);
      } else {
        // Other errors (e.g., network issues)
        alert('Failed to submit application. Please try again.');
      }
    }
  };

  const handleDiscard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Driver License Application</h2>
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
              onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
          <button type="button" onClick={handleSave} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
            Save as Draft
          </button>
          <button type="button" onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateApplicationForm;
