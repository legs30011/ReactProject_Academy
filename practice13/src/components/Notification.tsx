import React from 'react';
import { createPortal } from 'react-dom';
import { useNotification, NotificationType, type NotificationState } from '../context/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationItemProps {
  notification: NotificationState;
  onDismiss: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onDismiss }) => {
  let bgColor = 'bg-blue-500';
  let textColor = 'text-white';
  let icon = 'ℹ️';

  switch (notification.type) {
    case NotificationType.SUCCESS:
      bgColor = 'bg-green-500';
      icon = '✅';
      break;
    case NotificationType.ERROR:
      bgColor = 'bg-red-500';
      icon = '❌';
      break;
    case NotificationType.WARNING:
      bgColor = 'bg-yellow-500';
      textColor = 'text-gray-900';
      icon = '⚠️';
      break;
    case NotificationType.INFO:
    default:
      bgColor = 'bg-blue-500';
      icon = 'ℹ️';
      break;
  }

  const animationPresets = {
    initial: { opacity: 0, y: -50, scale: 0.8 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
    exit: { opacity: 0, y: -50, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      key={notification.id}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 p-4 rounded-lg shadow-lg flex items-center justify-between space-x-4
                  ${bgColor} ${textColor}`}
      style={{ minWidth: '250px', maxWidth: '90%' }}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animationPresets}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-center space-x-2">
        <span className="text-xl" aria-hidden="true">{icon}</span>
        <p className="font-semibold text-sm sm:text-base">{notification.message}</p>
      </div>
      <button
        onClick={() => onDismiss(notification.id)}
        className="ml-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-colors duration-200"
        aria-label="Dismiss notification"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
};

const Notification: React.FC = () => {
  const { notifications, clearNotification } = useNotification();

  return createPortal(
    <AnimatePresence>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onDismiss={clearNotification}
        />
      ))}
    </AnimatePresence>,
    document.body
  );
};

export default Notification;
