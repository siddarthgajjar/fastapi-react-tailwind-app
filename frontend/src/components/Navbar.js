import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';


const Navbar = () => {
  const { isAuthenticated, handleLogout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    setProfileOpen(false);  // Reset profile dropdown on logout
    navigate('/');
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  return (
    <nav className="bg-indigo-600 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-xl font-bold">
          Driver License Application
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="text-white lg:hidden"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Links */}
        <div
          className={`flex-col lg:flex-row lg:flex lg:items-center lg:space-x-8 ${
            menuOpen ? 'flex' : 'hidden'
          }`}
        >
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className="text-white hover:text-gray-200 block lg:inline-block py-2 lg:py-0"
              >
                Dashboard
              </Link>

              {/* Profile Dropdown */}
              <div className="relative inline-block">
                <button
                  onClick={toggleProfile}
                  className="text-white flex items-center hover:text-gray-200"
                >
                  <FaUserCircle size={24} className="mr-2" />
                  <span>Account</span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                    <button
                      onClick={onLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          {!isAuthenticated && (
            <Link
              to="/"
              className="text-white hover:text-gray-200 block lg:inline-block py-2 lg:py-0"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
