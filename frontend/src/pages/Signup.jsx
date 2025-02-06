import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import signup from '../hooks/signup';  // Assuming this is your signup hook

const Signup = () => {
  const [name, setName] = useState("");  
  const [password, setPassword] = useState(""); 
  const [gender, setGender] = useState("");  // State for gender
  const [errorMessage, setErrorMessage] = useState("");  
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // Include gender in the signup request
    const { success, message } = await signup(name, password, gender);

    if (success) {
      // If signup is successful, navigate to the Home page
      navigate('/home');
    } else {
      // If signup fails, display the error message
      setErrorMessage(message);  // Set error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        
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

          {/* Gender Selection */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input 
                type="radio" 
                name="gender" 
                value="male" 
                onChange={(e) => setGender(e.target.value)} 
                checked={gender === 'male'}
                className="form-radio text-blue-500"
              /> 
              <span>Male</span>
            </label>
            <label className="flex items-center space-x-2">
              <input 
                type="radio" 
                name="gender" 
                value="female" 
                onChange={(e) => setGender(e.target.value)} 
                checked={gender === 'female'}
                className="form-radio text-blue-500"
              /> 
              <span>Female</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-blue-500 hover:underline"
          >
            Already have an account?
          </button>
        </div>

        {errorMessage && (
          <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Signup;
