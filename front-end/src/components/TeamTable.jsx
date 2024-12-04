import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

import { deleteTeam, updateTeam } from "../services/team";
import { API_BASE_URL } from "../services/api";

const TeamTable = ({ teams }) => {
  const [currentTeam, setCurrentTeam] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [teamPhoto, setTeamPhoto] = useState(null);

  const openEditModal = (team) => {
    setCurrentTeam(team);
    setTeamName(team.name);
    document.getElementById("edit_modal").showModal();
  };

  const openDeleteModal = (team) => {
    setCurrentTeam(team);
    document.getElementById("delete_modal").showModal();
  };

  const deleteCurrentTeam = () => {
    deleteTeam(currentTeam?.ID);

    document.getElementById("delete_modal").close();
    window.location.reload();
  };


  const handleEditForm = () => {
    const formData = new FormData();
    formData.append('name', teamName);
    formData.append('logo', teamPhoto);
    updateTeam(currentTeam.ID, formData);


    document.getElementById("edit_modal").close();
    window.location.reload();
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

      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete {currentTeam?.name}</h3>
          <p className="py-4">
            Are you sure you want to delete this team? <br />{" "}
            <em>Players of this team will also be deleted.</em>
          </p>
          <div className="join flex justify-end">
            <form method="dialog">
              <button className="btn btn-ghost border-slate-700 join-item">
                Cancel
              </button>
            </form>
            <div
              onClick={() => deleteCurrentTeam()}
              className="btn bg-red-600 hover:bg-red-700 border-slate-700 text-white join-item"
            >
              Delete
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog id="edit_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {currentTeam?.name}</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="teamName" className="block mb-1">
                Team Name:
              </label>
              <input
                type="text"
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="teamPhoto" className="block mb-1">
                Team Photo:
              </label>
              <input
                type="file"
                id="teamPhoto"
                accept="image/*"
                onChange={(e) => setTeamPhoto(e.target.files[0])}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="join flex justify-end">
              <form method="dialog">
                <button className="btn btn-ghost border-slate-700 join-item">
                  Cancel
                </button>
              </form>
              <button
                onClick={handleEditForm}
                className="btn bg-amber-400 hover:bg-amber-500 border-slate-700 text-white join-item"
              >
                Edit
              </button>
            </div>
          </div>
        </div>


        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default TeamTable;
