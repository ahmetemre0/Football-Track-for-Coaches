import axios from 'axios';
import { API_BASE_URL, handleResponse } from './common';

const API_URL = `${API_BASE_URL}/match`;
axios.defaults.validateStatus = function (status) { return true; }

const getMatches= async () => {
    const response = await axios.get(API_URL);
    return handleResponse(response)?.matches;
};

const getFilteredMatches = async (teamId1, teamId2) => {
    let url = ''
    if (teamId1 !== 0) url += `/${teamId1}`;
    if (teamId2 !== 0) url += `/${teamId2}`;
    const response = await axios.get(`${API_URL}${url}`);
    return handleResponse(response)?.matches;
}

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

export { getMatches, getFilteredMatches, createMatch, updateMatch, deleteMatch };