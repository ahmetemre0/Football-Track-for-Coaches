export const API_BASE_URL = 'http://localhost:3000';

export const handleResponse = (response) => {
    if (response.data.success) return response.data;
    alert(`Error: ${response.data.message}`);
}