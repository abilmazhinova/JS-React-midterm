import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import ShowList from "./components/ShowList";
import "./App.css";

function App() {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredShows, setFilteredShows] = useState([]);
  const [genre, setGenre] = useState("All");
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);

  // загрузка всех шоу при старте
  useEffect(() => {
    loadShows();
  }, []);

  const loadShows = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.tvmaze.com/shows");
      const data = await res.json();
      setShows(data);
      setFilteredShows(data);
      setVisibleCount(20);
    } catch (err) {
      console.error("Ошибка загрузки данных:", err);
    } finally {
      setLoading(false);
    }
  };

  // поиск и фильтрация по жанрам
  const handleSearch = () => {
    if (!searchTerm.trim() && genre === "All") return;

    setLoading(true);

    const nameFiltered = shows.filter((show) =>
      show.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const genreFiltered =
      genre === "All"
        ? nameFiltered
        : nameFiltered.filter((show) => show.genres.includes(genre));

    setFilteredShows(genreFiltered);
    setVisibleCount(20);
    setLoading(false);
    setNoResults(genreFiltered.length === 0);

    if (genreFiltered.length === 0) {
      setTimeout(() => {
        setSearchTerm("");
        setNoResults(false);
        loadShows();
      }, 3000);
    }
  };

  const handleRandom = () => {
    const randomShows = [...shows].sort(() => 0.5 - Math.random()).slice(0, 100);
    setFilteredShows(randomShows);
    setVisibleCount(20);
  };

  // загружает еще 20 штук рандомных сериалов
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  return (
    <div className="App">
      <h1>TV Show Explorer</h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        onRandom={handleRandom}
        genre={genre}
        setGenre={setGenre}
      />

      {loading ? (
        <p className="loading">Loading...</p>
      ) : noResults ? (
        <p className="no-results">
          No results found. Resetting in 3 seconds...
        </p>
      ) : (
        <>
          <ShowList shows={filteredShows.slice(0, visibleCount)} />

          {visibleCount < filteredShows.length && (
            <div className="card-footer">
              <button className="more-btn" onClick={handleLoadMore}>
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
