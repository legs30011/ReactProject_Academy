import React from 'react';

interface UserCardProps {
  name: string;
  age: number;
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ name, age, onClick }) => {
const handleClick = () => {
onClick();
alert(`Hello, ${name}!`);
};

return (
<div style={{ border: '1px solid black', padding: '10px', margin: '10px', cursor: 'pointer' }} onClick={handleClick}>
    <h3>{name}</h3>
    <p>Age: {age}</p>
</div>
);
};

export default UserCard;