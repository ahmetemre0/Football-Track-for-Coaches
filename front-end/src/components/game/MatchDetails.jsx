import React, { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import ActionModal from './ActionModal'; // Assuming ActionModal component is in a separate file

const MatchDetails = ({ selectedMatch, homeTeam, awayTeam, actions, sendAction, onActionSubmit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);

    const {
        totalSeconds,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: true });

    const handleActionClick = (action) => {
        setSelectedAction({
            ...action,
            time: {
                minutes: Math.floor(totalSeconds / 60),
                seconds: totalSeconds % 60
            }
        });
        setIsModalOpen(true);
    };

    const handleActionSubmit = async (actionData) => {
        const dataWithTime = {
            ...actionData,
            time: {
                minutes: Math.floor(totalSeconds / 60),
                seconds: totalSeconds % 60
            }
        };
        console.log('Action data:', dataWithTime);
        const data = await sendAction(dataWithTime, selectedMatch.matchID);
        console.log('Action Submitted:', data);
    };

    return (
        <div>
            {/* Match details display */}
            <button onClick={() => handleActionClick({ type: 'Goal', team: 'Home' })}>Home Goal</button>
            <button onClick={() => handleActionClick({ type: 'Goal', team: 'Away' })}>Away Goal</button>
            <button onClick={() => handleActionClick({ type: 'Yellow Card', team: 'Home', player: 'Player A' })}>Home Yellow Card</button>
            <button onClick={() => handleActionClick({ type: 'Red Card', team: 'Away', player: 'Player B' })}>Away Red Card</button>

            <ActionModal
                isPositional={false}
                actions={actions}
                match={selectedMatch}
                homeTeam={homeTeam}
                awayTeam={awayTeam}
                onClose={() => setIsModalOpen(false)}
                onActionSubmit={onActionSubmit}
                selection={selectedAction}
                currentTime={{
                    minutes: Math.floor(totalSeconds / 60),
                    seconds: totalSeconds % 60
                }}
            />
        </div>
    );
};

export default MatchDetails;

