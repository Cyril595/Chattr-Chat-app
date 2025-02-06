import React, { createContext, useState, useContext } from 'react';

// Create the context
const SelectedConversationContext = createContext();

// Create the provider
export const SelectedConversationProvider = ({ children }) => {
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [messages, setMessages] = useState([]); // New state for messages

  const setConversation = (userId) => {
    setSelectedConversationId(userId); // Set the selected user ID
  };

  return (
    <SelectedConversationContext.Provider value={{ selectedConversationId, setConversation, messages, setMessages }}>
      {children}
    </SelectedConversationContext.Provider>
  );
};

// Custom hook to use the context
export const useSelectedConversation = () => {
  return useContext(SelectedConversationContext);
};
