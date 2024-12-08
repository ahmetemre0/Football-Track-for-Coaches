import { useState, useEffect } from 'react';
import { getTeamNames } from '../../services/team';

const CreateMatchModalBody = (props) => {
    const { handleCancel, handleProceed, handleForm } = props;

    const [teamNames, setTeamNames] = useState([]);

    useEffect(() => {
        getTeamNames()
            .then((data) => {setTeamNames(data)})
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="space-y-4 ">
            <div className='flex justify-between flex-row gap-4'>
                <div>
                    <label htmlFor="homeTeamID" className="block mb-1 leading-6 text-center">Home Team</label>
                    <select
                        id='homeTeamID'
                        onChange={(e) => handleForm('homeTeamID', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="">Select a team</option>
                        {
                        teamNames.map((team) => (
                            <option key={team.ID} value={team.ID}>{team.name}</option>
                        ))
                        }
                    </select>
                </div>

                <div>
                    <label htmlFor="homeScore" className="block mb-1 h-6"></label>
                    <input
                        type="number"
                        id="homeScore"
                        onChange={(e) => handleForm('homeScore', e.target.value)}
                        required
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                         w-12 px-3 py-2 border-2 rounded text-center"
                    />
                </div>
                <span className='mt-6 flex items-center'>-</span>
                <div>
                    <label htmlFor="awayScore" className="block mb-1 h-6"></label>
                    <input
                        type="number"
                        id="awayScore"
                        onChange={(e) => handleForm('awayScore', e.target.value)}
                        required
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                         w-12 px-3 py-2 border-2 rounded text-center"
                    />
                </div>

            <div>
                <label htmlFor="awayTeamID" className="block mb-1 text-center leading-6">Away Team</label>
                <select
                    id='awayTeamID'
                    onChange={(e) => handleForm('awayTeamID', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                >
                    <option value="">Select a team</option>
                    {
                    teamNames.map((team) => (
                        <option key={team.ID} value={team.ID}>{team.name}</option>
                    ))
                    }
                </select>
            </div>
            

            </div>

            <div className="join flex justify-end">
                <button onClick={handleCancel} className="btn btn-ghost border-slate-700 join-item">
                    Cancel
                </button>
                <button onClick={handleProceed} className="btn bg-green-600 hover:bg-green-700 border-slate-700 text-white join-item">
                    Create
                </button>
            </div>
        </div>
    )
}

export default CreateMatchModalBody;