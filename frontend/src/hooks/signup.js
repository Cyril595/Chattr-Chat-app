import axios from 'axios';

const signup = async (name, password,gender) => {
  try {
    const res = await axios.post(
      'http://localhost:5000/api/auth/signup',
      { name, password,gender },
      { withCredentials: true }
    );
    // If login is successful, return success response
    return { success: true, data: res.data };
  } catch (error) {
    // If login fails, return error response
    if (error.response) {
      return { success: false, message: error.response.data.error }; // Use the error message from backend
    } else {
      return { success: false, message: "Something went wrong. Please try again." }; // Default error message
    }
  }
};

export default signup;
