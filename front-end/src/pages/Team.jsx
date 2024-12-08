import { useState, useEffect } from "react";

import { getTeams, createTeam, deleteTeam, updateTeam } from "../services/team";

import Modal from "../components/common/Modal";
import TeamTable from "../components/team/Table";

import CreateTeamModalBody from "../components/team/CreateModal";
import EditTeamModalBody from "../components/team/EditModal";
import DeleteTeamModalBody from "../components/team/DeleteModal";

const Team = () => {
    const [currentTeam, setCurrentTeam] = useState(null);
    const [teams, setTeams] = useState([]);

    const [form, setForm] = useState({});

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

    const handleDeleteTeam = async () => {
        let response = await deleteTeam(currentTeam?.ID);
        if (response.success) {
          setIsDeleteModalOpen(false);
          setTeams((teams) => teams.filter((team) => team.ID !== currentTeam.ID));
        }  
      };
    
      const handleEditTeam = async () => {
        let updatedTeam = await updateTeam(currentTeam.ID, form);
        if (updatedTeam) {
          setTeams((teams) => teams.map((team) => team.ID === currentTeam.ID ? updatedTeam : team));
          setIsEditModalOpen(false);
        }
      };

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
                    <TeamTable 
                        teams={teams}
                        openEditModal={(team) => { setCurrentTeam(team); setIsEditModalOpen(true); }}
                        openDeleteModal={(team) => { setCurrentTeam(team); setIsDeleteModalOpen(true); }}
                    >

                    </TeamTable>
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

        <Modal 
            isOpen={isDeleteModalOpen}
            close={() => setIsDeleteModalOpen(false)}
            title={`Delete ${currentTeam?.name}`}
        >
            <DeleteTeamModalBody 
            handeCancel={() => setIsDeleteModalOpen(false)}
            handleProceed={handleDeleteTeam}
            />
        </Modal>

        <Modal
            isOpen={isEditModalOpen}
            close={() => setIsEditModalOpen(false)}
            title={`Edit ${currentTeam?.name}`}
        >
            <EditTeamModalBody
            handleCancel={() => setIsEditModalOpen(false)}
            handleProceed={handleEditTeam}
            currentTeam={currentTeam}
            handleForm={handleForm}
            />
        </Modal>
        </>
    );
};

export default Team;
