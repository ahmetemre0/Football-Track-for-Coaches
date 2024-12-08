import ScoreCard from "./ScoreCard";

const MatchTable = ({ matches }) => {
    return (
        <>
        {!matches || matches.length === 0  ?
        (
            <p>No matches available.</p>
        ) : 
        (
        <div className="flex flex-wrap justify-center gap-8">
            { matches.map(match => <ScoreCard key={match.id} match={match} />) }
        </div>
        )}
        </>
    );
}

export default MatchTable;