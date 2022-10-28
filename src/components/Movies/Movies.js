import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import { api } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

const Movie = (props) => {
  const { logedIn, savedMovies } = props;
  const [preloaderShown, setPreloaderShown] = React.useState(false);
  const [textShown, setTextShown] = React.useState(false);
  const [errorShown, setErrorShown] = React.useState(false);
  const [moviesList, setMoviesList] = React.useState([]);
  const [shortMovie, setShortMovie] = React.useState(false);
  const [savedCards, setSavedCards] = React.useState([]);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    mainApi.getMovies(jwt)
      .then((res) => {
        setSavedCards(res);
      })
      .catch((err) => {
        console.log(err)
      })
      // console.log(jwt);
  }, [])

  const searchMovies = (searchkey) => {
    setTextShown(false);
    setErrorShown(false);
    setPreloaderShown(true)
    if (!savedMovies) {
      api.getMovies()
        .then((res) => {
          localStorage.setItem('allmovies', JSON.stringify(res));
          defineMovies(res, searchkey);
        })
        .catch(() => {
          setErrorShown(true);
        })
        .finally(() => {
          setPreloaderShown(false)
        })
    } else {
      defineMovies(savedMovies, searchkey);
      setPreloaderShown(false);
    }
  }

  const defineMovies = (data, searchkey) => {
    const moviesList = data.filter((movie) => {
      if (movie.nameRU.toLowerCase().includes(searchkey.toLowerCase())) {
        if (shortMovie) {
          return movie.duration <= 40;
        }
        console.log(movie, 'movie в defineMovies');
        return movie;
      }
      // console.log(movie);
      return false;
    });
    if (moviesList.length === 0) {
      setTextShown(true);
    }
    setMoviesList(moviesList); //
    console.log(data, 'data в defineMovies');
    console.log(moviesList, 'moviesList в defineMovies');
  }

  const filterMovies = () => {
    setShortMovie(!shortMovie);
    if (moviesList.length > 0) {
      if (!shortMovie) {
        const movies = moviesList.filter((movie) => {
          return movie.duration <= 40;
        });
        setMoviesList(movies);
        if (movies.length === 0) {
          setTextShown(true);
        } else {
          setTextShown(false);
        }
      } else {
        const originalMovies = JSON.parse(localStorage.getItem('allmovies'))
        setMoviesList(originalMovies);
        console.log(originalMovies);
      }
    }
  }

  return (
    <>
      <Header
        logedIn={logedIn}
      />
      <main className='content content_state_logedin movies'>
        <SearchForm
          place='allmovies'
          onSubmit={searchMovies}
          onCheckbox={filterMovies}
          checkboxValue={shortMovie}
        />
        {preloaderShown && <Preloader />}
        {moviesList.length === 0 && textShown && <p className='movies__text'>Ничего не найдено</p>}
        {errorShown && <p className='movies__text movies__text_type_error'>Во время запроса произошла ошибка. Возможно сервер недоступен или есть проблема с соединением. Попробуйте еще раз попозже.</p>}
        <MoviesCardList
          place='allmovies'
          moviesList={moviesList}
          savedCards={savedCards}
        />
      </main>
      <Footer
      />
    </>
  );
};

export default Movie;
