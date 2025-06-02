import React from 'react';
import { useNotification, NotificationType } from '../context/NotificationContext';

interface TriggerButtonProps {
  message: string;
  type?: NotificationType;
  label: string;
}

const TriggerButton: React.FC<TriggerButtonProps> = ({ message, type, label }) => {
  const { showNotification } = useNotification();

  const handleClick = () => {
    showNotification(message, type);
  };

  return (
    <button onClick={handleClick}>{label}</button>
  );
};

export default TriggerButton;