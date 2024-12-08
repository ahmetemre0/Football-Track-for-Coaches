import React from 'react';
import Player from './Player';  // Import the Player component

export default function PlayerList({ players, selectedPlayers = [], onPlayerToggle, isSelectable = false }) {
    return (
        <div className="h-full w-[500px] overflow-y-auto border rounded-md bg-gray-50">
            {players.map((player) => (
                <div key={player.id} className="flex items-center space-x-2">
                    {isSelectable ? (
                        <>
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
                        </>
                    ) : (
                        <Player
                            photo={player.photo}
                            name={player.name}
                            number={player.number}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
