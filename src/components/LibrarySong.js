import React from "react";
export default function LibrarySong({
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  songs,
}) {
  async function currentSongHandler() {
    await setCurrentSong(song);

    const id = song.id;
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

    if (isPlaying) audioRef.current.play();
  }

  return (
    <div
      className={`song-library-container  ${song.active ? "selected" : ""}`}
      onClick={currentSongHandler}
    >
      <img src={song.cover} alt={song.name} />
      <h3>{song.name}</h3>
      <h4>{song.artist}</h4>
    </div>
  );
}
