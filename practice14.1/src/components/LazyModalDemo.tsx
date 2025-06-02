import React, { useState, lazy, Suspense } from "react";

// Lazy load the MyModal component
const MyModal = lazy(() => import("./MyModal"));

const LazyModalDemo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => {
setIsModalOpen(true);
};

const closeModal = () => {
setIsModalOpen(false);
};

return (
<div className="bg-gray-100 p-6 rounded-md shadow-md">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
    Lazy Loaded Modal
    </h2>
    <button
    onClick={openModal}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
    Open Modal
    </button>

    <Suspense fallback={<div className="mt-4">Loading modal...</div>}>
    {isModalOpen && (
        <MyModal
        onClose={closeModal}
        content="This content is passed as a prop!"
        />
    )}
    </Suspense>
</div>
);
};

export default LazyModalDemo;
