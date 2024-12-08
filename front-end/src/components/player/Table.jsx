import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

import { deletePlayer, updatePlayer } from "../../services/player";

import Modal from "../common/Modal";
import DeletePlayerModalBody from "./DeleteModal";
import EditPlayerModalBody from "./EditModal";
import { API_BASE_URL } from "../../services/common";

const PlayerTable = ({ players }) => {
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [form, setForm] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openEditModal = (player) => {
    setCurrentPlayer(player);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (player) => {
    setCurrentPlayer(player);
    setIsDeleteModalOpen(true);
  };

  const deleteCurrentTeam = () => {
    deletePlayer(currentPlayer?.ID);
    setIsDeleteModalOpen(false);
    //window.location.reload();
  };

  const editCurrentPlayer = () => {
    updatePlayer(currentPlayer.ID, form);
    setIsEditModalOpen(false);
    window.location.reload();
  };

  const handleForm = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  useEffect(() => {
    console.log('players', players);
  }, [players]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-8">
        {players.map((player) => (
          <div
            key={player.ID}
            className="card card-compact bg-base-200 w-96 shadow-xl"
          >
            <figure>
              <img
                src={`${API_BASE_URL}${player.photoPath}`}
                alt="Player"
                className="w-96 h-96 object-cover"
              />
            </figure>
            <div className="card-body">
              <div className="flex">
                <p className="card-title">{player.name}</p>
                <p className="font-bold text-end">{player.number}</p>
              </div>
              <div className="card-actions justify-end">
                <div
                  className="h-12 w-12 min rounded-lg me-2 btn bg-amber-400 hover:bg-amber-500"
                  onClick={() => openEditModal(player)}
                >
                  <FaEdit className="text-white" />
                </div>
                <div
                  className="h-12 w-12 min rounded-lg btn bg-red-600 hover:bg-red-700"
                  onClick={() => openDeleteModal(player)}
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
        title={`Delete ${currentPlayer?.name}`}
      >
        <DeletePlayerModalBody 
          handeCancel={() => setIsDeleteModalOpen(false)}
          handleProceed={deleteCurrentTeam}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        close={() => setIsEditModalOpen(false)}
        title={`Edit ${currentPlayer?.name}`}
      >
        <EditPlayerModalBody
          handleCancel={() => setIsEditModalOpen(false)}
          handleProceed={editCurrentPlayer}
          currentPlayer={currentPlayer}
          handleForm={handleForm}
        />
      </Modal>
    </>
  );
};

export default PlayerTable;
