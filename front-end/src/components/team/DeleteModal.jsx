import React from 'react';

const DeleteTeamModalBody = (props) => {
    const { handleCancel, handleProceed } = props;
    return (
        <div>
            <p className="py-4">
            Are you sure you want to delete this team? <br />{" "}
            <em>Players of this team will also be deleted.</em>
            </p>
            <div className="join flex justify-end">
                <button onClick={handleCancel} className="btn btn-ghost border-slate-700 join-item">
                Cancel
                </button>
                <div onClick={handleProceed} className="btn bg-red-600 hover:bg-red-700 border-slate-700 text-white join-item">
                Delete
                </div>
            </div>
        </div>
    );
};

export default DeleteTeamModalBody;