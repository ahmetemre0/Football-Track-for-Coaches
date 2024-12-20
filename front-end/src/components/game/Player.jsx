import React from 'react';

const Player = ({ photo, name, number }) => {
    return (
        <div className="flex justify-between w-full items-center space-x-4 p-2 border-b border-gray-200 last:border-b-0 transition duration-200 ease-in-out">
            <div className="relative w-5 h-5 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
                <img
                    src={photo}
                    alt={`${name}`}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            </div>
            <div className="text-xl font-bold text-gray-600 flex-shrink-0">#{number}</div>
        </div>

    );
};

export default Player;
