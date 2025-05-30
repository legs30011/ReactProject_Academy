import React, { createContext, useState, useContext, useEffect, useRef, type ReactNode } from 'react';

// Define Notification Types (using as const object)
/**
 * @constant NotificationType
 * @description Defines the types of notifications that can be displayed.
 * Each type can correspond to different styling (e.g., color, icon).
 */
export const NotificationType = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
} as const;

// Define the type for NotificationType based on the const object
export type NotificationType = typeof NotificationType[keyof typeof NotificationType];

// Define Notification State Interface (with unique ID)
/**
 * @interface NotificationState
 * @description Represents the structure of a single notification, now including a unique ID.
 * @property {string} id - A unique identifier for the notification, crucial for managing the queue.
 * @property {string} message - The text content of the notification.
 * @property {NotificationType | undefined} type - The type of the notification, used for styling.
 */
export interface NotificationState {
  id: string;
  message: string;
  type?: NotificationType;
}

// Define Notification Context Type
/**
 * @interface NotificationContextType
 * @description Defines the shape of the context value provided by NotificationProvider.
 * @property {NotificationState[]} notifications - The current array of active notifications (the queue).
 * @property {(message: string, type?: NotificationType) => void} showNotification - Function to trigger a new notification.
 * @property {(id: string) => void} clearNotification - Function to clear a specific notification by its ID.
 */
interface NotificationContextType {
  notifications: NotificationState[];
  showNotification: (message: string, type?: NotificationType) => void;
  clearNotification: (id: string) => void;
}

// Create Notification Context
/**
 * @constant NotificationContext
 * @description The React Context object for managing notifications.
 * It provides the current notification queue and functions to manipulate it.
 */
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Create NotificationProvider Component
/**
 * @interface NotificationProviderProps
 * @description Props for the NotificationProvider component.
 * @property {ReactNode} children - The child components that will have access to the notification context.
 */
interface NotificationProviderProps {
  children: ReactNode;
}

/**
 * @function NotificationProvider
 * @description Provides the notification context to its children.
 * Manages the notification queue, including auto-clearing after a delay.
 * @param {NotificationProviderProps} { children } - React children to be rendered within the provider's scope.
 * @returns {JSX.Element} The context provider wrapping the children.
 */
export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationState[]>([]);
  const timerRefs = useRef<{ [key: string]: number }>({}); // Using number for timer IDs in browser

  /**
   * @function showNotification
   * @description Adds a new notification to the queue.
   * @param {string} message - The message content of the notification.
   * @param {NotificationType} [type] - The type of the notification (optional).
   */
  const showNotification = (message: string, type?: NotificationType) => {
    const newNotification: NotificationState = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9), // Simple unique ID
      message,
      type,
    };
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
  };

  /**
   * @function clearNotification
   * @description Clears a specific notification by its ID from the queue.
   * @param {string} id - The ID of the notification to clear.
   */
  const clearNotification = (id: string) => {
    setNotifications((prevNotifications) => prevNotifications.filter((n) => n.id !== id));
    // Clear the associated timer if it exists
    if (timerRefs.current[id]) {
      clearTimeout(timerRefs.current[id]);
      delete timerRefs.current[id];
    }
  };

  // Effect to auto-clear notifications from the queue after 3 seconds
  useEffect(() => {
    // When notifications array changes, manage timers for new/existing notifications
    notifications.forEach((notification) => {
      // Only set a timer if one doesn't already exist for this notification
      if (!timerRefs.current[notification.id]) {
        timerRefs.current[notification.id] = setTimeout(() => {
          clearNotification(notification.id);
        }, 3000); // Auto-clear after 3 seconds
      }
    });

    // Cleanup function: Clear timers for notifications that are no longer in the queue
    const currentNotificationIds = new Set(notifications.map(n => n.id));
    for (const id in timerRefs.current) {
      if (!currentNotificationIds.has(id)) {
        clearTimeout(timerRefs.current[id]);
        delete timerRefs.current[id];
      }
    }

    // Cleanup on unmount
    return () => {
      for (const id in timerRefs.current) {
        clearTimeout(timerRefs.current[id]);
      }
      timerRefs.current = {}; // Reset all timers
    };
  }, [notifications]); // Re-run effect whenever notification state changes

  const contextValue = React.useMemo(() => ({
    notifications,
    showNotification: showNotification,
    clearNotification: clearNotification,
  }), [notifications]);

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom Hook to Use Notification Context
/**
 * @function useNotification
 * @description A custom hook to conveniently access the NotificationContext.
 * @returns {NotificationContextType} The context value (notification queue and functions).
 * @throws {Error} If used outside of a NotificationProvider.
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
