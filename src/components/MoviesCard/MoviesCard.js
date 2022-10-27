import React from "react";
import './MoviesCard.css';
import { mainApi } from '../../utils/MainApi';

const MoviesCard = (props) => {
  const { movie, place, handleLikeClick, savedCards } = props;
  const [isLiked, setIsLiked] = React.useState(false)

  React.useEffect(() => {
    if (savedCards) {
      const likedMovie = savedCards.find((item) => movie.id == item.movieId);
      if (likedMovie) {
        setIsLiked(true);
        movie._id = likedMovie._id;
      }
    }
  }, [])

  const onLike = (movie) => {
    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
    if (!isLiked) {
      const { country,
        description,
        director,
        duration,
        id,
        image,
        nameRU,
        nameEN,
        trailerLink,
        year,
      } = movie;
      const newMovie = {
        country,
        director,
        duration,
        year,
        description,
        image: `https://api.nomoreparties.co${image.url}`,
        trailerLink: trailerLink,
        thumbnail: `https://api.nomoreparties.co${image.url}`,
        movieId: id.toString(),
        nameRU,
        nameEN,
      }
      mainApi.saveMovie(newMovie, jwt) // (anonymous)
        .then((res) => {
          movie._id = res._id;
          setIsLiked(true);
        })
        .catch((err) => {
          console.log(err);
        });
        console.log(newMovie);
        console.log(jwt);
    } else {
      mainApi.deleteMovie(movie._id, jwt)
        .then(() => {
          setIsLiked(false);
        })
        .catch((err) => {
          console.log(err);
        });
        console.log(movie._id);
        console.log(jwt);
    }
  }

    return (
      <li className='movie'>
        <div className='movie__about'>
          <div className='movie__texts'>
            <h2 className='movie__title'>{movie.nameRU}</h2>
            <p className='movie__duration'>
              {Math.floor(movie.duration / 60) ? `${Math.trunc(movie.duration / 60)}ч` : ''} {movie.duration % 60}м
            </p>
          </div>
          <button
            type='button'
            className={`movie__btn
            ${place === 'allmovies' ? 'movie__btn_place_all' : 'movie__btn_place_saved'}
            ${place === 'allmovies' && isLiked ? 'movie__btn_liked' : ''}
          `}
            onClick={place === 'allmovies' ? () => onLike(movie) : () => handleLikeClick(movie)}
          ></button>
        </div>
        <div className='movie__imgblock'>
          <img
            className='movie__img'
            src={place === 'allmovies' ? `https://api.nomoreparties.co${movie.image.url}` : movie.image}
            alt={movie.nameRU}
          />
          <a className='movie__link' href={movie.trailerLink} target='_blank' rel='noreferrer' area-label='ссылка на трейлер'> </a>
        </div>
      </li>
    );
  };

export default MoviesCard;
