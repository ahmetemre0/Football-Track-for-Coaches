import React from 'react';

const EditTeamModalBody = (props) => {
    const { handleCancel, handleProceed, currentTeam, handleForm } = props;

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="name" className="block mb-1">Team Name: </label>
                <input
                    type="text"
                    id="name"
                    defaultValue={currentTeam?.name}
                    onChange={(e) => handleForm('name', e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div>
                <label htmlFor="logo" className="block mb-1">Team Photo: </label>
                <input
                    type="file"
                    id="logo"
                    accept="image/*"
                    onChange={(e) => handleForm('logo', e.target.files[0])}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="join flex justify-end">
                <button onClick={handleCancel} className="btn btn-ghost border-slate-700 join-item">
                    Cancel
                </button>
                <button onClick={handleProceed} className="btn bg-amber-400 hover:bg-amber-500 border-slate-700 text-white join-item">
                    Edit
                </button>
            </div>
        </div>
    )
}

export default EditTeamModalBody;