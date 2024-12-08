import { useState } from 'react';
import FootballPitch from '../components/game/FootballPitch';
import PlayerList from '../components/game/PlayerList';
import ActionList from '../components/game/ActionList';
import ActionModal from '../components/game/ActionModal';

const teams = [
    {
        id: 1,
        name: 'Team 1',
        players: [
            { id: 101, name: 'Player 1', photo: 'player1.jpg' },
            { id: 102, name: 'Player 2', photo: 'player2.jpg' },
            { id: 103, name: 'Player 3', photo: 'player3.jpg' },
            { id: 104, name: 'Player 4', photo: 'player4.jpg' },
            { id: 105, name: 'Player 5', photo: 'player5.jpg' },
            { id: 106, name: 'Player 6', photo: 'player6.jpg' },
            { id: 107, name: 'Player 7', photo: 'player7.jpg' },
            { id: 108, name: 'Player 8', photo: 'player8.jpg' },
            { id: 109, name: 'Player 9', photo: 'player9.jpg' },
            { id: 110, name: 'Player 10', photo: 'player10.jpg' },
            { id: 111, name: 'Player 11', photo: 'player11.jpg' },
        ],
    },
    {
        id: 2,
        name: 'Team 2',
        players: [
            { id: 201, name: 'Player 1', photo: 'player1.jpg' },
            { id: 202, name: 'Player 2', photo: 'player2.jpg' },
            { id: 203, name: 'Player 3', photo: 'player3.jpg' },
            { id: 204, name: 'Player 4', photo: 'player4.jpg' },
            { id: 205, name: 'Player 5', photo: 'player5.jpg' },
            { id: 206, name: 'Player 6', photo: 'player6.jpg' },
            { id: 207, name: 'Player 7', photo: 'player7.jpg' },
            { id: 208, name: 'Player 8', photo: 'player8.jpg' },
            { id: 209, name: 'Player 9', photo: 'player9.jpg' },
            { id: 210, name: 'Player 10', photo: 'player10.jpg' },
            { id: 211, name: 'Player 11', photo: 'player11.jpg' },
        ],
    },
];

const Game = () => {
    const [lastAction, setLastAction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null); // Ensure this is correctly set

    const handleActionClick = (action) => {
        setSelectedAction(action); // Set the selected action
        setIsModalOpen(true); // Open modal
    };

    const handleActionSubmit = (actionData) => {
        console.log('Action submitted:', actionData);
        setLastAction(actionData);
        setIsModalOpen(false); // Close modal after submitting
    };

    const handlePitchClick = (coords) => {
        if (lastAction) {
            const updatedAction = {
                ...lastAction,
                actionPointX: Math.round(coords.x * 100), // Convert to percentage
                actionPointY: Math.round(coords.y * 100), // Convert to percentage
            };
            console.log('Updated action with coordinates:', updatedAction);
            setLastAction(null); // Reset after setting coordinates
        }
    };

    return (
        <main>
            {/* Action List Component */}
            <ActionList onActionClick={handleActionClick} setSelectedAction={setSelectedAction} />

            <div className="flex h-[500px] items-center justify-between ">
                <PlayerList players={teams[0].players} />
                <FootballPitch onClick={handlePitchClick} />
                <PlayerList players={teams[1].players} />
            </div>

            {/* Modal */}
            {isModalOpen && (
                <ActionModal
                    onClose={() => setIsModalOpen(false)}
                    onActionSubmit={handleActionSubmit}
                    selectedAction={selectedAction}  // Pass selected action to modal
                />
            )}

            {/* Notification for setting coordinates */}
            {lastAction && (
                <div className="fixed bottom-4 right-4 bg-yellow-100 p-4 rounded-md shadow-md">
                    <p className="text-sm">Click on the pitch to set action coordinates</p>
                </div>
            )}
        </main>
    );
};

export default Game;
