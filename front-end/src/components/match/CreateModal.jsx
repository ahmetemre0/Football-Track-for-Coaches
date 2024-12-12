import { useState, useEffect } from 'react';
import { getTeamNames, getPlayersOfTeam } from '../../services/team';
import { API_BASE_URL } from '../../services/common';

const CreateMatchModalBody = (props) => {
    const { handleCancel, handleProceed, handleForm } = props;
    
    const [teamNames, setTeamNames] = useState([]);

    const [homeTeamId, setHomeTeamId] = useState('');
    const [awayTeamId, setAwayTeamId] = useState('');

    const [homePlayers, setHomePlayers] = useState([]);
    const [awayPlayers, setAwayPlayers] = useState([]);

    const [selectedHomePlayers, setSelectedHomePlayers] = useState([]);
    const [selectedAwayPlayers, setSelectedAwayPlayers] = useState([]);

    useEffect(() => {
        getTeamNames()
            .then((data) => {setTeamNames(data)})
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        if (homeTeamId === '') return;

        getPlayersOfTeam(homeTeamId)
            .then((data) => {setHomePlayers(data)})
            .catch((error) => console.error(error));
    }, [homeTeamId]);

    useEffect(() => {
        if (awayTeamId === '') return;

        getPlayersOfTeam(awayTeamId)
            .then((data) => {setAwayPlayers(data)})
            .catch((error) => console.error(error));
    }, [awayTeamId]);

    useEffect(() => {
        handleForm('homeTeamSquad', selectedHomePlayers);
    }, [selectedHomePlayers]);

    useEffect(() => {
        handleForm('awayTeamSquad', selectedAwayPlayers);
    }, [selectedAwayPlayers]);

    const handleTeamChange = (e, formKey) => {
        let selectedTeam = e.target.value;
        if (formKey === 'homeTeamID') {
            setHomeTeamId(selectedTeam);
            setSelectedHomePlayers([]);
        }
        else {
            setAwayTeamId(selectedTeam);
            setSelectedAwayPlayers([]);
        }

        handleForm(formKey, selectedTeam);
    }

    const handleHomeCheckboxChange = (playerId, isChecked) => {
        if (isChecked) {
            setSelectedHomePlayers((prev) => [...prev, playerId]);
        } else {
            setSelectedHomePlayers((prev) => prev.filter((id) => id !== playerId));
        }
    };

    const handleAwayCheckboxChange = (playerId, isChecked) => {
        if (isChecked) {
            setSelectedAwayPlayers((prev) => [...prev, playerId]);
        } else {
            setSelectedAwayPlayers((prev) => prev.filter((id) => id !== playerId));
        }
    }



    return (
        <>
        <div role="tablist" className="tabs tabs-lifted">
            <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Home Team" defaultChecked  />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <div>
                    <select
                        id='homeTeamID'
                        onChange={(e) => handleTeamChange(e, 'homeTeamID')}
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
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Number</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            homePlayers?.map((player) => { 
                                return (
                                <tr key={player.ID}>
                                    <th>
                                        <label>
                                            <input onChange={(e) => handleHomeCheckboxChange(player.ID, e.target.checked)}
                                                type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={`${API_BASE_URL}${player.photoPath}`} alt='Player' />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{player.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {player.number}
                                    </td>
                                </tr>
                                )})    
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>

            <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Away Team" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <div>
                    <select
                        id='awayTeamID'
                        onChange={(e) => handleTeamChange(e, 'awayTeamID')}
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
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Number</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            awayPlayers?.map((player) => { 
                                return (
                                <tr key={player.ID}>
                                    <th>
                                        <label>
                                            <input onChange={(e) => handleAwayCheckboxChange(player.ID, e.target.checked)}
                                                type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={`${API_BASE_URL}${player.photoPath}`} alt='Player' />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{player.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {player.number}
                                    </td>
                                </tr>
                                )})    
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className="join flex justify-end mt-6">
            <button onClick={handleCancel} className="btn btn-ghost border-slate-700 join-item">
                Cancel
            </button>
            <button onClick={handleProceed} disabled={selectedAwayPlayers.length !== 1 || selectedHomePlayers.length !== 1} className="btn bg-green-600 hover:bg-green-700 border-slate-700 text-white join-item">
                Create
            </button>
        </div>
        </>



        
    )
}

export default CreateMatchModalBody;