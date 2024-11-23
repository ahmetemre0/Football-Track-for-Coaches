import { useState, useEffect } from "react";

const History = ({ matchID }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/history?matchID=${matchID}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch history data");
                }
                const data = await response.json();
                setHistory(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (matchID) {
            fetchHistory();
        }
    }, [matchID]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Match History (Match ID: {matchID})</h2>
            {history.length === 0 ? (
                <p>No history data available for this match.</p>
            ) : (
                <table border="1" className="w-full mt-4 text-left">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Minutes</th>
                            <th>Seconds</th>
                            <th>Action Type</th>
                            <th>Team ID</th>
                            <th>Player 1 ID</th>
                            <th>Player 2 ID</th>
                            <th>Area ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item) => (
                            <tr key={item.ID}>
                                <td>{item.ID}</td>
                                <td>{item.minutes}</td>
                                <td>{item.seconds}</td>
                                <td>{item.actionTypeID}</td>
                                <td>{item.actionTeamID || "N/A"}</td>
                                <td>{item.actionPlayer1ID || "N/A"}</td>
                                <td>{item.actionPlayer2ID || "N/A"}</td>
                                <td>{item.actionAreaID || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default History;
