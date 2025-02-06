import React from 'react';
import Searchuser from './Searchuser';
import Users from './Users';

const Sidebar = () => {
  return (
    <div className="w-[30%] bg-white shadow-lg p-6 flex flex-col space-y-4">
      {/* Search user */}
      <Searchuser />

      {/* Users list */}
      <div className="flex-1 overflow-y-auto">
        <Users />
      </div>
    </div>
  );
};

export default Sidebar;
