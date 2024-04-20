import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSpotify from './Components/LoginSpotify/LoginSpotify';
import Callback from './Components/LoginSpotify/CallBack';
import ArtistSearch from './Components/ArtistSearch/ArtistSearch';
import ArtistAlbum from './Components/ArtistAlbum/ArtistAlbum';

function App() {
  return (
    <div>

    <Router>
      <Routes>
      <Route index element={<LoginSpotify/>} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/artistsearch" element={<ArtistSearch />}/>
      <Route path="/artistalbum/:artistId" element={<ArtistAlbum />}/>
      </Routes>
    </Router>
  </div>
  );
}

export default App;
