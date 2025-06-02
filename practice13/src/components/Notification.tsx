import React from 'react';
import { useNotification, NotificationType } from '../context/NotificationContext';

const Notification: React.FC = () => {
  const { notifications, clearNotification } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full p-4 flex flex-col items-center space-y-2">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`p-4 rounded-md shadow-md flex items-center justify-between w-full max-w-md`}
          style={{
            backgroundColor:
              notif.type === NotificationType.SUCCESS ? '#d4edda' :
              notif.type === NotificationType.ERROR ? '#f8d7da' :
              notif.type === NotificationType.INFO ? '#cce5ff' :
              notif.type === NotificationType.WARNING ? '#fff3cd' :
              '#f0f0f0',
            color:
              notif.type === NotificationType.SUCCESS ? '#155724' :
              notif.type === NotificationType.ERROR ? '#721c24' :
              notif.type === NotificationType.INFO ? '#0c5460' :
              notif.type === NotificationType.WARNING ? '#856404' :
              '#333',
          }}
        >
          <span>{notif.message}</span>
          <button onClick={() => clearNotification(notif.id)} className="ml-2 text-gray-500 hover:text-gray-700">
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;