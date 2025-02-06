// Assuming this is in a custom hook or function
import axios from 'axios';

const getMessage = async (receiverId) => {
  try {
    // Send a GET request to fetch messages for the specified receiverId
    const res = await axios.get(`http://localhost:5000/api/messages/${receiverId}`, { withCredentials: true });
    // Return the conversation data
    return { conversation: res.data }; // Directly use res.data as Axios automatically parses the JSON
  } catch (error) {
    console.error("Error in getMessage.js:", error);
    return { conversation: [], error: 'Something went wrong while fetching messages.' }; // Return error message or empty array
  }
};

export default getMessage;
