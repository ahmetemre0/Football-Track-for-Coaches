import { API_BASE_URL } from "../../services/common";

const ScoreCard = ({ match }) => {
    const { homeTeamName, awayTeamName,
            homeTeamLogo, awayTeamLogo, 
            homeScore, awayScore } = match;

    const homeWon = homeScore > awayScore;
    const awayWon = awayScore > homeScore
    const draw = homeScore === awayScore;

    
    
    return (
        <div className="stats shadow-xl">
            <div className="stat flex justify-center">
                <div className="stat-figure">
                    <div className="rounded-full">
                        <div className="w-16 rounded-full">
                            <img alt="Team logo" src={`${API_BASE_URL}${homeTeamLogo}`} />
                        </div>
                    </div>
                </div>
                <div className={`stat-value flex flex-wrap content-center 
                    ${homeWon ? 'text-green-700' : ''}
                    ${awayWon ? 'text-red-700' : ''}
                    ${draw ? 'text-yellow-400' : ''}
                    
                    `}>
                    {homeTeamName} 
                </div>
            </div>

            <div className="stat">
                <div className="stat-value flex flex-wrap content-center">
                    {`${homeScore}-${awayScore}`}
                </div>
            </div>

            <div className="stat flex justify-center">
            <div className={`stat-value flex flex-wrap content-center 
                    ${awayWon ? 'text-green-700' : ''}
                    ${homeWon ? 'text-red-700' : ''}
                    ${draw ? 'text-yellow-400' : ''}
                    
                    `}>
                    {awayTeamName} 
                </div>
                <div className="stat-figure">
                    <div className="rounded-full">
                        <div className="w-16 rounded-full">
                            <img alt="Team logo" src={`${API_BASE_URL}${awayTeamLogo}`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScoreCard;