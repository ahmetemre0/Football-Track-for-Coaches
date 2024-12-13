import React from 'react';
import Player from './Player';  // Import the Player component

import { API_BASE_URL } from "../../services/common";

export default function PlayerList({ players, teamName }) {
    return (
        <div className="h-full w-[500px] overflow-y-auto border rounded-md bg-gray-50">
            <h2 className="text-lg flex justify-center items-center text-gray-900 mb-4 text-center uppercase bg-slate-200 h-10 my-auto font-bold">{teamName}</h2>
            {players?.map((player) => player.isFirstEleven === 1 && (
                <div key={player.ID} className="flex items-center space-x-2">
                    <Player
                        key={player.ID}
                        photo={`${API_BASE_URL}${player.photoPath}`}
                        name={player.name}
                        number={player.number}
                    />
                </div>
            ))}
            <hr />
            {players?.map((player) => player.isFirstEleven === 0 && (
                <div key={player.ID} className="flex items-center space-x-2 bg-slate-400">
                    <Player
                        key={player.ID}
                        photo={`${API_BASE_URL}${player.photoPath}`}
                        name={player.name}
                        number={player.number}
                    />
                </div>
            ))}
        </div>
    );
}
