import React, { useState } from 'react';
import { FiList } from 'react-icons/fi';
import Discover from './components/Discover';
import Playlist from './components/Playlist';
import CustomPlayer from './components/CustomPlayer';
import './App.css';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

  const selectSong = (song) => {
    setCurrentSong(song);
  };

  const addToPlaylist = (song) => {
    if (!playlist.find(p => p.id === song.id)) {
      setPlaylist([...playlist, song]);
    }
  };

  const appStyle = {
    backgroundImage: currentSong ? `url(${currentSong.album.images[0]?.url})` : 'none',
  };

  return (
    <div className="App-iOS" style={appStyle}>
      <div className="app-overlay-iOS">
        <header className="App-header-iOS">
          <h1>BeMusical 🎵</h1>
          {/* This button now lives outside the sidebar logic */}
          <button className="playlist-toggle-button-iOS" onClick={() => setIsPlaylistOpen(true)}>
            <FiList /> My Playlist
          </button>
        </header>

        {/* Add a class to the main content when the playlist is open */}
        <main className={`main-content-iOS ${isPlaylistOpen ? 'playlist-open' : ''}`}>
          <Discover 
            onSongSelect={selectSong}
            onAddToPlaylist={addToPlaylist}
            currentSong={currentSong}
          />
        </main>
        
        <Playlist 
          isOpen={isPlaylistOpen}
          onClose={() => setIsPlaylistOpen(false)} // Pass a close handler
          playlist={playlist} 
          onSongSelect={selectSong} 
          currentSong={currentSong} 
        />
        
        <CustomPlayer song={currentSong} />
      </div>
    </div>
  );
}

export default App;