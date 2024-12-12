import MatchTable from "../components/match/Table";
import { useState, useEffect } from "react";
import { createMatch, getMatches, getFilteredMatches, deleteMatch } from "../services/match";
import { getTeamNames, setFirstEleven } from "../services/team";
import CreateMatchModalBody from "../components/match/CreateModal";
import StartMatchModalBody from "../components/match/StartModal";
import Modal from "../components/common/Modal";
import { useNavigate } from "react-router-dom";

const Match = () => {

    const navigate = useNavigate();

    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState({});
    const [createForm, setCreateForm] = useState({});
    const [startForm, setStartForm] = useState({});

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isStartModalOpen, setIsStartModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        awayTeamSquad: [],
        homeTeamSquad: [],
        teamId1: 0,
        teamId2: 0,
    });
    const [teamNames, setTeamNames] = useState([]);

    useEffect(() => {
        getMatches()
            .then((data) => { setMatches(data) })
            .catch((error) => console.error(error));

        getTeamNames()
            .then((data) => { setTeamNames(data) })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        if (filters.teamId1 === 0 && filters.teamId2 === 0) return;

        getFilteredMatches(filters.teamId1, filters.teamId2)
            .then((data) => { setMatches(data) })
            .catch((error) => console.error(error));
    }, [filters]);

    const handleClick = (match) => {
        setSelectedMatch(match);
        setIsStartModalOpen(true);
    }

    const handleCreateForm = async (key, value) => {
        setCreateForm((prev) => ({ ...prev, [key]: value }));
    }

    const handleStartForm = async (key, value) => {
        setStartForm((prev) => ({ ...prev, [key]: value }));
    }

    const handleCreateMatch = async () => {
        let createdMatch = await createMatch(createForm)

        if (createdMatch) {
            matches.push(createdMatch);
            setIsCreateModalOpen(false);
        }
    }

    const handleDelete = async () => {
        let response = await deleteMatch(selectedMatch?.matchID);
        if (response.success) {
            setMatches((matches) => matches.filter((match) => match.matchID !== selectedMatch.matchID));
            setIsStartModalOpen(false);
        }
    }

    const handleStartMatch = async () => {
        console.log("start form:", startForm);
        await setFirstEleven(selectedMatch.homeTeamID, selectedMatch.matchID, startForm.homeTeamFirstEleven);
        await setFirstEleven(selectedMatch.awayTeamID, selectedMatch.matchID, startForm.awayTeamFirstEleven);
        setIsStartModalOpen(false);

        navigate('/game', { state: { selectedMatch } });
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
                    handleForm={handleCreateForm}
                />
            </Modal>

            <Modal
                isOpen={isStartModalOpen}
                close={() => setIsStartModalOpen(false)}
                title="Start Match"
            >
                <StartMatchModalBody
                    handleCancel={() => setIsStartModalOpen(false)}
                    handleProceed={handleStartMatch}
                    handleForm={handleStartForm}
                    handleDelete={handleDelete}
                    currentMatch={selectedMatch}
                />

            </Modal>
        </>
    );
}

export default Match;