import { useState, useEffect } from "react";
import { getTeams } from "../services/team";
import TeamTable from "../components/TeamTable";

const Team = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        // get teams from the service
        getTeams()
            .then((ret_teams) => {setTeams(ret_teams)})
            .catch((error) => console.error(error));

    }, []);

    return (
        <div>
            {!teams || teams.length === 0  ? (
                <p>No teams available.</p>
            ) : (
                <div className="">
                    <TeamTable teams={teams}></TeamTable>
                </div>
            )}
        </div>
    );
};

export default Team;
