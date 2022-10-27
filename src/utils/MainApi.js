const MAIN_URL = 'https://api.movies.cosmopolityan.students.nomoredomains.sbs';

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
    console.log(token);
    return fetch(`${this._url}/users/me`, {
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
    console.log(token);
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  editProfileInfo(newInfo, token) {
    console.log(newInfo);
    console.log(token);
    return fetch(`${this._url}/users/me`, {
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
    console.log(token);
    return fetch(`${this._url}/movies`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse)
  }

  saveMovie(movie, token) {
    console.log(movie);
    console.log(token);
    return fetch(`${this._url}/movies`, {
      // Failed to load resource: the server responded with a status of 400 (Bad Request)
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
      .then(this._checkResponse);
  }

  deleteMovie(id, token) {
    console.log(id);
    console.log(token);
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }
}

const mainApi = new Api({ baseUrl: MAIN_URL });


export { mainApi }
