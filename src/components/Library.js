import React from "react";
import LibrarySong from "./LibrarySong";

export default function Library({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) {
  return (
    <div className={`library ${libraryStatus ? "active" : ""}`}>
      <h2>Library</h2>
      {songs.map((song) => (
        <LibrarySong
          song={song}
          key={song.id}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setSongs={setSongs}
          songs={songs}
        />
      ))}
    </div>
  );
}
