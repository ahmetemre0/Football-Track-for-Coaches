import MatchTable from "../components/match/Table";
import { useState, useEffect } from "react";
import { createMatch, getMatches, getFilteredMatches } from "../services/match";
import { getTeamNames } from "../services/team";
import CreateMatchModalBody from "../components/match/CreateModal";
import Modal from "../components/common/Modal";

const Match = () => {

    const [matches, setMatches] = useState([]);
    const [form, setForm] = useState({});
    
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        teamId1: 0,
        teamId2: 0,
    });
    const [teamNames, setTeamNames] = useState([]);

    useEffect(() => {
        getMatches()
            .then((data) => {setMatches(data)})
            .catch((error) => console.error(error));

        getTeamNames()
            .then((data) => {setTeamNames(data)})
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        if (filters.teamId1 === 0 && filters.teamId2 === 0) return;

        getFilteredMatches(filters.teamId1, filters.teamId2)
            .then((data) => {setMatches(data)})
            .catch((error) => console.error(error));
    }
    , [filters]);

    const handleClick = (match) => {
        //console.log('clicked to ', match);
    }

    const handleForm = async (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    const handleCreateMatch = async () => {
        let createdMatch = await createMatch(form)
        
        if (createdMatch) {
            matches.push(createdMatch);
            setIsCreateModalOpen(false);
        }
    }

    
    return (
        <>
        <div className="w-full flex justify-between">
            <div className="flex gap-4">
                <select 
                    className="select select-bordered w-full max-w-xs"
                    onChange={(e) => setFilters({ ...filters, teamId1: e.target.value })}
                >
                    <option value="">Select Team to Filter</option>
                    {teamNames.map((team) => (
                        <option key={team.ID} value={team.ID}>{team.name}</option>
                    ))}
                </select>

                <select 
                    className="select select-bordered w-full max-w-xs"
                    onChange={(e) => setFilters({ ...filters, teamId2: e.target.value })}
                >
                    <option value="">Select Team to Filter</option>
                    {teamNames.map((team) => (
                        <option key={team.ID} value={team.ID}>{team.name}</option>
                    ))}
                </select>
            </div>
            <div
                onClick={() => setIsCreateModalOpen(true)} 
                className="h-12 w-32 min rounded-lg btn bg-green-600 hover:bg-green-700 text-white mb-4" 
            >
                Add Match
            </div>
        </div>

        <MatchTable onMatchClick={handleClick} matches={matches} />

        <Modal
            isOpen={isCreateModalOpen}
            close={() => setIsCreateModalOpen(false)}
            title="Create New Match"
        >
            <CreateMatchModalBody
                handleCancel={() => setIsCreateModalOpen(false)}
                handleProceed={handleCreateMatch}
                handleForm={handleForm}
            />
        </Modal>
        </>
    );
}

export default Match;