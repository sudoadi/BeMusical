import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player/youtube';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiSkipBack, FiSkipForward } from 'react-icons/fi';

const formatTime = (seconds) => {
  if (isNaN(seconds)) return '00:00';
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, '0');
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
  }
  return `${mm}:${ss}`;
};

const CustomPlayer = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);

  const playerRef = useRef(null);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleVolumeChange = (e) => setVolume(parseFloat(e.target.value));
  const handleMute = () => {
    setIsMuted(!isMuted);
    // If unmuting and volume was 0, set it to a default value
    if (isMuted && volume === 0) {
      setVolume(0.5);
    }
  };
  const handleProgress = (state) => setPlayed(state.played);
  const handleDuration = (duration) => setDuration(duration);
  
  const handleSeekMouseDown = (e) => {
    // Optional: Pause while seeking
  };
  
  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };
  
  const handleSeekMouseUp = (e) => {
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  if (!song) {
    return null; // Don't render anything if no song is selected
  }

  return (
    <div className="beautiful-player-wrapper">
      <div className="hidden-player">
        <ReactPlayer
          ref={playerRef}
          url={song.preview_url}
          playing={isPlaying}
          volume={volume}
          muted={isMuted}
          onProgress={handleProgress}
          onDuration={handleDuration}
          width="100%"
          height="100%"
        />
      </div>

      <div className="player-content">
        <div className="player-track-info">
          <img src={song.album.images[0]?.url} alt={song.name} />
          <div>
            <h4>{song.name}</h4>
            <p>{song.artists[0]?.name}</p>
          </div>
        </div>

        <div className="player-main-controls">
          <div className="playback-buttons">
            <button className="skip-button"><FiSkipBack /></button>
            <button className="play-pause-button" onClick={handlePlayPause}>
              {isPlaying ? <FiPause /> : <FiPlay />}
            </button>
            <button className="skip-button"><FiSkipForward /></button>
          </div>
          <div className="progress-container">
            <span className="time-display">{formatTime(played * duration)}</span>
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={played}
              onMouseDown={handleSeekMouseDown}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
              className="progress-bar"
            />
            <span className="time-display">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="player-volume-controls">
          <button onClick={handleMute}>
            {isMuted || volume === 0 ? <FiVolumeX /> : <FiVolume2 />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomPlayer;