import React from 'react';
import { useNotification, NotificationType } from '../context/NotificationContext'; // Import from context

/**
 * @interface TriggerButtonProps
 * @description Props for the TriggerButton component.
 * @property {string} message - The message to display when the button is clicked.
 * @property {NotificationType} [type] - The type of notification to trigger (optional).
 * @property {string} label - The text displayed on the button.
 */
interface TriggerButtonProps {
  message: string;
  type?: NotificationType;
  label: string;
}

/**
 * @function TriggerButton
 * @description A reusable button component that triggers a notification when clicked.
 * @param {TriggerButtonProps} { message, type, label } - Props for the button.
 * @returns {JSX.Element} The button element.
 */
const TriggerButton: React.FC<TriggerButtonProps> = React.memo(({ message, type, label }) => {
  const { showNotification } = useNotification();

  // Using useCallback to memoize the click handler, preventing unnecessary re-renders
  const handleClick = React.useCallback(() => {
    showNotification(message, type);
  }, [showNotification, message, type]);

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md
        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        transition-colors duration-200"
    >
      {label}
    </button>
  );
});

export default TriggerButton;
