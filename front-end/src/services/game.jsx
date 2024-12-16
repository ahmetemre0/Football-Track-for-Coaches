import axios from 'axios';
import toast from 'react-hot-toast';

import { API_BASE_URL, handleResponse } from './common';

axios.defaults.validateStatus = function (status) { return true; }

const getActions = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/action/`);
        return handleResponse(response)?.actions;
    } catch (error) {
        toast.error('Failed to fetch actions.');
        console.error('Error fetching actions:', error);
    }
}

const getSquad = async (teamID, matchID) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/team/${teamID}/${matchID}/squad`);
        return handleResponse(response)?.squad;
    } catch (error) {
        toast.error('Failed to fetch squad.');
        console.error('Error fetching squad:', error);
    }
}


const sendAction = async (actionData, matchID) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/history/${matchID}`, {
            actionTypeID: actionData.actionTypeID,
            actionTeamID: actionData.actionTeamID,
            selectedTeam: actionData.selectedTeam,
            actionPlayer1ID: actionData.actionPlayer1ID,
            actionPlayer2ID: actionData.actionPlayer2ID,
            actionPointX: actionData.actionPointX,
            actionPointY: actionData.actionPointY,
            minutes: actionData.minutes,
            seconds: actionData.seconds,
        });
        const data = handleResponse(response);

        if (data) {
            toast.success('Action submitted successfully!');
            return data;
        }
    } catch (error) {
        toast.error('Failed to submit action.');
        console.error('Error submitting action:', error);
    }
}

const getHistory = async (matchID) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/history/${matchID}`);
        return handleResponse(response)?.histories;
    } catch (error) {
        toast.error('Failed to fetch history.');
        console.error('Error fetching history:', error);
    }
}

export { getActions, getSquad, sendAction, getHistory };