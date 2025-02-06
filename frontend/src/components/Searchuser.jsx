import React, { useState } from 'react';
import getuser from '../hooks/getuser';
import { useSelectedConversation } from '../context/selectedConversationContext';
const Searchuser = () => {
  const [name, setname] = useState("");
  const { users } = getuser(); // Fetch users from your custom hook
  const { setConversation } = useSelectedConversation(); 
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!name) return;
    if (name.length < 3) {
      alert("Search term must be at least 3 characters long");
      return;
    }

    const user = users.find((c) => c.name.toLowerCase().includes(name.toLowerCase()));

    if (!user) {
      alert("No user found with the name: " + name);
    } else {
      setConversation(user._id);
      console.log(user.name);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setname(e.target.value)}
        placeholder="Search for a user"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Search
      </button>
    </div>
  );
};

export default Searchuser;
