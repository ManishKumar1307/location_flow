import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-teal-800 p-4 shadow-md">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto">
        <div className="text-white text-4xl font-semibold">E-Shop</div>
        <div className="flex items-center space-x-6">
          {username ? (
            <div className="text-white flex items-center space-x-4">
              <span className='font-semibold'>Welcome, {username}</span>
              <button
                className="bg-white text-teal-800 px-4 py-2 rounded-md hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <a
              href="/login"
              className="bg-white text-teal-800 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
