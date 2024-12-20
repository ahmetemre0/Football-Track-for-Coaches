import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Team from './pages/Team';
import Player from './pages/Player';
import Game from './pages/Game';
import Match from './pages/Match';
import { Toaster } from 'react-hot-toast';

function App() {
  return (

    <Router>
      <Toaster />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/teams' element={<Team />} />
            <Route path='/players' element={<Player />} />
            <Route path='/game/' element={<Game />} />
            <Route path='/match' element={<Match />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>

  );
}

export default App;

