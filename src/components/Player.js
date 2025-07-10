// D:\amusica\client\src\components\Player.js

import React from 'react';
import ReactPlayer from 'react-player/youtube';

const Player = ({ song }) => {
  if (!song) {
    return (
      <div className="player-wrapper">
        <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
          <h4>Select a song from the list to play</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="player-wrapper">
      <ReactPlayer
        key={song.id}
        className="react-player"
        url={song.preview_url}
        width="100%"
        height="100%"
        playing={true}
        controls={true}
      />
    </div>
  );
};

export default Player;