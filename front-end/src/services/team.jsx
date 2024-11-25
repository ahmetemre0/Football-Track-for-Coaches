import axios from 'axios';

const API_URL = 'http://localhost:3000/team';

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
        const response = await axios.post(API_URL, teamData);
        return response.data;
    } catch (error) {
        console.error('Error creating team:', error);
        throw error;
    }
};

const updateTeam = async (id, teamData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, teamData);
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

export { getTeams, getTeamById, createTeam, updateTeam, deleteTeam };