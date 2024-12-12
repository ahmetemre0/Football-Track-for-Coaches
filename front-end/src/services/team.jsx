import axios from 'axios';
import { API_BASE_URL, handleResponse } from './common';

const API_URL = `${API_BASE_URL}/team`;
axios.defaults.validateStatus = function (status) { return true; }

const getTeams = async () => {
    const response = await axios.get(API_URL);
    return handleResponse(response)?.teams;
};

const getTeamById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return handleResponse(response)?.team;
};

const createTeam = async (teamData) => {
    const response = await axios.post(API_URL, teamData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return handleResponse(response)?.team;
};

const updateTeam = async (id, teamData) => {
    const response = await axios.put(`${API_URL}/${id}`, teamData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return handleResponse(response)?.team;
};

const deleteTeam = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return handleResponse(response);
};

const getPlayersOfTeam = async (id) => {
    const response = await axios.get(`${API_URL}/${id}/players`);
    return handleResponse(response)?.players;
}

const getTeamNames = async () => {
    const response = await axios.get(`${API_URL}/names`);
    return handleResponse(response)?.teams;
}

const getFirstEighteen = async (teamId, matchId) => {
    const response = await axios.get(`${API_URL}/${teamId}/${matchId}/squad`);
    return handleResponse(response)?.squad;
}

export { getTeams, getTeamById, createTeam, updateTeam, deleteTeam, getPlayersOfTeam, getTeamNames, getFirstEighteen };