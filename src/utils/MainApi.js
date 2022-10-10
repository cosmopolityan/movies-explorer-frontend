import { MAIN_URL } from './config';
import { BASE_URL } from './config';

class Api {
  constructor(options) {
    this._url = options.baseUrl
    this._headers = options.headers
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register = (email, password, name) => {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, name })
    })
      .then(this._checkResponse)
  };

  authorize = (email, password) => {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(this._checkResponse)
  };

  checkToken = (token) => {
    // return fetch(`${this._url}/users/me`, { // где-то здесь проблема. С токеном?
    return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(this._checkResponse)
  }

  getUser = (token) => {
    // return fetch(`${this._url}/users/me`, { // где-то здесь проблема. С токеном?
      return fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  editProfileInfo(newInfo, token) {
    // return fetch(`${this._url}/users/me`, { // где-то здесь проблема. С токеном?
    return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newInfo.name,
        email: newInfo.email,
      })
    })
      .then(this._checkResponse)
  }

  getMovies(token) {
    // return fetch(`${this._url}/movies`, { // где-то здесь проблема. С токеном?
      return fetch(`${BASE_URL}/movies`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse)
  }

  saveMovie(movie, token) {
    // return fetch(`${this._url}/movies`, { // где-то здесь проблема. С токеном?
    return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
      .then(this._checkResponse)
  }

  deleteMovie(id, token) {
    // return fetch(`${this._url}/movies/${id}`, { // где-то здесь проблема. С токеном?
    return fetch(`${BASE_URL}}/movies/${id}`, {
    method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }
}

// const mainApi = new Api({ baseUrl: MAIN_URL });
const mainApi = new Api({ baseUrl: BASE_URL });

export { mainApi }
