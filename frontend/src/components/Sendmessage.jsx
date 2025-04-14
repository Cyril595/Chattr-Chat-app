import React, { useState } from 'react';
import useSendMessage from '../hooks/useSendMessage'; // Import the custom hook for sending messages
import { useSelectedConversation } from "../context/selectedConversationContext";

const Sendmessage = () => {
  const [m, setM] = useState(""); // Manage message input state
  const sendMessage = useSendMessage(); // Use the sendMessage function from the custom hook
  const { selectedConversationId, messages, setMessages } = useSelectedConversation();
  
  const handleSend = async () => {
    if (m.trim()) {
      // Send the message to the backend (via custom hook)
      await sendMessage(m); 

      // Immediately update the message UI for the sender side
      const newMessage = {
        message: m,
        receiverId: selectedConversationId, // Make sure the senderId is set correctly for the current user
      };

      // Update messages state to immediately reflect the new message in the UI
      setMessages([...messages, newMessage]);

      // Clear the message input field after sending
      setM(""); 
    } else {
      console.log("Message cannot be empty");
    }
  };

  return (
   <>
    {selectedConversationId && (
    <div className='flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md'>
    <input
      type="text"
      value={m}
      onChange={(e) => setM(e.target.value)} // Update message state as user types
      placeholder="Type a message"
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={handleSend}
      className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      Send
    </button>
  </div>
    )}
   </>
  );
};

export default Sendmessage;
