import ScoreCard from "./ScoreCard";

const MatchTable = (props) => {

    const { matches, onMatchClick } = props;

    return (
        <>
            {!matches || matches.length === 0 ?
                (
                    <p>No matches available.</p>
                ) :
                (
                    <div className="flex flex-wrap justify-center gap-8">
                        {matches.map(match => <ScoreCard key={match.matchID} match={match} onClick={() => onMatchClick(match)} />)}
                    </div>
                )}
        </>
    );
}

export default MatchTable;