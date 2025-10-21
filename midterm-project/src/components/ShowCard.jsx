import React from 'react'
import './ShowCard.css'

function ShowCard({ show }) {
  return (
    <div className="show-card">
      <img
        src={show.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image'}
        alt={show.name}
      />
      <div className="show-info">
        <h3>{show.name}</h3>
        <p>{show.genres?.join(', ') || 'Без жанра'}</p>
      </div>
    </div>
  )
}

export default ShowCard
