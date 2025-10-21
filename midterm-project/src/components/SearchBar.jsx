import React from 'react'
import './SearchBar.css'

function SearchBar({ searchTerm, setSearchTerm, onSearch, onRandomize }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') onSearch()
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a TV series..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button className="search-btn" onClick={onSearch}>Search</button>
      <button className="random-btn" onClick={onRandomize}>Randomize</button>
    </div>
  )
}

export default SearchBar
