import React, { useState, useEffect } from "react";
import "./App.css";
import logoSvg from "./logo.svg";

const tempMusicData = [
  {
    id: 1,
    title: "It's Not Living (If It's Not With You)",
    artist: "The 1975",
    genre: "Indie",
  },
  {
    id: 2,
    title: "See You Again",
    artist: "Tyler, the Creator",
    genre: "Hip Hop",
  },
  {
    id: 3,
    title: "New Flame",
    artist: "Chris Brown, Usher, Rick Ross",
    genre: "R&B",
  },
  {
    id: 4,
    title: "One Of The Girls",
    artist: "The Weeknd, JENNIE, Lily-Rose Depp",
    genre: "Pop",
  },
  {
    id: 5,
    title: "We Found Love",
    artist: "Rihanna, Calvin Harris",
    genre: "Electro House",
  },
  {
    id: 6,
    title: "Perfect Night",
    artist: "LE SSERAFIM",
    genre: "K-Pop",
  },
  {
    id: 7,
    title: "Robbers",
    artist: "The 1975",
    genre: "Indie",
  },
  {
    id: 8,
    title: "Under the Influence",
    artist: "Chris Brown",
    genre: "R&B",
  },
  {
    id: 9,
    title: "Reminder",
    artist: "The Weeknd",
    genre: "R&B",
  },

];

const App = () => {
  const [music, setMusic] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState([]);
  const [query, setQuery] = useState("");

  const addToPlaylist = (song) => {
    setPlaylist([...playlist, song]);
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);

    const filteredMusic = tempMusicData.filter((song) => {
      const { title, artist, genre } = song;
      const normalizedQuery = searchQuery.trim();

      return (
        title.toLowerCase().includes(normalizedQuery) ||
        artist.toLowerCase().includes(normalizedQuery) ||
        genre.toLowerCase().includes(normalizedQuery)
      );
    });

    setMusic(filteredMusic);
  };

  // Calculate summary information
  const summaryData = {
    totalSongs: playlist.length,
    artists: {},
    genres: {},
  };

  // Update summary data based on playlist content
  playlist.forEach((song) => {
    const { artist, genre } = song;

    // Count artists
    if (artist in summaryData.artists) {
      summaryData.artists[artist]++;
    } else {
      summaryData.artists[artist] = 1;
    }

    // Count genres
    if (genre in summaryData.genres) {
      summaryData.genres[genre]++;
    } else {
      summaryData.genres[genre] = 1;
    }
  });

  return (
    <div className="container">
      <nav>
        <div className="logo-container">
          <img src={logoSvg} alt="Music App Logo" className="logo" />
        </div>
        <input
          className="search"
          type="text"
          placeholder="Search by title, artist, or genre..."
          value={query}
          onChange={handleSearch}
        />
      </nav>
      <div className="row">
        <div className="column">
          <h2>MUSIC LIST 🎵</h2>
          <ul className="song-list">
            {music.map((song) => (
              <li key={song.id}>
                <strong>{song.title}</strong> by {song.artist} ({song.genre}){" "}
                <button onClick={() => addToPlaylist(song)}>+</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="column">
          <h2>PLAYLIST 🎧</h2>
          <ul className="playlist">
            {playlist.map((song) => (
              <li key={song.id}>
                {song.title} by {song.artist}
              </li>
            ))}
          </ul>
        </div>
        <div className="column">
          <h2>SUMMARY 📝</h2>
          <p>Total songs in playlist: {summaryData.totalSongs}</p>
          <h3>Artists in Playlist:</h3>
          <ul>
            {Object.entries(summaryData.artists).map(([artist, count]) => (
              <li key={artist}>
                {artist} ({count})
              </li>
            ))}
          </ul>
          <h3>Genres in Playlist:</h3>
          <ul>
            {Object.entries(summaryData.genres).map(([genre, count]) => (
              <li key={genre}>
                {genre} ({count})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;