import { openPopup } from "./index.js"; 

class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
      }
    
    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.cards__item')
          .cloneNode(true);
    
        return cardElement;
      }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
    
        this._element.querySelector('.cards__image').src = this._link;
        this._element.querySelector('.cards__title').textContent = this._name;
    
        return this._element;
      }

    _setEventListeners() {
        this._element.querySelector('.cards__like').addEventListener('click', () => {
            this._handleLikeClick();
        });
        
        this._element.querySelector('.cards__trash-button').addEventListener('click', () => {
            this._handleRemoveCard();
        });

        this._element.querySelector('.cards__image').addEventListener('click', () => {
            this._openImagePopup();
        });
    }
    _handleLikeClick() {
        this._element.querySelector('.cards__like').classList.toggle('cards__like_active');
    }

    _handleRemoveCard() {
        this._element.querySelector('.cards__trash-button').closest('.cards__item').remove();
    }

    _openImagePopup() {
        const imagePopup = document.querySelector('.image-popup');
        const imagePopupBackground = imagePopup.querySelector('.image-popup__image');
        const imagePopupTitle = imagePopup.querySelector('.image-popup__title');
        openPopup(imagePopup);

        imagePopupBackground.src = this._link;
        imagePopupBackground.alt = this._name;
        imagePopupTitle.textContent = this._name;
    }
}

export {Card};
