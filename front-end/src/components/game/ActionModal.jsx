import React, { useEffect, useState } from 'react';
import ModalPlayerList from './ModalPlayerList';

export default function ActionModal({ isPositional, actions, match, homeTeam, awayTeam, onClose, onActionSubmit, selection, currentTime }) {
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    const handlePlayerToggle = (playerId) => {
        setSelectedPlayers((prev) =>
            prev.includes(playerId)
                ? prev.filter((id) => id !== playerId)
                : [...prev, playerId].slice(0, 2)
        );
    };

    const handleSubmit = () => {
        const actionData = {
            actionTypeID: selectedAction.ID,
            actionTeamID: selectedTeam,
            actionPlayer1ID: selectedPlayers[0],
            actionPlayer2ID: selectedPlayers[1],
            minutes: currentTime?.minutes,
            seconds: currentTime?.seconds,
        };
        onActionSubmit(actionData);
        onClose();
    };

    useEffect(() => {
        if (selection) {
            setSelectedAction(selection);
        }
    }, [selection]);

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full md:w-3/4 lg:w-1/2 max-h-[66vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Match Action</h2>

            {/* Action Selection */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
                <select
                    defaultValue={actions?.find((action) => action.name === selection?.name)?.ID || ''}
                    onChange={(e) => {
                        const selectedID = parseInt(e.target.value, 10);
                        const filteredAction = actions?.find((action) => action.ID === selectedID);
                        setSelectedAction(filteredAction);
                    }}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 text-sm"
                >
                    <option value="" disabled>
                        Select an action...
                    </option>
                    {actions?.map((action) =>
                        (isPositional ? action.hasArea === 1 : action.hasArea === 0) && (
                            <option key={action.ID} value={action.ID}>
                                {action.name}
                            </option>
                        )
                    )}
                </select>
            </div>

            {/* Team Selection */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Team</label>
                <select
                    value={selectedTeam || ''}
                    onChange={(e) => setSelectedTeam(parseInt(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 text-sm"
                >
                    <option value="" disabled>
                        Select a team...
                    </option>
                    <option value={match?.homeTeamID}>
                        {match?.homeTeamName}
                    </option>
                    <option value={match?.awayTeamID}>
                        {match?.awayTeamName}
                    </option>
                </select>
            </div>

            {/* Players List (only if a team is selected) */}
            {selectedTeam && selectedAction?.name === 'Substitution' && (
                <>
                    <div className="mb-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Players Out</label>
                            <ModalPlayerList
                                players={selectedTeam === match.homeTeamID ? homeTeam : awayTeam}
                                selectedPlayers={selectedPlayers}
                                onPlayerToggle={handlePlayerToggle}
                                inMatch={1} // Filter players who are in the starting eleven
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Players In</label>
                            <ModalPlayerList
                                players={selectedTeam === match.homeTeamID ? homeTeam : awayTeam}
                                selectedPlayers={selectedPlayers}
                                onPlayerToggle={handlePlayerToggle}
                                inMatch={0} // Filter players who are not in the starting eleven
                            />
                        </div>
                    </div>

                </>
            )}

            {/* Single Player List for Other Actions */}
            {selectedTeam && selectedAction?.name !== 'Substitution' && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Players</label>
                    <ModalPlayerList
                        players={selectedTeam === match.homeTeamID ? homeTeam : awayTeam}
                        selectedPlayers={selectedPlayers}
                        onPlayerToggle={handlePlayerToggle}
                        isFirstEleven={1} // Pass null or remove the prop to skip filtering
                    />
                </div>
            )}

            {/* Submit & Cancel Buttons */}
            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={!selectedAction || !selectedTeam || selectedPlayers.length === 0}
                    className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
