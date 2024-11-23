import { useState, useEffect } from "react";

const Match = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/matches");
                if (!response.ok) {
                    throw new Error("Failed to fetch match data");
                }
                const data = await response.json();
                setMatches(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Matches</h2>
            {matches.length === 0 ? (
                <p>No matches available.</p>
            ) : (
                <table border="1" className="w-full mt-4 text-left">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Home Team ID</th>
                            <th>Away Team ID</th>
                            <th>Home Score</th>
                            <th>Away Score</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((match) => (
                            <tr key={match.ID}>
                                <td>{match.ID}</td>
                                <td>{match.homeTeamID}</td>
                                <td>{match.awayTeamID}</td>
                                <td>{match.homeScore ?? "N/A"}</td>
                                <td>{match.awayScore ?? "N/A"}</td>
                                <td>{match.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Match;
