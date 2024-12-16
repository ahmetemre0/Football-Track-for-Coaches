import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-green-600 text-white">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/players" className="hover:underline">Players</Link></li>
          <li><Link to="/teams" className="hover:underline">Teams</Link></li>
          <li><Link to="/match" className="hover:underline">Matches</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

