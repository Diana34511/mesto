export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getAllCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      console.log(res);
      return this._checkResult(res);
    });
  }

  updateUserInfo({ name, job }) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about: job,
      }),
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  createNewCard({ name, link }) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  addLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  deleteLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResult(res);
    });
  }
}
