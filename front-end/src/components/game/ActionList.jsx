import Action from './Action';
import { BellIcon as Ball, Flag, BellIcon as Whistle, RotateCcw, UserPlus, UserMinus } from 'lucide-react';
import { useState } from 'react';

const actions = [
    { type: 1, icon: <Ball className="w-6 h-6" /> },
    { type: 2, icon: <Flag className="w-6 h-6" /> },
    { type: 3, icon: <Whistle className="w-6 h-6" /> },
    { type: 4, icon: <RotateCcw className="w-6 h-6" /> },
    { type: 5, icon: <UserPlus className="w-6 h-6" /> },
    { type: 6, icon: <UserMinus className="w-6 h-6" /> },
];

export default function ActionList({ onActionSubmit, actions }) {
    const [selectedAction, setSelectedAction] = useState(null);

    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Match Actions</h1>
                <div className="flex space-x-4">
                    {actions?.map((action) => (
                        <Action
                            key={action.ID}
                            hasArea={action.hasArea}
                            hasPlayer1={action.hasPlayer1}
                            hasPlayer2={action.hasPlayer2}
                            logo={action.logo}
                            name={action.name}
                            onActionSubmit={onActionSubmit}
                            setSelectedAction={setSelectedAction}
                        />
                    ))}
                </div>
            </div>
        </header>
    );
}
