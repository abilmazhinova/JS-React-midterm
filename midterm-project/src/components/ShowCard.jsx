import React from 'react'
import './ShowCard.css'

function ShowCard({ show }) {
  const handleMoreClick = () => {
    if (show.url) {
      window.open(show.url, '_blank')
    }
  }

  return (
    <div className="show-card">
      <img
        src={show.image ? show.image.medium : 'https://via.placeholder.com/210x295?text=No+Image'}
        alt={show.name}
        className="show-image"
      />
      <h3>{show.name}</h3>
      <p>{show.genres?.join(', ') || 'Жанры не указаны'}</p>

      <div className="card-footer">
        <button className="more-btn" onClick={handleMoreClick}>
          More details
        </button>
      </div>
    </div>
  )
}

export default ShowCard
