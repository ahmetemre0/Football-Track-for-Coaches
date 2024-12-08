import axios from 'axios';
import { API_BASE_URL } from './common';

const API_URL = `${API_BASE_URL}/player`;

const getPlayers= async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.players;
    } catch (error) {
        alert("Error getting players: ", error.message);
    }
};

const getPlayerById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.player;
    } catch (error) {
        alert("Error getting player: ", error.message);
    }
};

const createPlayer = async (playerData) => {
    try {
        const response = await axios.post(API_URL, playerData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        alert("Error creating player: ", error.message);
    }
};

const updatePlayer = async (id, playerData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, playerData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        alert("Error updating player: ", error.message);
    }
};

const deletePlayer = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        alert("Error deleting player: ", error.message);
    }
};

export { getPlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer };