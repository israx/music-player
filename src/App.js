import React, { useState, useRef } from "react";
// importing Styles
import Song from "./components/Song";
import "./styles/app.scss";
import data from "./data";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeUpdate, setTimeUpdate] = useState({
    currentTime: 0,
    duration: 0,
    animation: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  function timeUpdateHandler(e) {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    const animationPercentage = Math.round((currentTime / duration) * 100);

    setTimeUpdate((prev) => ({
      ...prev,
      currentTime,
      duration,
      animation: animationPercentage,
    }));
  }

  async function songEndHandler() {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const lastIndex = songs.length - 1;

    if (currentIndex !== lastIndex) {
      await setCurrentSong(songs[currentIndex + 1]);
      audioRef.current.play();
    } else {
      await setCurrentSong(songs[0]);
      audioRef.current.play();
    }
  }

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />

      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setPlaying={setIsPlaying}
        timeUpdate={timeUpdate}
        setTimeUpdate={setTimeUpdate}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
      />
      <Library
        libraryStatus={libraryStatus}
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
      />

      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
