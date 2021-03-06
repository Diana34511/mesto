class Card {
  constructor(
    data,
    cardSelector,
    userId,
    handleCardClick,
    addLike,
    deleteLike,
    deleteCard,
    openConfirmationPopup
  ) {
    this._openConfirmationPopup = openConfirmationPopup;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._addLike = addLike;
    this._deleteLike = deleteLike;
    this._deleteCard = deleteCard;
    this._userId = userId;
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
    this._cardImage = this._element.querySelector(".cards__image");
    this._likesButton = this._element.querySelector(".cards__like");
    this._likesCounter = this._element.querySelector(".cards__likes");
    this._trashButton = this._element.querySelector(".cards__trash-button");

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._element.querySelector(".cards__title").textContent = this._name;
    this._cardImage.alt = this._name;
    this._likesCounter.textContent = this._likes.length;

    const hasUserLike = !!this._likes.find((like) => like._id === this._userId);
    if (hasUserLike) {
      this._toggleCardLike();
    }

    return this._element;
  }

  _setEventListeners() {
    this._likesButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    if (this._userId === this._owner._id) {
      this._trashButton.addEventListener("click", () => {
        this._openConfirmationPopup(() => {
          return this._handleRemoveCard();
        });
      });
    } else {
      this._trashButton.remove();
    }

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _handleLikeClick() {
    const isActive = this._likesButton.classList.contains("cards__like_active");
    if (isActive) {
      this._deleteLike(this._id)
        .then((res) => {
          this._handleLikeUpdate(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._addLike(this._id)
        .then((res) => {
          this._handleLikeUpdate(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  _handleLikeUpdate(likes) {
    this._likes = likes;
    this._likesCounter.textContent = this._likes.length;
    this._toggleCardLike();
  }

  _toggleCardLike() {
    this._likesButton.classList.toggle("cards__like_active");
  }

  _handleRemoveCard() {
    return this._deleteCard(this._id)
      .then((res) => {
        this._trashButton.closest(".cards__item").remove();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export { Card };
