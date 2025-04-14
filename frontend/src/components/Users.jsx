import React from 'react';
import { useSelectedConversation } from '../context/selectedConversationContext';
import getuser from '../hooks/getuser';
import { useSocketContext } from '../context/SocketContext';

const Users = () => {
  const { users, errorMessage } = getuser();
  const { setConversation } = useSelectedConversation(); 
  const { onlineUsers } = useSocketContext(); // Get online users from the socket context

  const handleUserClick = (userId) => {
    setConversation(userId);
  };

  return (
    <div className="space-y-2">
      {errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <ul>
          {users.length > 0 ? (
            users.map((user) => {
              const isOnline = onlineUsers.includes(user._id);
              return (
                <li
                  key={user._id}
                  onClick={() => handleUserClick(user._id)}
                  className="p-2 cursor-pointer rounded-lg hover:bg-gray-100 flex justify-between items-center"
                >
                  <span>{user.name}</span>
                  <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
                </li>
              );
            })
          ) : (
            <p className="text-center text-gray-400">No users found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Users;
