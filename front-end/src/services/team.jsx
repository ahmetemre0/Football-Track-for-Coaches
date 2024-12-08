import axios from 'axios';
import { API_BASE_URL } from './common';

const API_URL = `${API_BASE_URL}/team`;

const getTeams = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.teams;
    } catch (error) {
        alert("Error getting teams: ", error.message);
    }
};

const getTeamById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.team;
    } catch (error) {
        alert("Error getting team: ", error.message);
    }
};

const createTeam = async (teamData) => {
    try {
        console.log("Team Data", teamData);
        const response = await axios.post(API_URL, teamData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        alert("Error creating team: ", error.message);
    }
};

const updateTeam = async (id, teamData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, teamData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        alert("Error updating team: ", error.message);
    }
};

const deleteTeam = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        alert("Error deleting team: ", error.message);
    }
};

const getPlayersOfTeam = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}/players`);
        return response.data.players;
    } catch (error) {
        alert("Error getting players of team: ", error.message);
    }
}

const getTeamNames = async () => {
    try {
        const response = await axios.get(`${API_URL}/names`);
        return response.data.teams;
    } catch (error) {
        alert("Error getting team names: ", error.message);
    }
}

export { getTeams, getTeamById, createTeam, updateTeam, deleteTeam, getPlayersOfTeam, getTeamNames };