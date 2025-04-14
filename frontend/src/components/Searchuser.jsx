import React, { useState } from 'react';
import getuser from '../hooks/getuser';
import { useSelectedConversation } from '../context/selectedConversationContext';

const Searchuser = () => {
  const [name, setname] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { users } = getuser();
  const { setConversation } = useSelectedConversation();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!name || name.length < 3) {
      alert("Search term must be at least 3 characters long");
      return;
    }

    const user = users.find((c) => c.name.toLowerCase() === name.toLowerCase());

    if (!user) {
      alert("No user found with the name: " + name);
    } else {
      setConversation(user._id);
      console.log(user.name);
      setname(""); // optional: clear input
      setSuggestions([]);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setname(value);

    if (value.length >= 1) {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (user) => {
    setConversation(user._id);
    setname("");
    setSuggestions([]);
    console.log(user.name);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex flex-col lg:flex-row items-center space-x-4">
        <input
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Search for a user"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="max-md:px-2 max-md:mt-2 px-4 max-md:py-1 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Search
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10 max-h-60 overflow-y-auto">
          {suggestions.map((user) => (
            <li
              key={user._id}
              onClick={() => handleSuggestionClick(user)}
              className="p-2 hover:bg-blue-100 cursor-pointer"
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchuser;
