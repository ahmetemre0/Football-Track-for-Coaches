import axios from 'axios';
import { API_BASE_URL, handleResponse } from './common';

const API_URL = `${API_BASE_URL}/player`;
axios.defaults.validateStatus = function (status) { return true; }

const getPlayers= async () => {
    const response = await axios.get(API_URL);
    return handleResponse(response)?.players;
};


const createPlayer = async (playerData) => {
    const response = await axios.post(API_URL, playerData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return handleResponse(response)?.player;
};

const updatePlayer = async (id, playerData) => {
    const response = await axios.put(`${API_URL}/${id}`, playerData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return handleResponse(response)?.player;
};

const deletePlayer = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return handleResponse(response);
};

export { getPlayers, createPlayer, updatePlayer, deletePlayer };