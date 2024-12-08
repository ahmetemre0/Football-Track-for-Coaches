import Player from "./Player"

const PlayerList = ({ players }) => {
    return (
        <div className="h-full overflow-hidden">
            <div className="h-full overflow-y-auto">
                {players.map((player) => (
                    <Player
                        key={player.id}
                        photo={player.photo}
                        name={player.name}
                        number={player.number}
                    />
                ))}
            </div>
        </div>
    )
}

export default PlayerList
