import React, { useEffect, useState } from 'react';
import {useDebounce} from 'react-use';
import SearchBar from './components/SearchBar';
import Cards from './components/Cards';
import { updateSearchCount,getTrendingMovies } from '../public/Appwrite.js';

const App = () => {
  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const [searchTerm, setSearchTerm] = useState('');
  const[debounceSearchTerm,setDebounceSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [trendingMovies,setTrendingMovies] = useState([]);
  const [trendingError,setTrendingError] = useState(null);
  const [trendingLoading,setTrendingLoading] = useState(false);
  

  const fetchData = async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Error fetching data');
      }

      const data = await response.json();
      console.log(data);
      setMovies(data.results || []);

      if(query && data.results.length>0)
      {
        console.log("Called");

        await updateSearchCount(query,data.results[0]);
      }

    } catch (err) {
      console.log(`ERROR FETCHING MOVIES ${err}`);
      setError('Unable to fetch movies');
    } finally {
      setLoading(false);
    }
  };

    const loadTrendingMovies = async() => {
      setTrendingError(null);
      setTrendingLoading(true);

    try{

    

      const movies = await getTrendingMovies();
      setTrendingMovies(movies);

    }

    catch(err){
      console.log(err);
      setTrendingError("Unable to fetch Trending movies");
    }

    finally{
      setTrendingLoading(false);
    }
    }

  useDebounce(()=>{
    setDebounceSearchTerm(searchTerm);
  },1000,[searchTerm]);

  useEffect(() => {
    fetchData(debounceSearchTerm);
  }, [debounceSearchTerm]);

  useEffect(()=>{loadTrendingMovies()},[]);

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="../src/assets/images/hero-img.png" alt="Hero" />
            <h1>
              Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
            </h1>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          {trendingMovies.length>0 && 
            (
            <section className='trending'>
              <h2>Trending Movies</h2>

              <ul>
                {
                  trendingLoading?"Loading Trending Movies":
                  (trendingError?
                  <p className="text-red-500">{error}</p>
                  :
                  trendingMovies.map((movie,index)=>(
                    <li key={index}>

                      <p>{index+1}</p>
                      <img src={movie.poster_URL} alt={movie.title} />

                    </li>
                  ))
                  )
                  
                  
                  
                }
              </ul>
              </section>
            )
          }

          <section className='all-movies'>
            <h2>All Movies</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <ul>
                {movies.map((movie) => (
                  <Cards key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default App;
