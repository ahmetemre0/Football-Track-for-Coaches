import Action from './Action'
import { BellIcon as Ball, Flag, BellIcon as Whistle, RotateCcw, UserPlus, UserMinus } from 'lucide-react'

const actions = [
    { type: 1, icon: <Ball className="w-6 h-6" /> },
    { type: 2, icon: <Flag className="w-6 h-6" /> },
    { type: 3, icon: <Whistle className="w-6 h-6" /> },
    { type: 4, icon: <RotateCcw className="w-6 h-6" /> },
    { type: 5, icon: <UserPlus className="w-6 h-6" /> },
    { type: 6, icon: <UserMinus className="w-6 h-6" /> },
]

export default function ActionList({ onActionSubmit, setSelectedAction }) {
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Match Actions</h1>
                <div className="flex space-x-4">
                    {actions.map((action) => (
                        <Action
                            key={action.type}
                            icon={action.icon}
                            actionType={action.type}
                            onActionSubmit={onActionSubmit}
                            setSelectedAction={setSelectedAction} // Pass setSelectedAction to Action
                        />
                    ))}
                </div>
            </div>
        </header>
    )
}
