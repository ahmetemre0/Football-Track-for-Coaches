import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import FootballPitch from '../components/game/FootballPitch';
import PlayerList from '../components/game/PlayerList';
import ActionList from '../components/game/ActionList';
import ActionModal from '../components/game/ActionModal';
import Stopwatch from '../components/game/Stopwatch';
import { getActions, getSquad, sendAction } from '../services/game';
import HistoryBoard from '../components/game/HistoryBoard';

import { getHistory } from '../services/game';


const Game = () => {
    const location = useLocation(); // Get the state passed during navigation
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [homeTeam, setHomeTeam] = useState(null);
    const [awayTeam, setAwayTeam] = useState(null);
    const [actions, setActions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);

    const [totalSeconds, setTotalSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editableMinutes, setEditableMinutes] = useState(0);
    const [editableSeconds, setEditableSeconds] = useState(0);

    const [actionTime, setActionTime] = useState(null);
    const [updateHistory, setUpdateHistory] = useState(false);
    const [history, setHistory] = useState(null);

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
        console.log('Action data:', actionData);

        if (actionData.actionTypeID === 13) {
            // Identify the team to update
            const teamToUpdate = actionData.actionTeamID === selectedMatch.homeTeamID ? homeTeam : awayTeam;
            const setTeamState = actionData.actionTeamID === selectedMatch.homeTeamID ? setHomeTeam : setAwayTeam;

            console.log('Team to update:', teamToUpdate);
            // Update the `isFirstEleven` field for both players
            const updatedTeam = teamToUpdate.map(player => {
                if (player.ID === actionData.actionPlayer1ID || player.ID === actionData.actionPlayer2ID) {
                    return { ...player, inMatch: !player.inMatch };
                }
                return player;
            });

            console.log('Updated team:', updatedTeam);

            // Update the state with the modified team
            setTeamState(updatedTeam);
        }

        // Submit the action to the server
        const data = await sendAction(actionData, selectedMatch.matchID);
        console.log('Action Submitted:', data);

        // Update the history to reflect the new action
        setUpdateHistory(!updateHistory);
    };


    useEffect(() => {
        if (selectedMatch) {
            getHistory(selectedMatch.matchID)
                .then((data) => setHistory(data))
                .catch((error) => console.error(error));
        }
        console.log('History:', history);
    }
        , [selectedMatch, updateHistory]);

    useEffect(() => {
        if (history && history.length > 0 && actionTime === null) {
            const lastAction = history[history.length - 1];
            setActionTime({
                minutes: lastAction.minutes,
                seconds: lastAction.seconds
            });
            setTotalSeconds(lastAction.minutes * 60 + lastAction.seconds);
        }
    }, [history]);




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

            <div className="flex items-center justify-between ">
                <PlayerList players={homeTeam} teamName={selectedMatch?.homeTeamName} />
                <div>
                    <FootballPitch
                        actions={actions}
                        match={selectedMatch}
                        homeTeam={homeTeam}
                        awayTeam={awayTeam}
                        onActionSubmit={handleActionSubmit}
                        currentTime={actionTime}
                        setIsPitchModalOpen={setIsPitchModalOpen}
                    />
                    <HistoryBoard history={history} homeTeam={homeTeam} awayTeam={awayTeam} actions={actions} />
                </div>
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

        </main>
    );
};

export default Game;
