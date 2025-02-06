import { useSelectedConversation } from '../context/selectedConversationContext';
import axios from 'axios';

// Custom hook for sending messages
const useSendMessage = () => {
  const { selectedConversationId } = useSelectedConversation(); // Get selected conversation ID from context

  const sendMessage = async (message) => {
    try {
      if (!selectedConversationId) {
        console.error("No selected conversation");
        return;
      }

      // Send the message using axios
      await axios.post(
        `http://localhost:5000/api/messages/send/${selectedConversationId}`,
        { message },
        { withCredentials: true }
      );
    } catch (error) {
      console.log("Error in sending message:", error);
    }
  };

  return sendMessage;
};

export default useSendMessage;
