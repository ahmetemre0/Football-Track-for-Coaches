import FootballPitch from '../components/game/FootballPitch'
import PlayerList from '../components/game/PlayerList'

const team1 = [
    { id: 1, name: "Lionel Messi", number: 10, photo: "/players/messi.jpg" },
    { id: 2, name: "Cristiano Ronaldo", number: 7, photo: "/players/ronaldo.jpg" },
]

const team2 = [
    { id: 3, name: "Neymar Jr.", number: 11, photo: "/players/neymar.jpg" },
    { id: 4, name: "Kylian Mbappé", number: 9, photo: "/players/mbappe.jpg" },
    { id: 5, name: "Kevin De Bruyne", number: 17, photo: "/players/debruyne.jpg" },
]

const Game = () => {
    return (
        <main className="flex min-h-screen items-center justify-between p-24">
            <PlayerList players={team1} />
            <FootballPitch />
            <PlayerList players={team2} />
        </main>
    )
}

export default Game
