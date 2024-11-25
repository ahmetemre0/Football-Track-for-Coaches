import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTeam } from '../services/api';

const AddTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [teamPhoto, setTeamPhoto] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', teamName);
      formData.append('logo', teamPhoto);

      const newTeam = await createTeam(formData);
      alert('Team created successfully!');
      navigate(`/add-player/${newTeam.id}`);
    } catch (error) {
      alert('Error creating team. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Add New Team</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="teamName" className="block mb-1">Team Name:</label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="teamPhoto" className="block mb-1">Team Photo:</label>
          <input
            type="file"
            id="teamPhoto"
            accept="image/*"
            onChange={(e) => setTeamPhoto(e.target.files[0])}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Team
        </button>
      </form>
    </div>
  );
}

export default AddTeam;

