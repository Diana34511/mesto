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

  _fetch(url, params) {
    return fetch(url, { headers: this._headers, ...params }).then((res) => {
      return this._checkResult(res);
    });
  }

  getAllCards() {
    return this._fetch(`${this._url}cards`, {
      method: "GET",
    });
  }

  getUserInfo() {
    return this._fetch(`${this._url}users/me`, {
      method: "GET",
    });
  }

  updateUserInfo({ name, job }) {
    return this._fetch(`${this._url}users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name,
        about: job,
      }),
    });
  }

  createNewCard({ name, link }) {
    return this._fetch(`${this._url}cards`, {
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  addLike(id) {
    return this._fetch(`${this._url}cards/${id}/likes`, {
      method: "PUT",
    });
  }

  deleteLike(id) {
    return this._fetch(`${this._url}cards/${id}/likes`, {
      method: "DELETE",
    });
  }

  deleteCard(id) {
    return this._fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
    });
  }

  updateAvatar(link) {
    return this._fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }
}
