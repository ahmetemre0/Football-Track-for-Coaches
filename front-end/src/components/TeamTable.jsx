import React, { useState } from 'react';
import { FaTrash, FaEdit  } from "react-icons/fa";

import { deleteTeam } from '../services/team';
import { API_BASE_URL } from '../services/api';

const TeamTable = ({ teams }) => {

    const [currentTeam, setCurrentTeam] = useState(null);

    const openEditModal = (team) => {
        setCurrentTeam(team);
        document.getElementById('edit_modal').showModal();
    }
    
    const openDeleteModal = (team) => {
        setCurrentTeam(team);
        document.getElementById('delete_modal').showModal();
    }

    const deleteCurrentTeam = () => {
        
        // call deleteTeam service
        deleteTeam(currentTeam?.ID)

        // close modal
        document.getElementById('delete_modal').close();

        // refresh page
        window.location.reload();
    }


    return (
        <>
        <div className='flex flex-wrap justify-center gap-8'   >
            {
            teams.map((team) => (
                <div key={team.ID} className="card card-compact bg-base-200 w-96 shadow-xl">
                    <figure>
                        <img
                        src={`${API_BASE_URL}${team.logo}`}
                        alt="Team Logo" 
                        className='w-96 h-96 object-cover'
                         />
                        
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{team.name}</h2>
                        <div className="card-actions justify-end">
                            <div className='h-12 w-12 min rounded-lg me-2 btn bg-amber-400 hover:bg-amber-500'
                                onClick={()=>openEditModal(team)}>
                                <FaEdit className='text-white'/>
                            </div>
                            <div className='h-12 w-12 min rounded-lg btn bg-red-600 hover:bg-red-700'
                                onClick={()=>openDeleteModal(team)}>
                                <FaTrash className='text-white'/>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </div>

        <dialog id="delete_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Delete {currentTeam?.name}</h3>
                <p className="py-4">Are you sure you want to delete this team? <br/> <em>Players of this team will also be deleted.</em></p>
                <div className='join flex justify-end'>
                    <form method="dialog">
                        <button className='btn btn-ghost border-slate-700 join-item'>Cancel</button>
                    </form>
                    <div onClick={() => deleteCurrentTeam()} className='btn bg-red-600 hover:bg-red-700 border-slate-700 text-white join-item'>Delete</div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>

        <dialog id="edit_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click outside to close</p>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
        
        </>
    );
};

export default TeamTable;