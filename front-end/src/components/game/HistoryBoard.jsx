import React from 'react';
import { API_BASE_URL } from '../../services/common';

const HistoryBoard = ({ history, homeTeam, awayTeam, actions }) => {
    // Function to get player name by ID from homeTeam and awayTeam
    const getPlayerName = (playerID) => {
        const player = homeTeam?.find(player => player.ID === playerID) ||
            awayTeam?.find(player => player.ID === playerID);
        return player ? player.name : 'Unknown Player';
    };


    const getActionLogo = (actionID) => {
        const action = actions?.find(action => action.ID === actionID);
        return action ? `${API_BASE_URL}/${action.logo}` : '';
    }

    return (
        <div className='border p-2 overflow-auto h-40'>
            {history?.map((h, i) => (
                <div key={i} className='border p-2'>
                    <div className='flex'>
                        {h.minutes}:{h.seconds} -  <img className='h-10 w-10' src={getActionLogo(h.actionTypeID)} alt="" />  - {getPlayerName(h.actionPlayer1ID)}
                        {h.actionPlayer2ID ? ` (${getPlayerName(h.actionPlayer2ID)})` : ''}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HistoryBoard;
