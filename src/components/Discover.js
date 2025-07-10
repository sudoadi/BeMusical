import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SongList from './SongList';

const Discover = ({ onSongSelect, onAddToPlaylist, currentSong }) => {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial discover songs on component mount
  useEffect(() => {
    const fetchDiscoverSongs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/discover');
        setSongs(response.data.tracks.items);
      } catch (error) {
        console.error("Error fetching discover songs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDiscoverSongs();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/search?q=${query}`);
      setSongs(response.data.tracks.items);
    } catch (error) {
      console.error("Error searching for songs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="discover-page">
      <form onSubmit={handleSearch} className="animated-search-form">
        <input
          type="text"
          placeholder="Search for songs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="animated-search-bar"
        />
      </form>

      {isLoading ? (
        <p className="loading-text">Loading songs...</p>
      ) : (
        <SongList
          songs={songs}
          onSongSelect={onSongSelect}
          onAddToPlaylist={onAddToPlaylist}
          currentSong={currentSong}
        />
      )}
    </div>
  );
};

export default Discover;