import { useState, useEffect } from "react";

import { getPlayers, createPlayer, updatePlayer, deletePlayer } from "../services/player";

import Modal from "../components/common/Modal";
import PlayerTable from "../components/player/Table";
import CreatePlayerModalBody from "../components/player/CreateModal";
import EditPlayerModalBody from "../components/player/EditModal";
import DeletePlayerModalBody from "../components/player/DeleteModal";


const Team = () => {
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [players, setPlayers] = useState([]);

    const [form, setForm] = useState({});

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleForm = (key, value) => {
        setForm({ ...form, [key]: value });
    }

    const handleDeletePlayer = async () => {
        let response = await deletePlayer(currentPlayer?.ID);
        if (response.success) {
          setPlayers((players) => players.filter((player) => player.ID !== currentPlayer.ID));
          setIsDeleteModalOpen(false);
        }
    };
    const handleEditPlayer = async () => {
        let updatedPlayer = await updatePlayer(currentPlayer.ID, form);

        if (updatedPlayer){
            setPlayers((players) => players.map((player) => player.ID === currentPlayer.ID ? updatedPlayer : player));
            setIsEditModalOpen(false);
        }
    };
    const handleCreatePlayer = async () => {
        let createdPlayer = await createPlayer(form)
        
        if (createdPlayer) {
            players.push(createdPlayer);
            setIsCreateModalOpen(false);
        }
    }

    useEffect(() => {
        getPlayers()
            .then((data) => {setPlayers(data)})
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
        
        <div>
            {!players || players.length === 0  ? (
                <p>No players available.</p>
            ) : (
                <>
                <div className="w-full flex justify-end">
                    <div
                        onClick={() => setIsCreateModalOpen(true)} 
                        className="h-12 w-32 min rounded-lg btn bg-green-600 hover:bg-green-700 text-white mb-4" 
                    >
                        Add Player
                    </div>
                </div>
                <div className="">
                    <PlayerTable 
                        players={players}
                        openEditModal={(player) => {setCurrentPlayer(player); setIsEditModalOpen(true)}}
                        openDeleteModal={(player) => {setCurrentPlayer(player); setIsDeleteModalOpen(true)}}
                    >

                    </PlayerTable>
                </div>
                </>
            )}
        </div>

        <Modal
            isOpen={isCreateModalOpen}
            close={() => setIsCreateModalOpen(false)}
            title="Create New Team"
        >
            <CreatePlayerModalBody
                handleCancel={() => setIsCreateModalOpen(false)}
                handleProceed={handleCreatePlayer}
                handleForm={handleForm}
            />
        </Modal>

        <Modal 
            isOpen={isDeleteModalOpen}
            close={() => setIsDeleteModalOpen(false)}
            title={`Delete ${currentPlayer?.name}`}
        >
            <DeletePlayerModalBody 
                handeCancel={() => setIsDeleteModalOpen(false)}
                handleProceed={handleDeletePlayer}
            />
        </Modal>

        <Modal
            isOpen={isEditModalOpen}
            close={() => setIsEditModalOpen(false)}
            title={`Edit ${currentPlayer?.name}`}
        >
            <EditPlayerModalBody
                handleCancel={() => setIsEditModalOpen(false)}
                handleProceed={handleEditPlayer}
                currentPlayer={currentPlayer}
                handleForm={handleForm}
            />
        </Modal>
        </>
    );
};

export default Team;
