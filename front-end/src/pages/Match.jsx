import ScoreCard from "../components/match/ScoreCard";
import { useState, useEffect } from "react";
import { getMatches } from "../services/match";

const Match = () => {

    const [matches, setMatches] = useState([]);

    useEffect(() => {
        getMatches()
            .then((data) => {setMatches(data)})
            .catch((error) => console.error(error));
    }, []);
    
    return (
        <>
        {!matches || matches.length === 0  ?
        (
            <p>No matches available.</p>
        ) : 
        (
            matches?.map((match) => (
                <ScoreCard key={match.ID} match={match} />
            ))
        )}
        </>
    );
}

export default Match;