import { toast } from 'react-hot-toast';

export const API_BASE_URL = 'http://localhost:3000';

export const handleResponse = (response) => {
    if (response.data?.success) {
        return response.data;
    } else {
        toast.error(`Error: ${response.data?.message || 'Unknown error occurred'}`);
        return null;
    }
}

