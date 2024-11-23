import { useEffect, useState } from 'react';

const Action = () => {
    const [actions, setActions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch actions from the backend
        const fetchActions = async () => {
            try {
                const response = await fetch('/api/action'); // Adjust the endpoint if necessary
                if (!response.ok) {
                    throw new Error('Failed to fetch actions');
                }
                const data = await response.json();
                setActions(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchActions();
    }, []);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Action List</h1>
            <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Logo</th>
                        <th className="border border-gray-300 px-4 py-2">Player 1</th>
                        <th className="border border-gray-300 px-4 py-2">Player 2</th>
                        <th className="border border-gray-300 px-4 py-2">Area</th>
                    </tr>
                </thead>
                <tbody>
                    {actions.map(action => (
                        <tr key={action.ID}>
                            <td className="border border-gray-300 px-4 py-2">{action.ID}</td>
                            <td className="border border-gray-300 px-4 py-2">{action.name}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {action.logo ? (
                                    <img
                                        src={action.logo}
                                        alt={action.name}
                                        className="h-8 w-8 object-cover"
                                    />
                                ) : (
                                    'No Logo'
                                )}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{action.hasPlayer1}</td>
                            <td className="border border-gray-300 px-4 py-2">{action.hasPlayer2}</td>
                            <td className="border border-gray-300 px-4 py-2">{action.hasArea}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Action;
