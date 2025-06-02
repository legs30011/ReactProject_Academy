import React, { createContext, useState, useContext, useEffect } from 'react';

export const NotificationType = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
} as const;
export type NotificationType = typeof NotificationType[keyof typeof NotificationType];

interface NotificationState {
  id: string;
  message: string;
  type?: NotificationType;
}

interface NotificationContextType {
  notifications: NotificationState[];
  showNotification: (message: string, type?: NotificationType) => void;
  clearNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationState[]>([]);

  const showNotification = (message: string, type?: NotificationType) => {
    const id = Date.now().toString();
    const newNotification = { id, message, type };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        if (notifications.length > 0) {
          // Auto-remove the oldest notification
          setNotifications((prev) => prev.slice(1));
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const value = {
    notifications,
    showNotification,
    clearNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};