import React from 'react';
import './searchbar.css';

const SearchBar = ({ searchTerm, setSearchTerm, onSearch, onRandom, genre, setGenre }) => {
  const genres = [
    "All",
    "Drama",
    "Comedy",
    "Action",
    "Thriller",
    "Romance",
    "Horror",
    "Science-Fiction",
    "Adventure",
    "Fantasy",
    "Mystery",
  ];

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for TV shows..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        className="genre-select"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <button className="search-btn" onClick={onSearch}>
        Search
      </button>

      <button className="random-btn" onClick={onRandom}>
        Randomize
      </button>
    </div>
  );
};

export default SearchBar;
