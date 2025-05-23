import React from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const fetchUsersCached = React.cache(async (): Promise<User[]> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error: any) {
    console.error("Error fetching users:", error);
    throw error; // Re-throw the error so Suspense knows the Promise failed
  }
});

// no se que pero esto soluciono xd
const usersPromise = fetchUsersCached();

const UserListWithUse: React.FC = () => {
  console.log("UserListWithUse rendered");
  const users = React.use(usersPromise);

  return (
    <div>
      <h2>User List (using use Function)</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.username}) - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserListWithUse;

