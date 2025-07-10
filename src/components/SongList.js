import React from 'react';
// Make sure both FiPlayCircle and FiPlusCircle are imported
import { FiPlayCircle, FiPlusCircle } from 'react-icons/fi';

const SongList = ({ songs, onSongSelect, onAddToPlaylist, currentSong }) => {
  return (
    <div className="song-grid">
      {songs.map((song) => {
        const isPlaying = currentSong?.id === song.id;
        
        return (
          <div key={song.id} className={`song-item-card ${isPlaying ? 'playing' : ''}`}>
            
            <div className="card-image-container">
              <img src={song.album.images[0]?.url} alt={song.name} />
              
              <button className="card-play-button" onClick={() => onSongSelect(song)}>
                <FiPlayCircle />
              </button>
            </div>

            <div className="song-details">
              <h4>{song.name}</h4>
              <p>{song.artists.map(artist => artist.name).join(', ')}</p>
            </div>
            
            {/* THIS BUTTON IS NOW ADDED BACK */}
            <button className="card-add-button" onClick={() => onAddToPlaylist(song)}>
                <FiPlusCircle />
            </button>

          </div>
        );
      })}
    </div>
  );
};

export default SongList;