import axios from 'axios';
import { API_BASE_URL } from './common';

const API_URL = `${API_BASE_URL}/team`;

const getTeams = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.teams;
    } catch (error) {
        console.error('Error fetching teams:', error);
        throw error;
    }
};

const getTeamById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.team;
    } catch (error) {
        console.error(`Error fetching team with id ${id}:`, error);
        throw error;
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
        console.error('Error creating team:', error);
        throw error;
    }
};

const updateTeam = async (id, teamData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, teamData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating team with id ${id}:`, error);
        throw error;
    }
};

const deleteTeam = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting team with id ${id}:`, error);
        throw error;
    }
};

const getPlayersOfTeam = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}/players`);
        return response.data.players;
    } catch (error) {
        console.error(`Error fetching players of team with id ${id}:`, error);
        throw error;
    }
}

const getTeamNames = async () => {
    try {
        const response = await axios.get(`${API_URL}/names`);
        return response.data.teams;
    } catch (error) {
        console.error('Error fetching team names:', error);
        throw error;
    }
}

export { getTeams, getTeamById, createTeam, updateTeam, deleteTeam, getPlayersOfTeam, getTeamNames };