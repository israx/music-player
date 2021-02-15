import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

export default function Player({
  currentSong,
  isPlaying,
  setPlaying,
  audioRef,
  timeUpdate,
  setTimeUpdate,
  songs,
  setCurrentSong,
  setSongs,
}) {
  function audioHandler() {
    if (isPlaying) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  }

  function timeFormat(time) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  function dragHandler(e) {
    const time = e.target.value;
    setTimeUpdate({ ...timeUpdate, currentTime: time });
    audioRef.current.currentTime = time;
  }

  async function skipControlHandler(direction) {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const lastIndex = songs.length - 1;
    const firstIndex = 0;

    if (direction === "skip-forward") {
      if (currentIndex !== lastIndex) {
        await setCurrentSong(songs[currentIndex + 1]);
        selectedSongHandler(songs[currentIndex + 1]);
      } else {
        await setCurrentSong(songs[0]);
        selectedSongHandler(songs[0]);
      }
    } else if (direction === "skip-backward") {
      if (currentIndex !== firstIndex) {
        await setCurrentSong(songs[currentIndex - 1]);
        selectedSongHandler(songs[currentIndex - 1]);
      } else {
        await setCurrentSong(songs[lastIndex]);
        selectedSongHandler(songs[lastIndex]);
      }
    }

    if (isPlaying) audioRef.current.play();
  }

  function selectedSongHandler(currentSong) {
    const id = currentSong.id;

    const newSongs = songs.map((song) => {
      if (song.id === id) {
        song.active = true;
        return song;
      } else {
        song.active = false;
        return song;
      }
    });

    setSongs(newSongs);

    console.log("Use Effect Running");
  }

  // ----------------------CSS---------------------------

  const inputAnimation = { transform: `translateX(${timeUpdate.animation}%)` };

  const background = {
    background: `linear-gradient(to right, ${currentSong.color[0]},  ${currentSong.color[1]})`,
  };

  return (
    <div>
      <div className="time-control">
        <p>{timeFormat(timeUpdate.currentTime)}</p>
        <div className="track" style={background}>
          <input
            onChange={dragHandler}
            type="range"
            min={0}
            max={timeUpdate.duration || 0}
            value={timeUpdate.currentTime}
          />
          <div className="animate-track" style={inputAnimation}></div>
        </div>

        <p>{timeUpdate.duration ? timeFormat(timeUpdate.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipControlHandler("skip-backward")}
          className="skip-backward"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={audioHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipControlHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
}
