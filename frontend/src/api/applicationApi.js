import axios from '../services/httpService';
const getTokenFromLocalStorage = () => localStorage.getItem('token');

export const getUserApplications = async () => {
  const token = getTokenFromLocalStorage();
  const response = await axios.get(`/api/driver_license/my?token=${token}`); // Endpoint for fetching user applications
  if (response.data && Array.isArray(response.data)) {
    return response.data;
  } else {
    console.error('Unexpected response format:', response.data);
    return [];
  }
};

export const createApplication = async (data) => {
  const token = getTokenFromLocalStorage();
  const response = await axios.post(`/api/driver_license?token=${token}`, data); // Endpoint for creating a new application
  return response.data;
};

export const deleteApplication = async (id) => {
  const token = getTokenFromLocalStorage();
  await axios.delete(`/api/driver_license/${id}?token=${token}`); // Endpoint for deleting an application
};

export const getApplicationById = async (id) => {
  const token = getTokenFromLocalStorage();
  const response = await axios.get(`/api/driver_license/${id}?token=${token}`); // Fetch a single application by ID
  if (response.data) {
    return response.data;
  } else {
    console.error('Application not found:', response.data);
    throw new Error('Application not found');
  }
};

export const updateApplication = async (id, data) => {
  const token = getTokenFromLocalStorage();
  const response = await axios.put(`/api/driver_license/${id}?token=${token}`, data); // Update the application
  if (response.data) {
    return response.data;
  } else {
    console.error('Failed to update application:', response.data);
    throw new Error('Failed to update application');
  }
};
