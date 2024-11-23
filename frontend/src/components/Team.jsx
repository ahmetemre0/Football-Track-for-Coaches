import { useState, useEffect } from "react";
const API_BASE_URL = 'http://localhost:3000';
const Team = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/api/teams`);
                if (!response.ok) {
                    throw new Error("Failed to fetch team data");
                }
                const data = await response.json();
                setTeams(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Teams</h2>
            {teams.length === 0 ? (
                <p>No teams available.</p>
            ) : (
                <table border="1" className="w-full mt-4 text-left">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Logo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team) => (
                            <tr key={team.ID}>
                                <td>{team.ID}</td>
                                <td>{team.name}</td>
                                <td>
                                    {team.logo ? (
                                        <img
                                            src={team.logo}
                                            alt={`${team.name} logo`}
                                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                        />
                                    ) : (
                                        "No Logo"
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

export default Team;
