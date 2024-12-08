import { useState, useEffect } from "react";

import { getPlayers, createPlayer } from "../services/player";

import Modal from "../components/common/Modal";
import PlayerTable from "../components/player/Table";
import CreatePlayerModalBody from "../components/player/CreateModal";

const Team = () => {
    const [players, setPlayers] = useState([]);

    const [form, setForm] = useState({});
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleForm = (key, value) => {
        setForm({ ...form, [key]: value });
    }

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
                    <PlayerTable playerList={players}></PlayerTable>
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
        </>
    );
};

export default Team;
