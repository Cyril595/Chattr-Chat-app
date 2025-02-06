import React from 'react';
import Sidebar from '../components/Sidebar';
import Messagebox from '../components/messagebox';
import Sendmessage from '../components/Sendmessage';
import Logout from '../components/logout';

const Home = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      {/* Centralized container with fixed width */}
      <div className="w-[70%] h-[80%] bg-white rounded-lg shadow-lg overflow-hidden flex">
        {/* Sidebar takes 30% width, content takes 70% width */}
        <Sidebar className="w-1/3" />
        
        {/* Main chat area */}
        <div className="flex-1 p-4 flex flex-col">
          <Messagebox /> {/* Fixed size message box with scrollable content */}
          <Sendmessage /> {/* Only visible when a conversation is selected */}
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Home;
