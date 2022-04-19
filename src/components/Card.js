class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".cards__image").src = this._link;
    this._element.querySelector(".cards__title").textContent = this._name;
    this._element.querySelector(".cards__image").alt = this._name;

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
