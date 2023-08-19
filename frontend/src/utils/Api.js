class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`
      }
    })
    .then(res => this._checkResponse(res));
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`
      }
    })
    .then(res => this._checkResponse(res));
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(res => this._checkResponse(res));
  }
  
  addNewCard(inputData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: inputData.name,
        link: inputData.link
      })
    })
    .then(res => this._checkResponse(res));
  }

  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => this._checkResponse(res));
  }

  editAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH', 
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => this._checkResponse(res));
  }

  changeLikeStatus(_id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: (isLiked) ? 'PUT' : 'DELETE',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => this._checkResponse(res))
  }
}

const api = new Api({  
  baseUrl: 'http://api.mestokarma.nomoreparties.co',
  headers: {
  'Content-type': 'application/json',  
  }
});

export default api;