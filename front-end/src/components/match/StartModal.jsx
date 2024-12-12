import { useEffect, useState } from "react";
import { getFirstEighteen } from "../../services/team";
import { API_BASE_URL } from "../../services/common";

const StartMatchModalBody = (props) => {

    const { handleCancel, handleProceed, handleForm, currentMatch } = props;

    const [ homePlayers, setHomePlayers ] = useState([]);
    const [ awayPlayers, setAwayPlayers ] = useState([]);

    const [ selectedHomePlayers, setSelectedHomePlayers ] = useState([]);
    const [ selectedAwayPlayers, setSelectedAwayPlayers ] = useState([]);

    useEffect(() => {
        
        // if current match is an empty object, return
        if (Object.keys(currentMatch).length === 0) return;
        console.log("current match:", currentMatch);
        getFirstEighteen(currentMatch.homeTeamID, currentMatch.matchID)
            .then((players) => setHomePlayers(players));
        
        getFirstEighteen(currentMatch.awayTeamID, currentMatch.matchID)
            .then((players) => setAwayPlayers(players));
    }, [currentMatch]);

    useEffect(() => {
        handleForm('homeTeamFirstEleven', selectedHomePlayers);
    }, [selectedHomePlayers]);

    useEffect(() => {
        handleForm('awayTeamFirstEleven', selectedAwayPlayers);
    }, [selectedAwayPlayers]);

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
                {currentMatch.homeTeamName}
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
                {currentMatch.awayTeamName}
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
        <button onClick={handleProceed} disabled={selectedAwayPlayers.length !== 11 || selectedHomePlayers.length !== 11} className="btn bg-green-600 hover:bg-green-700 border-slate-700 text-white join-item">
            Create
        </button>
    </div>
    </>
)}

export default StartMatchModalBody;