import axios from 'axios';

// The login function should only handle the API request and return data
const login = async (name, password) => {
  try {
    const res = await axios.post(
      'http://localhost:5000/api/auth/login',
      { name, password },
      { withCredentials: true }
    );

    // Return the user data (can be used to set context later)
    return { success: true, data: res.data };
  } catch (error) {
    // Handle error response from API
    if (error.response) {
      return { success: false, message: error.response.data.error };
    } else {
      return { success: false, message: "Something went wrong. Please try again." };
    }
  }
};

export default login;
