import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import FootballPitch from '../components/game/FootballPitch';
import PlayerList from '../components/game/PlayerList';
import ActionList from '../components/game/ActionList';
import ActionModal from '../components/game/ActionModal';
import { getActions, getSquad } from '../services/game';


const Game = () => {
    const location = useLocation(); // Get the state passed during navigation
    const { selectedMatch } = location.state || {}; // Retrieve match data
    const [homeTeam, setHomeTeam] = useState(null);
    const [awayTeam, setAwayTeam] = useState(null);
    const [actions, setActions] = useState([]);



    useEffect(() => {
        if (selectedMatch) {
            getSquad(selectedMatch.homeTeamID, selectedMatch.matchID)
                .then((data) => setHomeTeam(data))
                .catch((error) => console.error(error));

            getSquad(selectedMatch.awayTeamID, selectedMatch.matchID)
                .then((data) => setAwayTeam(data))
                .catch((error) => console.error(error));
            getActions()
                .then((data) => setActions(data))
                .catch((error) => console.error(error));
        }
    }, [selectedMatch]);



    console.log('Selected Match:', selectedMatch);
    console.log('Actions:', actions);

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
            <ActionList onActionClick={handleActionClick} actions={actions} />

            <div className="flex h-[500px] items-center justify-between ">
                <PlayerList players={homeTeam} />
                <FootballPitch actions={actions} match={selectedMatch} homeTeam={homeTeam} awayTeam={awayTeam} onClick={handlePitchClick} />
                <PlayerList players={awayTeam} />
            </div>

            {/* Modal */}
            {isModalOpen && (
                <ActionModal
                    actions={actions}
                    match={selectedMatch}
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
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
