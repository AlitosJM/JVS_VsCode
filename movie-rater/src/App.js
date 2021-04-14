import React, {useState,useEffect} from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import {useCookies} from 'react-cookie'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import {useFetch} from './hooks/useFetch';

function App() {
  const TOKEN ='f77ba2661f8b49954ff751540d18bc95d9e864bd'
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token,setToken,deleteToken] = useCookies(['mr-token']);

  const [data,loading,error] = useFetch();

  useEffect( () => {
    console.log(data);
    console.log(error);
    console.log('error uuahh');
    setMovies(data);
  },[data] );

// useEffect( () => {
//   fetch("http://127.0.0.1:8000/api/movies/", {
//         method:'GET',
//         headers:{
//           'Content-Type':'application/json',
//           'Authorization':`Token ${token['mr-token']}`
//         }      
//       })
//       .then( resp => resp.json() )
//       .then( resp => setMovies(resp) )
//       .catch( error => console.log(error))
//   },[])

  useEffect( () => {
      // console.log(token);
      if (!token['mr-token']) window.location.href ='/';
  },[token]);

    
  const loadMovie = movie =>{ 
      setSelectedMovie(movie); 
      setEditedMovie(null);}

  const editClicked = movie =>{ 
      setEditedMovie(movie); 
      setSelectedMovie(null);}

  const updatedMovie = movie =>{ 
    const newMovies = movies.map( mov =>{
      if (mov.id === movie.id){
        return movie;
      }
      return mov;
    })
    setMovies(newMovies);
  }  

  const newMovie = () =>{
    setEditedMovie({title: '',description: ''});
    setSelectedMovie(null);
  }

  const movieCreated = movie =>{
    const newMovies =[...movies, movie];
    setMovies(newMovies);
  }

  const removeClicked = movie =>{
    const newMovies = movies.filter( mov => mov.id !== movie.id);
    setMovies(newMovies);
  }

  const logoutUser = () =>{
    deleteToken(['mr-token']);
  }

if (error) 
{   logoutUser();    
    window.location.href ='/';
    return <h1> Error loading movies</h1>  ;
}
if (loading) return <h1> Loading...</h1>

  return (
    <div className="App">

      <header className="App-header">
        <h1> 
          <FontAwesomeIcon icon={faFilm}/>
            <span> Movie rater </span>
        </h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser}/>
      </header>

      <div className="layout">
        <div>
          <MovieList 
          movies={movies} 
          movieClicked={loadMovie} 
          editClicked ={editClicked} 
          removeClicked ={removeClicked}/>
          <button onClick={newMovie}> New Movie </button>
        </div>
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
        {editedMovie ? <MovieForm movie={editedMovie} updatedMovie={updatedMovie} movieCreated={movieCreated}
        /> : null}
        
        </div>

    </div>
  );
}

export default App;
