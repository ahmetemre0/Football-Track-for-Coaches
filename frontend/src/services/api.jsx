const API_BASE_URL = 'http://localhost:3000';

export async function fetchPosts() {
  const response = await fetch(`${API_BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export async function submitContactForm(formData) {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error('Failed to submit contact form');
  }
  return response.json();
}

export async function createTeam(formData) {
  const response = await fetch(`${API_BASE_URL}/team`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to create team');
  }
  return response.json();
}

export async function createPlayer(playerData) {
  const response = await fetch(`${API_BASE_URL}/player`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(playerData),
  });
  if (!response.ok) {
    throw new Error('Failed to create player');
  }
  return response.json();
}

