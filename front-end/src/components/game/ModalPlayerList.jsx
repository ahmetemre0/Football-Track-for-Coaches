import React from 'react';
import Player from './Player';  // Import the Player component

export default function ModalPlayerList({ players, selectedPlayers = [], onPlayerToggle }) {
    return (
        <div className="h-full w-auto overflow-y-auto border rounded-md p-2 bg-gray-50">
            {players.map((player) => (
                <div key={player.id} className="flex items-center space-x-2 py-2">

                    <input
                        type="checkbox"
                        id={`player-${player.id}`}
                        checked={selectedPlayers.includes(player.id)}
                        onChange={() => onPlayerToggle(player.id)}
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <Player
                        photo={player.photo}
                        name={player.name}
                        number={player.number}
                    />
                </div>
            ))}
        </div>
    );
}
