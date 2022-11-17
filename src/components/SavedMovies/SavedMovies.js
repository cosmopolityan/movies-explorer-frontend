import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import { mainApi } from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

import { ShortFilmDuration/*, LargeScreenMoviesAmount, MediumScreenMoviesAmount, SmallScreenMoviesAmount, LargeScreenAddMoviesAmount, SmallScreenAddMoviesAmount */} from '../../utils/constants.js';

const SavedMovies = (props) => {
  const { logedIn } = props;
  const [textShown, setTextShown] = React.useState(false);
  const [noMovies, setNoMovies] = React.useState(false);
  const [errorShown, setErrorShown] = React.useState(false);
  const [moviesList, setMoviesList] = React.useState([]);
  const [shortMovie, setShortMovie] = React.useState(false);
  const [preloaderShown, setPreloaderShown] = React.useState(false);

  React.useEffect(() => {
    setErrorShown(false)
    setNoMovies(false);
    setPreloaderShown(true)
    const jwt = localStorage.getItem('jwt');
    mainApi.getMovies(jwt)
      .then((res) => {
        setMoviesList(res);
        console.log(res, 'res в SavedMovies mainApi.getMovies');
        if (res.length === 0) {
          setNoMovies(true);
        }
        localStorage.setItem('savedMovies', JSON.stringify(res));
      })
      .catch(() => {
        setErrorShown(true)
      })
      .finally(() => {
        setPreloaderShown(false)
      })
  }, [])

  const searchMovies = (searchkey) => {
    setTextShown(false);
    const movies = JSON.parse(localStorage.getItem('savedMovies'));
    console.log(movies, 'фильмы из savedMovies');

      const filteredMovies = movies.filter((movie) => {
      console.log(filterMovies, 'filteredMovies');
      if (movie.nameRU.toLowerCase().includes(searchkey.toLowerCase())) {
        console.log(movie, 'фильмы после фильтра');
        return movie;
      }
      return false;
    });
    localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
    const filteredByLengthMovies = filteredMovies.filter((movie) => {
      console.log(filteredByLengthMovies, 'filteredMovies из localStorage');
      if (movie.nameRU.toLowerCase().includes(searchkey.toLowerCase())) {
        if (shortMovie) {
          return movie.duration <= ShortFilmDuration;
        }
        return movie;
      }
      return false;
    });
    if (movies.length === 0) {
      setTextShown(true);
    }
    setMoviesList(filteredByLengthMovies);
  }

  const filterMovies = () => {
    setShortMovie(!shortMovie);
    if (moviesList.length > 0) {
      if (!shortMovie) {
        const movies = moviesList.filter((movie) => {
          return movie.duration <= ShortFilmDuration;
        });
        setMoviesList(movies);
        if (movies.length === 0) {
          setTextShown(true);
        } else {
          setTextShown(false);
        }
      } else {
        const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'))
        if (filteredMovies) {
          setMoviesList(filteredMovies);
        } else {
          const originalMovies = JSON.parse(localStorage.getItem('savedMovies'))
          setMoviesList(originalMovies);
        }
      }
    }
  }

  const onDelete = (movie) => {
    const jwt = localStorage.getItem('jwt');

    mainApi.deleteMovie(movie._id, jwt)
      .then(() => {
        const newMovies = moviesList.filter((item) => item !== movie);
        setMoviesList(newMovies);
        localStorage.setItem('savedMovies', JSON.stringify(newMovies));
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Header
        logedIn={logedIn}
      />
      <main className='content content_state_logedin'>
        <SearchForm
          place='savedMovies'
          onSubmit={searchMovies}
          onCheckbox={filterMovies}
          checkboxValue={shortMovie}
        />
        {preloaderShown && <Preloader />}
        {errorShown && <p className='movies__text movies__text_type_error'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</p>}
        {moviesList.length === 0 && noMovies && <p className='movies__text'>У вас ещё нет сохранённых фильмов</p>}
        {moviesList.length === 0 && textShown && <p className='movies__text'>Ничего не найдено</p>}
        <MoviesCardList
          place='savedMovies'
          moviesList={moviesList}
          handleLikeClick={onDelete}
        />
      </main>
      <Footer
      />
    </>
  );
};

export default SavedMovies;
