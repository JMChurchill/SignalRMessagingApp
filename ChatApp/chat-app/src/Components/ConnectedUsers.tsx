import React from "react";

type ConnectedUsersProps = {
  users: string[];
};
const ConnectedUsers = ({ users }: ConnectedUsersProps) => {
  console.log(users);

  return (
    <div className="p-4 border-gray-200 border-2 rounded-md">
      <h3>Users</h3>
      {users.map((user, i) => (
        <p key={i}>{user}</p>
      ))}
    </div>
  );
};

export default ConnectedUsers;
