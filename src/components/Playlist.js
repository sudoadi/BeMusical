import React from 'react';
import { FiX } from 'react-icons/fi'; // Import close icon

// Add onClose prop
const Playlist = ({ isOpen, onClose, playlist, onSongSelect, currentSong }) => {
  const className = `playlist-sidebar-iOS ${isOpen ? 'open' : ''}`;

  return (
    <div className={className}>
      <div className="playlist-header-iOS">
        <h2>My Playlist</h2>
        {/* The close button is now inside the sidebar */}
        <button className="playlist-close-button-iOS" onClick={onClose}>
          <FiX />
        </button>
      </div>
      <div className="playlist-content-iOS">
        {playlist.length === 0 ? (
          <p className="empty-playlist-text">Add songs to your playlist!</p>
        ) : (
          playlist.map((song, index) => {
            const isPlaying = currentSong?.id === song.id;
            return (
              <div 
                key={`${song.id}-${index}`} 
                className={`playlist-item-iOS ${isPlaying ? 'playing' : ''}`} 
                onClick={() => onSongSelect(song)}
              >
                <img src={song.album.images[0]?.url} alt={song.name} />
                <div className="playlist-item-details">
                  <h4>{song.name}</h4>
                  <p>{song.artists[0].name}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Playlist;