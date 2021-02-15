import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

export default function Nav({ setLibraryStatus, libraryStatus }) {
  return (
    <nav className="nav">
      <h1>Waves</h1>

      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Libray
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
}
