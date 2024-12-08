import axios from 'axios';
import { API_BASE_URL } from './common';

const API_URL = `${API_BASE_URL}/player`;

const getPlayers= async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.players;
    } catch (error) {
        console.error('Error fetching players:', error);
        throw error;
    }
};

const getPlayerById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.player;
    } catch (error) {
        console.error(`Error fetching player with id ${id}:`, error);
        throw error;
    }
};

const createPlayer = async (playerData) => {
    try {
        console.log("Player Data", playerData);
        const response = await axios.post(API_URL, playerData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating player:', error);
        throw error;
    }
};

const updatePlayer = async (id, playerData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, playerData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating player with id ${id}:`, error);
        throw error;
    }
};

const deletePlayer = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting player with id ${id}:`, error);
        throw error;
    }
};

export { getPlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer };