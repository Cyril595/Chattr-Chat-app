import React from 'react';
import { useSelectedConversation } from '../context/selectedConversationContext';
import getuser from '../hooks/getuser';

const Users = () => {
  const { users, errorMessage } = getuser();
  const { setConversation } = useSelectedConversation(); 

  const handleUserClick = (userId) => {
    console.log("clicked1");
    setConversation(userId); // Set the clicked user ID as the selected conversation
  };

  return (
    <div className="space-y-2">
      {errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <ul>
          {users.length > 0 ? (
            users.map((user) => (
              <li
                key={user._id}
                onClick={() => handleUserClick(user._id)}
                className="p-2 cursor-pointer rounded-lg hover:bg-gray-100"
              >
                {user.name}
              </li>
            ))
          ) : (
            <p className="text-center text-gray-400">No users found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Users;
