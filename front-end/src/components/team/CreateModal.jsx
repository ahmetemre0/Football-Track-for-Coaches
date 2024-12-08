import React from 'react';

const CreateTeamModalBody = (props) => {
    const { handleCancel, handleProceed, handleForm } = props;

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="name" className="block mb-1">Team Name: </label>
                <input
                    type="text"
                    id="name"
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
                <button onClick={handleProceed} className="btn bg-green-600 hover:bg-green-700 border-slate-700 text-white join-item">
                    Create
                </button>
            </div>
        </div>
    )
}

export default CreateTeamModalBody;