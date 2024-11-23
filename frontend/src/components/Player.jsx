import { useState, useEffect } from "react";

const Player = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/player");
                if (!response.ok) {
                    throw new Error("Failed to fetch player data");
                }
                const data = await response.json();
                setPlayers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Players</h2>
            {players.length === 0 ? (
                <p>No players available.</p>
            ) : (
                <table border="1" className="w-full mt-4 text-left">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Team ID</th>
                            <th>Number</th>
                            <th>Position</th>
                            <th>Photo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                            <tr key={player.ID}>
                                <td>{player.ID}</td>
                                <td>{player.name}</td>
                                <td>{player.teamID}</td>
                                <td>{player.number}</td>
                                <td>{player.position}</td>
                                <td>
                                    {player.photoPath ? (
                                        <img
                                            src={player.photoPath}
                                            alt={`${player.name}'s photo`}
                                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                        />
                                    ) : (
                                        "No Photo"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Player;
