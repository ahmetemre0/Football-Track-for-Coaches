import { API_BASE_URL } from "../../services/common";

const ScoreCard = (props) => {

    const { match, onClick } = props;

    const { homeTeamName, awayTeamName,
            homeTeamLogo, awayTeamLogo, 
            homeScore, awayScore } = match;

    const played = homeScore !== null && awayScore !== null;

    const homeWon = homeScore > awayScore;
    const awayWon = awayScore > homeScore
    const draw = homeScore === awayScore;
    
    return (
        <div onClick={() => onClick(match)} className="stats shadow-xl w-4/5 grid grid-cols-7 hover:bg-slate-200 hover:cursor-pointer">
            <div className="stat col-span-3 flex justify-between">
                <div className="stat-figure">
                    <div className="rounded-full">
                        <div className="w-16 rounded-full">
                            <img alt="Team logo" src={`${API_BASE_URL}${homeTeamLogo}`} />
                        </div>
                    </div>
                </div>
                <div className={`stat-value !text-3xl flex flex-wrap content-center truncate
                    ${homeWon ? 'text-green-700' : ''}
                    ${awayWon ? 'text-red-700' : ''}
                    ${draw ? 'text-yellow-400' : ''}
                    ${played ? '' : '!text-black'}

                    
                    `}>
                    {homeTeamName} 
                </div>
            </div>

            <div className="stat">
                <div className="stat-value text-center content-center">
                    {played ? `${homeScore}-${awayScore}`: 'VS'}
                </div>
            </div>

            <div className="stat col-span-3 flex justify-between">
                <div className={`stat-value !text-3xl flex flex-wrap content-center truncate
                        ${awayWon ? 'text-green-700' : ''}
                        ${homeWon ? 'text-red-700' : ''}
                        ${draw ? 'text-yellow-400' : ''}
                        ${played ? '' : '!text-black'}
                        
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