import React from 'react';
import Player from './Player';  // Import the Player component

import { API_BASE_URL } from '../../services/common';

export default function ModalPlayerList({ players, selectedPlayers = [], onPlayerToggle }) {
    return (
        <div className="h-full w-auto overflow-y-scroll border rounded-md p-2 bg-gray-50">
            {players.map((player) => player.isFirstEleven === 1 && (
                <div key={player.ID} className="flex items-center space-x-2">

                    <input
                        type="checkbox"
                        id={`player-${player.ID}`}
                        checked={selectedPlayers.includes(player.ID)}
                        onChange={() => onPlayerToggle(player.ID)}
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <Player
                        photo={`${API_BASE_URL}${player.photoPath}`}
                        name={player.name}
                        number={player.number}
                    />
                </div>
            ))}
        </div>
    );
}
