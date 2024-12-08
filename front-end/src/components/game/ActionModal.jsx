import React, { useState } from 'react';
import ModalPlayerList from './ModalPlayerList';

const actions = [
    { id: 1, name: 'Goal' },
    { id: 2, name: 'Penalty' },
    { id: 3, name: 'Freekick' },
];

const teams = [
    { id: 1, name: 'Team A' },
    { id: 2, name: 'Team B' },
];

const players = [
    { id: 1, name: 'Player 1', teamId: 1 },
    { id: 2, name: 'Player 2', teamId: 1 },
    { id: 3, name: 'Player 3', teamId: 2 },
    { id: 4, name: 'Player 4', teamId: 2 },
];

export default function ActionModal({ onClose, onSubmit }) {
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
        onSubmit({
            actionId: selectedAction,
            teamId: selectedTeam,
            players: selectedPlayers,
        });
    };

    const filteredPlayers = players.filter((player) => player.teamId === selectedTeam);

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full md:w-3/4 lg:w-1/2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Match Action</h2>

            {/* Action Selection */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
                <select
                    value={selectedAction || ''}
                    onChange={(e) => setSelectedAction(parseInt(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 text-sm"
                >
                    <option value="" disabled>
                        Select an action...
                    </option>
                    {actions.map((action) => (
                        <option key={action.id} value={action.id}>
                            {action.name}
                        </option>
                    ))}
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
                    {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                            {team.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Players List (only if a team is selected) */}
            {selectedTeam && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Players</label>
                    <ModalPlayerList
                        players={filteredPlayers}
                        selectedPlayers={selectedPlayers}
                        onPlayerToggle={handlePlayerToggle}
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
