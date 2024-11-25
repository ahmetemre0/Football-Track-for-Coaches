import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPlayer } from '../services/api';

const AddPlayer = () => {
  const [playerName, setPlayerName] = useState('');
  const [playerPosition, setPlayerPosition] = useState('');
  const [playerAge, setPlayerAge] = useState('');
  const { teamId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const playerData = {
        name: playerName,
        position: playerPosition,
        age: parseInt(playerAge),
        teamId: parseInt(teamId)
      };

      await createPlayer(playerData);
      alert('Player added successfully!');
      setPlayerName('');
      setPlayerPosition('');
      setPlayerAge('');
    } catch (error) {
      alert('Error adding player. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Add New Player</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="playerName" className="block mb-1">Player Name:</label>
          <input
            type="text"
            id="playerName"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="playerPosition" className="block mb-1">Position:</label>
          <input
            type="text"
            id="playerPosition"
            value={playerPosition}
            onChange={(e) => setPlayerPosition(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="playerAge" className="block mb-1">Age:</label>
          <input
            type="number"
            id="playerAge"
            value={playerAge}
            onChange={(e) => setPlayerAge(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Player
        </button>
      </form>
      <button
        onClick={() => navigate('/')}
        className="mt-4 text-blue-600 hover:underline"
      >
        Back to Home
      </button>
    </div>
  );
}

export default AddPlayer;

