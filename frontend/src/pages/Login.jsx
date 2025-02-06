import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuthContext } from '../context/AuthContext'; // Import the AuthContext
import login from '../hooks/login'; // Import the login function

const Login = () => {
  const [name, setName] = useState("");  
  const [password, setPassword] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");  
  const { setAuthUser } = useAuthContext();  // Access setAuthUser from context
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const { success, message, data } = await login(name, password);

    if (success) {
      setAuthUser(data); 
      navigate('/home');
    } else {
      setErrorMessage(message);  
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/signup')}
            className="text-blue-500 hover:underline"
          >
            New user? Sign up
          </button>
        </div>

        {errorMessage && (
          <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
