import MatchTable from "../components/match/Table";
import { useState, useEffect } from "react";
import { createMatch, getMatches } from "../services/match";
import CreateMatchModalBody from "../components/match/CreateModal";
import Modal from "../components/common/Modal";

const Match = () => {

    const [matches, setMatches] = useState([]);
    const [form, setForm] = useState({});
    
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        getMatches()
            .then((data) => {setMatches(data)})
            .catch((error) => console.error(error));
    }, []);

    const handleForm = (key, value) => {
        setForm({ ...form, [key]: value });
    }

    const handleCreateMatch = async () => {
        let createdMatch = await createMatch(form)
        
        if (createdMatch) {
            matches.push(createdMatch);
            setIsCreateModalOpen(false);
        }
    }


    
    return (
        <>
        <div className="w-full flex justify-end">
            <div
                onClick={() => setIsCreateModalOpen(true)} 
                className="h-12 w-32 min rounded-lg btn bg-green-600 hover:bg-green-700 text-white mb-4" 
            >
                Add Match
            </div>
        </div>
        <MatchTable matches={matches} />

        <Modal
            isOpen={isCreateModalOpen}
            close={() => setIsCreateModalOpen(false)}
            title="Create New Match"
            size="lg"
        >
            <CreateMatchModalBody
                handleCancel={() => setIsCreateModalOpen(false)}
                handleProceed={handleCreateMatch}
                handleForm={handleForm}
            />
        </Modal>
        </>
    );
}

export default Match;