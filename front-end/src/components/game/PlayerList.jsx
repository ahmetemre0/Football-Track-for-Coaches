import React from 'react';
import Player from './Player';  // Import the Player component

export default function PlayerList({ players }) {
    return (
        <div className="h-full w-[500px] overflow-y-auto border rounded-md bg-gray-50">
            {players?.map((player) => (
                <div key={player.id} className="flex items-center space-x-2">
                    <Player
                        key={player.id}
                        photo={player.photoPath}
                        name={player.name}
                        number={player.number}
                    />
                </div>
            ))}
        </div>
    );
}
