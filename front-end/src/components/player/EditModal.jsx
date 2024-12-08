import { useState, useEffect } from 'react';
import { getTeamNames } from '../../services/team';

const EditPlayerModalBody = (props) => {
    const { handleCancel, handleProceed, currentPlayer, handleForm } = props;

    const [teamNames, setTeamNames] = useState([]);

    useEffect(() => {
        getTeamNames()
            .then((data) => {setTeamNames(data)})
            .catch((error) => console.error(error));
    });

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="name" className="block mb-1">Player Name: </label>
                <input
                    type="text"
                    id="name"
                    defaultValue={currentPlayer?.name}
                    onChange={(e) => handleForm('name', e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            <div>
                <label htmlFor="teamID" className="block mb-1">Team: </label>
                <select
                    id='teamID'
                    onChange={(e) => handleForm('teamID', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                >
                    {
                    teamNames.map((team) => (
                        <option selected={team.id === currentPlayer.teamID} key={team.id} value={team.id}>{team.name}</option>
                    ))
                    }
                </select>
            </div>

            <div>
                <label htmlFor="number" className="block mb-1">Number: </label>
                <input
                    type="number"
                    id="number"
                    onChange={(e) => handleForm('number', e.target.value)}
                    defaultValue={currentPlayer?.number}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            <div>
                <label htmlFor="photoPath" className="block mb-1">Photo: </label>
                <input
                    type="file"
                    id="photoPath"
                    accept="image/*"
                    onChange={(e) => handleForm('photoPath', e.target.files[0])}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            <div className="join flex justify-end">
                <button onClick={handleCancel} className="btn btn-ghost border-slate-700 join-item">
                    Cancel
                </button>
                <button onClick={handleProceed} className="btn bg-amber-400 hover:bg-amber-500 border-slate-700 text-white join-item">
                    Edit
                </button>
            </div>
        </div>
    )
}

export default EditPlayerModalBody;