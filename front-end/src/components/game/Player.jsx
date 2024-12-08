import React from 'react'

const Player = ({ photo, name, number }) => {
    //foto ad soyad numara
    return (
        <div className="flex items-center space-x-4 p-4 border-b border-gray-200 last:border-b-0">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <img
                    src={photo}
                    alt={`${name}`}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-semibold">{name}</h3>
            </div>
            <div className="text-xl font-bold text-gray-500">#{number}</div>
        </div>
    )
}

export default Player
