import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

import { API_BASE_URL } from "../../services/common";

const TeamTable = (props) => {
  const { teams, openEditModal, openDeleteModal } = props;

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

      
    </>
  );
};

export default TeamTable;
