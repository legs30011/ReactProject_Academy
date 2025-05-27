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
      <h2>User List</h2>
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


/*entonces resuemn En React 19, la 
diferencia clave entre el uso de use 
y otros Hooks como useEffect radica en su 
flexibilidad y propósito. use permite acceder a 
valores de **Promesas o Contextos de forma integrada** en 
la lógica de renderizado, mientras que useEffect se enfoca 
en manejar efectos secundarios como las solicitudes de datos. */

