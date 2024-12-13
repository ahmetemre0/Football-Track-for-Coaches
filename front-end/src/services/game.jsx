import axios from 'axios';

import { API_BASE_URL, handleResponse } from './common';
import { act } from 'react';

axios.defaults.validateStatus = function (status) { return true; }

const getActions = async () => {
    const response = await axios.get(`${API_BASE_URL}/action/`);
    return handleResponse(response)?.actions;
}
///team/{teamid}/{matchid}/squad 

const getSquad = async (teamID, matchID) => {
    const response = await axios.get(`${API_BASE_URL}/team/${teamID}/${matchID}/squad`);
    return handleResponse(response)?.squad;
}

const sendAction = async (actionData, matchID) => {
    const response = await axios.post(`${API_BASE_URL}/history/${matchID}`,
        {
            actionTypeID: actionData.actionTypeID,
            actionTeamID: actionData.actionTeamID,
            selectedTeam: actionData.selectedTeam,
            actionPlayer1ID: actionData.actionPlayer1ID,
            actionPlayer2ID: actionData.actionPlayer2ID,
            actionPointX: actionData.actionPointX,
            actionPointY: actionData.actionPointY,
            minutes: actionData.minutes,
            seconds: actionData.seconds,
        }
    );
    return handleResponse(response);
}

export { getActions, getSquad, sendAction };



