import { useState } from 'react'
import './App.css'
import { useRef } from 'react'
import VideoPlayer from './VideoPlayer';

function App() {
  const playerRef = useRef(null);
  const videoLink = "http://localhost:8080/uploads/converts/d2c2b21f-6278-401e-a5b3-fb5f47ef6f30/index.m3u8";

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: false,
    width: '800px',
    height: '450px',
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL"
      }
    ]
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <>
      <div>
        <h1>Video Player</h1>
    </div>
      <VideoPlayer
        options={videoPlayerOptions}
        onReady={handlePlayerReady}
      />

    </>
  )
}

export default App
