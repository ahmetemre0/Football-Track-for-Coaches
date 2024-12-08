import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

import { API_BASE_URL } from "../../services/common";

const PlayerTable = (props) => {
  const { players, openEditModal, openDeleteModal } = props;

  return (
      <>
      {!players || players.length === 0  ?
      (
          <p>No players available.</p>
      ) : 
      (
      <div className="flex flex-wrap justify-center gap-8">
        {players.map((player) => (
          <div
            key={player.ID}
            className="card card-compact bg-base-200 w-64 shadow-xl"
          >
            <figure>
              <img
                src={`${API_BASE_URL}${player.photoPath}`}
                alt="Player"
                className="w-64 h-64 object-cover"
              />
            </figure>
            <div className="card-body flex justify-between">
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
    )}
      </>
  );
};

export default PlayerTable;
