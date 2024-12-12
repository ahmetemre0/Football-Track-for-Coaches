import { useState } from 'react';
import ActionModal from './ActionModal';

export default function Action({ icon, actionType, onActionSubmit, setSelectedAction }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleActionClick = () => {
        setSelectedAction(actionType); // Set the selected action type
        setIsModalOpen(true); // Open the modal
    };

    const handleModalClose = () => {
        setIsModalOpen(false); // Close the modal
    };

    const handleSubmit = (data) => {
        onActionSubmit({ ...data, actionTypeID: actionType }); // Submit the data
        setIsModalOpen(false); // Close the modal
    };

    return (
        <>
            {/* Action Button */}
            <button
                onClick={handleActionClick}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                {icon}
            </button>

            {/* Render Modal if Open */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                    <ActionModal
                        onClose={handleModalClose}
                        onSubmit={handleSubmit}
                    />
                </div>
            )}
        </>
    );
}
