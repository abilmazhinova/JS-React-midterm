import React, { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import ShowList from './components/ShowList'
import './App.css'

function App() {
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [noResults, setNoResults] = useState(false)
  const [visibleCount, setVisibleCount] = useState(18)

  // сначала загружает список рандомных сериалов 
  useEffect(() => {
    loadRandomShows()
  }, [])

  const loadRandomShows = async () => {
    setLoading(true)
    const response = await fetch('https://api.tvmaze.com/shows')
    const data = await response.json()
    const random = data.sort(() => 0.5 - Math.random()).slice(0, 100)
    setShows(random)
    setVisibleCount(25)// выводит ограниченное количество для начала
    setLoading(false)
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) return
    setLoading(true)
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
    const data = await response.json()
    const mapped = data.map((item) => item.show)
    setShows(mapped)
    setVisibleCount(20)
    setLoading(false)
    setNoResults(mapped.length === 0)
  }

  // если нет результатов — покажет сообщение что нет совпадение и очистится спустя 3 секунды
  useEffect(() => {
    if (noResults) {
      const timer = setTimeout(() => {
        setSearchTerm('')
        setNoResults(false)
        loadRandomShows()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [noResults])

  const handleRandomize = () => {
    loadRandomShows()
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 18)
  }

  return (
    <div className="app">
      <h1>TVMaze Explorer</h1>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        onRandomize={handleRandomize}
      />

      {loading ? (
        <p className="loading">Loading</p>
      ) : noResults ? (
        <p className="no-results">No results for search, clearing in 3 seconds...</p>
      ) : (
        <>
          <ShowList shows={shows.slice(0, visibleCount)} />
          {visibleCount < shows.length && (
            <button className="load-more-btn" onClick={handleLoadMore}>
              Load more
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default App
