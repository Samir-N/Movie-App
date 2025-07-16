import React from 'react'

const Cards = ({movie:{title,id,poster_path,original_title,vote_average,release_date}}) => {
  return (
    <div className='movie-card'>
      <img src={poster_path?
       `https://image.tmdb.org/t/p/w500${poster_path}`
      :      
      './no-movie.png'} 
      alt={title}/>
      <div className="mt-4">
      <h2>{original_title}</h2>
      
      </div>

      <div className="content">
        <div className="rating">
          <img src="../src/assets/icons/Rating.png" alt="" />
      <p>{Number(vote_average.toFixed(1))}</p>

      </div>
      <p className='year'>{release_date?release_date.split('-')[0]:'N/A'}</p>

      </div>
    </div>
  )
}

export default Cards
