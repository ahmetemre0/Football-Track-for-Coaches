import { useState } from 'react'
import { Dialog } from '@radix-ui/react-dialog'
import ActionModal from './ActionModal'

export default function Action({ icon, actionType, onActionSubmit, setSelectedAction }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleActionClick = () => {
        setSelectedAction(actionType); // Set the selected action type
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleSubmit = (data) => {
        onActionSubmit({ ...data, actionTypeID: actionType })
        setIsModalOpen(false)
    }

    return (
        <>
            <button
                onClick={handleActionClick}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                {icon}
            </button>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <ActionModal onClose={handleModalClose} onSubmit={handleSubmit} selectedAction={actionType} />
            </Dialog>
        </>
    )
}
