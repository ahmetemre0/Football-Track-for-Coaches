import axios from 'axios';
import { API_BASE_URL, handleResponse } from './common';

const API_URL = `${API_BASE_URL}/match`;
axios.defaults.validateStatus = function (status) { return true; }

const getMatches= async () => {
    const response = await axios.get(API_URL);
    return handleResponse(response)?.matches;
};

const createMatch = async (matchData) => {
    const response = await axios.post(API_URL, matchData);
    return handleResponse(response)?.match;
};

const updateMatch = async (id, matchData) => {
    const response = await axios.put(`${API_URL}/${id}`, matchData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return handleResponse(response)?.match;
};

const deleteMatch = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return handleResponse(response);
};

export { getMatches, createMatch, updateMatch, deleteMatch };