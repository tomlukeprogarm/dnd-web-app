import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Campaigns from "./Campaigns";
import CharacterSheet from "./CharSheet";
import Notes from "./Notes";
import Profile from "./Profile";
import DiceRoller from "./DiceRoller";

const Dashboard = () => {
  return (
    <Router>
      <>
        <div className="dash-grid">
          <nav className="dash-nav">
            <Link to="/">HOME</Link>
            <Link to="/campaigns">CAMPAIGNS</Link>
            <Link to="/notes">NOTES</Link>
            <Link to="/characters">CHARACTERS</Link>
            <Link to="/dice-roller">DICE ROLLER</Link>
            <Link to="/profile">PROFILE</Link>
          </nav>
          
          <main className='main-content'>
          <h2 className="dash-title">YOUR DND HELPER</h2>
          
       
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/characters" element={<CharacterSheet />} />
          <Route path="/dice-roller" element={<DiceRoller />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        </main>
        </div>
      </>
    </Router>
  );
};

export default Dashboard;
