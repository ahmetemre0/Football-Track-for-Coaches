import { useEffect, useState } from 'react';

const Area = () => {
    const [areas, setAreas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch areas from the backend
        const fetchAreas = async () => {
            try {
                const response = await fetch('/api/area'); // Adjust the endpoint if necessary
                if (!response.ok) {
                    throw new Error('Failed to fetch areas');
                }
                const data = await response.json();
                setAreas(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchAreas();
    }, []);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Area List</h1>
            <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Top Left (X, Y)</th>
                        <th className="border border-gray-300 px-4 py-2">Top Right (X, Y)</th>
                        <th className="border border-gray-300 px-4 py-2">Bottom Left (X, Y)</th>
                        <th className="border border-gray-300 px-4 py-2">Bottom Right (X, Y)</th>
                    </tr>
                </thead>
                <tbody>
                    {areas.map(area => (
                        <tr key={area.ID}>
                            <td className="border border-gray-300 px-4 py-2">{area.ID}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                ({area.topLeftX}, {area.topLeftY})
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                ({area.topRightX}, {area.topRightY})
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                ({area.bottomLeftX}, {area.bottomLeftY})
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                ({area.bottomRightX}, {area.bottomRightY})
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Area;
