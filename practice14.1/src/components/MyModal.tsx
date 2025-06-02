import React from 'react';

interface MyModalProps {
  onClose: () => void;
  content?: string;
}

const MyModal: React.FC<MyModalProps> = ({ onClose, content = "Default Modal Content" }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-md p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Modal</h2>
        <p className="mb-4">{content}</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyModal;