import { useEffect, useRef, useState } from 'react';
import { useLocation } from "react-router-dom";
import FootballPitch from '../components/game/FootballPitch';
import PlayerList from '../components/game/PlayerList';
import ActionList from '../components/game/ActionList';
import ActionModal from '../components/game/ActionModal';
import Stopwatch from '../components/game/Stopwatch';
import { getActions, getSquad, sendAction } from '../services/game';
import { useStopwatch } from 'react-timer-hook';


const Game = () => {
    const location = useLocation(); // Get the state passed during navigation
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [homeTeam, setHomeTeam] = useState(null);
    const [awayTeam, setAwayTeam] = useState(null);
    const [actions, setActions] = useState([]);
    const [lastAction, setLastAction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);

    const [totalSeconds, setTotalSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editableMinutes, setEditableMinutes] = useState(0);
    const [editableSeconds, setEditableSeconds] = useState(0);

    const [actionTime, setActionTime] = useState(null);

    useEffect(() => {
        console.log(isPitchModalOpen)
        if (isModalOpen || isPitchModalOpen) {
            setActionTime({
                minutes: Math.floor(totalSeconds / 60),
                seconds: totalSeconds % 60
            });
            console.log('Action Time:', actionTime);
        }
    }, [isModalOpen, isPitchModalOpen]);


    useEffect(() => {
        if (location.state) {
            setSelectedMatch(location.state.selectedMatch);
        }
    }, [location]);



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


    const handleActionClick = (action) => {
        setSelectedAction(action); // Set the selected action
        console.log('action:', action);
        console.log('selectedAction:', selectedAction);
        setIsModalOpen(true); // Open modal
    };

    const handleActionSubmit = async (actionData) => {
        // Perform final processing, such as sending the data to the server
        console.log('Action data:', actionData);
        const data = await sendAction(actionData, selectedMatch.matchID);
        console.log('Action Submitted:', data);
    }

    return (
        <main>

            <Stopwatch totalSeconds={totalSeconds}
                setTotalSeconds={setTotalSeconds}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                editMode={editMode}
                setEditMode={setEditMode}
                editableMinutes={editableMinutes}
                setEditableMinutes={setEditableMinutes}
                editableSeconds={editableSeconds}
                setEditableSeconds={setEditableSeconds}

            />
            <ActionList onActionClick={handleActionClick} actions={actions} />

            <div className="flex h-[500px] items-center justify-between ">
                <PlayerList players={homeTeam} teamName={selectedMatch?.homeTeamName} />
                <FootballPitch
                    actions={actions}
                    match={selectedMatch}
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                    onActionSubmit={handleActionSubmit}
                    currentTime={actionTime}
                    setIsPitchModalOpen={setIsPitchModalOpen}
                />
                <PlayerList players={awayTeam} teamName={selectedMatch?.awayTeamName} />
            </div>

            {/* Modal */}
            {isModalOpen && (
                <ActionModal
                    isPositional={false}
                    actions={actions}
                    match={selectedMatch}
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                    onClose={() => setIsModalOpen(false)}
                    onActionSubmit={handleActionSubmit}
                    selection={selectedAction}  // Pass selected action to modal
                    currentTime={actionTime}
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
