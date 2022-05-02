class Card {
  constructor(data, cardSelector, handleCardClick, addLike, deleteLike) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._addLike = addLike;
    this._deleteLike = deleteLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard(userId) {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".cards__image").src = this._link;
    this._element.querySelector(".cards__title").textContent = this._name;
    this._element.querySelector(".cards__image").alt = this._name;
    this._element.querySelector(".cards__likes").textContent =
      this._likes.length;

    const hasUserLike = !!this._likes.find((like) => like._id === userId);
    if (hasUserLike) {
      this._toggleCardLike();
    }

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__like")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._element
      .querySelector(".cards__trash-button")
      .addEventListener("click", () => {
        this._handleRemoveCard();
      });

    this._element
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }

  _handleLikeClick() {
    const likeEl = this._element.querySelector(".cards__like");
    const isActive = likeEl.classList.contains("cards__like_active");
    if (isActive) {
      this._deleteLike(this._id).then((res) => {
        this._handleLikeUpdate(res.likes);
      });
    } else {
      this._addLike(this._id).then((res) => {
        this._handleLikeUpdate(res.likes);
      });
    }
  }

  _handleLikeUpdate(likes) {
    this._likes = likes;
    this._element.querySelector(".cards__likes").textContent =
      this._likes.length;
    this._toggleCardLike();
  }

  _toggleCardLike() {
    this._element
      .querySelector(".cards__like")
      .classList.toggle("cards__like_active");
  }

  _handleRemoveCard() {
    this._element
      .querySelector(".cards__trash-button")
      .closest(".cards__item")
      .remove();
  }
}

export { Card };
