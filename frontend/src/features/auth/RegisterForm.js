import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../api/authApi';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        // Reset error messages for individual fields
        const fieldErrors = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            general: '',
        };

        try {
            // Check if password and confirmPassword match
            if (password !== confirmPassword) {
                fieldErrors["confirmPassword"] = "Passwords and confirm password do not match.";
                setError(fieldErrors);
                setLoading(false);
                return;
            }

            // API call to register user
            const response = await register({
                username,
                email,
                password,
            });

            if (response.status === 201) {
                alert('Registration successful! You can now log in.');
                navigate('/');
            }
        } catch (err) {
          debugger;
            // Handle error response from FastAPI
            const errorData = err.response?.data;

            // Check if the response has a 'detail' array with validation errors
            if (Array.isArray(errorData?.detail)) {
                errorData.detail.forEach((error) => {
                    const field = error.loc[1]; // Extract the field name from 'loc'
                    const message = error.msg;  // Extract the error message

                    // Set the field-specific error message
                    if (fieldErrors.hasOwnProperty(field)) {
                        fieldErrors[field] = message;
                    } else {
                        fieldErrors['general'] = err?.response?.data?.detail || 'Registration failed. Please try again.'
                    }
                });
            } else {
                // General error message if detail is not an array
              fieldErrors['general'] = err?.response?.data?.detail || 'Registration failed. Please try again.'
            }

            // Set individual field errors
            setError(fieldErrors);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Create your account</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm card rounded-none">
            {error.general && <div className="text-red-600 text-sm">{error.general}</div>}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-900">Username</label>
                  <div className="mt-2">
                      <input
                          id="username"
                          name="username"
                          type="text"
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                      />
                      {error.username && <div className="text-red-600 text-sm">{error.username}</div>}
                  </div>
              </div>

              <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                  <div className="mt-2">
                      <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                      />
                      {error.email && <div className="text-red-600 text-sm">{error.email}</div>}
                  </div>
              </div>

              <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
                  <div className="mt-2">
                      <input
                          id="password"
                          name="password"
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                      />
                      {error.password && <div className="text-red-600 text-sm">{error.password}</div>}
                  </div>
              </div>

              <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">Confirm Password</label>
                  <div className="mt-2">
                      <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                      />
                      {error.confirmPassword && <div className="text-red-600 text-sm">{error.confirmPassword}</div>}
                  </div>
              </div>


              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?
              <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500"> Login</Link>
            </p>
          </div>
        </div>
    )
}

export default RegisterForm;
