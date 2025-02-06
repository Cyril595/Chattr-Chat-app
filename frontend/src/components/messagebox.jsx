import React, { useEffect } from "react"; // Importing necessary hooks and functions
import { useSelectedConversation } from "../context/selectedConversationContext";
import getMessage from "../hooks/getMessage";
import useListenMessages from "../hooks/useListenMessages";

const Messagebox = () => {
  const { selectedConversationId, messages, setMessages } = useSelectedConversation();
  useListenMessages(); // For listening to new messages in real-time

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedConversationId) {
        try {
          const { conversation } = await getMessage(selectedConversationId);
          setMessages(conversation || []); // Set fetched messages in the state
        } catch (error) {
          console.error("Error fetching messages:", error);
          setMessages([]); // If fetching fails, set empty array
        }
      }
    };

    fetchMessages(); // Call the fetch function on component mount or when selectedConversationId changes
  }, [selectedConversationId]);

  return (
    <div className="flex-1 bg-gray-50 p-4 rounded-lg overflow-y-auto h-[400px]">
      {messages.length > 0 ? (
        <div>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.receiverId === selectedConversationId ? "justify-end" : "justify-start"} mb-2`}
            >
              <p
                className={`${
                  message.senderId === selectedConversationId
                    ? "bg-gray-200 text-black" // If the receiver is sending the message (receiver's message)
                    : "bg-blue-500 text-white" // If the logged-in user is sending the message (sender's message)
                } p-2 rounded-md max-w-[75%]`}
              >
                {message.message}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No chats yet</p> // Message displayed if no messages are present
      )}
    </div>
  );
};

export default Messagebox;
