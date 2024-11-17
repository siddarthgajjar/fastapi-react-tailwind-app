import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { handleLogin } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message before new submission
    try {
      await handleLogin(username, password);
      navigate('/dashboard'); // Navigate to the dashboard on successful login
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Invalid username or password. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm card rounded-none">
            {error && (
              <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-50 p-4 border-l-4 border-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 4.418-3.582 8-8 8S2 14.418 2 10 5.582 2 10 2s8 3.582 8 8zm-8.707-3.707a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V14a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414l-3-3z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            )}        
          <form className="space-y-6" onSubmit={handleSubmit} action="#" method="POST">
          <div>
            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Username</label>
            <div className="mt-2">
              <input id="username" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Don't have an account? 
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500"> Signup</Link>
        </p>
      </div>
    </div>

  );
};

export default LoginForm;
