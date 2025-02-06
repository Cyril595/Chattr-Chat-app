import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import logout from '../hooks/logout'; 

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
    >
      Logout
    </button>
  );
};

export default Logout;
