import { useState, useEffect } from "react";

import { getTeams, createTeam } from "../services/team";

import Modal from "../components/common/Modal";
import TeamTable from "../components/team/Table";
import CreateTeamModalBody from "../components/team/CreateModal";

const Team = () => {
    const [teams, setTeams] = useState([]);

    const [form, setForm] = useState({});
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleForm = (key, value) => {
        setForm({ ...form, [key]: value });
    }

    const handleCreateTeam = async () => {

        let createdTeam = await createTeam(form)
        if (createdTeam) {
            teams.push(createdTeam);
            setIsCreateModalOpen(false);
        }
    }

    useEffect(() => {
        getTeams()
            .then((data) => {setTeams(data)})
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
        
        <div>
            {!teams || teams.length === 0  ? (
                <p>No teams available.</p>
            ) : (
                <>
                <div className="w-full flex justify-end">
                    <div
                        onClick={() => setIsCreateModalOpen(true)} 
                        className="h-12 w-32 min rounded-lg btn bg-green-600 hover:bg-green-700 text-white mb-4" 
                    >
                        Add Team
                    </div>
                </div>
                <div className="">
                    <TeamTable teamList={teams}></TeamTable>
                </div>
                </>
            )}
        </div>

        <Modal
            isOpen={isCreateModalOpen}
            close={() => setIsCreateModalOpen(false)}
            title="Create New Team"
        >
            <CreateTeamModalBody
                handleCancel={() => setIsCreateModalOpen(false)}
                handleProceed={handleCreateTeam}
                handleForm={handleForm}
            />
        </Modal>
        </>
    );
};

export default Team;
