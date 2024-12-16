import { API_BASE_URL } from "../../services/common";


export default function Action({ action, onActionClick }) {
    const handleActionClick = () => {
        onActionClick(action); // Set the selected action type
    }

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleActionClick}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                <img
                    src={`${API_BASE_URL}/${action.logo}`}
                    alt=""
                    className="w-12 h-12" // Fixed size for the icon
                />
            </button>
        </div>



    );
}
