import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

import { deleteTeam, updateTeam } from "../../services/team";

import Modal from "../common/Modal";
import DeleteTeamModalBody from "./DeleteModal";
import EditTeamModalBody from "./EditModal";
import { API_BASE_URL } from "../../services/common";

const TeamTable = ({ teams }) => {
  const [currentTeam, setCurrentTeam] = useState(null);
  const [form, setForm] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openEditModal = (team) => {
    setCurrentTeam(team);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (team) => {
    setCurrentTeam(team);
    setIsDeleteModalOpen(true);
  };

  const deleteCurrentTeam = () => {
    deleteTeam(currentTeam?.ID);
    setIsDeleteModalOpen(false);
    window.location.reload();
  };

  const editCurrentTeam = () => {
    console.log(form)
    updateTeam(currentTeam.ID, form);
    setIsEditModalOpen(false);
    window.location.reload();
  };

  const handleForm = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-8">
        {teams.map((team) => (
          <div
            key={team.ID}
            className="card card-compact bg-base-200 w-96 shadow-xl"
          >
            <figure>
              <img
                src={`${API_BASE_URL}${team.logo}`}
                alt="Team Logo"
                className="w-96 h-96 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{team.name}</h2>
              <div className="card-actions justify-end">
                <div
                  className="h-12 w-12 min rounded-lg me-2 btn bg-amber-400 hover:bg-amber-500"
                  onClick={() => openEditModal(team)}
                >
                  <FaEdit className="text-white" />
                </div>
                <div
                  className="h-12 w-12 min rounded-lg btn bg-red-600 hover:bg-red-700"
                  onClick={() => openDeleteModal(team)}
                >
                  <FaTrash className="text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={isDeleteModalOpen}
        close={() => setIsDeleteModalOpen(false)}
        title={`Delete ${currentTeam?.name}`}
      >
        <DeleteTeamModalBody 
          handeCancel={() => setIsDeleteModalOpen(false)}
          handleProceed={deleteCurrentTeam}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        close={() => setIsEditModalOpen(false)}
        title={`Edit ${currentTeam?.name}`}
      >
        <EditTeamModalBody
          handleCancel={() => setIsEditModalOpen(false)}
          handleProceed={editCurrentTeam}
          currentTeam={currentTeam}
          handleForm={handleForm}
        />
      </Modal>
    </>
  );
};

export default TeamTable;
