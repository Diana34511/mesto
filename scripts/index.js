import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',

    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


//validation data
const validationClassNames = {
    formSelector: '.popup__form',
    inputSelector: '.popup__textarea',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__textarea_type_error',
    inputErrorActiveClass: 'popup__textarea-error_active',
    errorClass: 'popup__error_visible'
  };

// Элементы диалогового окна новой карточки
const newCardPopup = document.querySelector('.new-card-popup');
const newPlaceForm = newCardPopup.querySelector('.popup__form_new-place-form')
const newCardPopupContent = newCardPopup.querySelector('.popup__content');
const addNewCardButton = document.querySelector('.profile__add-card-button');
const newPlaceName = newCardPopup.querySelector('input[name="placeName"]');
const newPlaceLink = newCardPopup.querySelector('input[name="placeLink"]');

// Элементы диалогового окна открытия изображения
const imagePopup = document.querySelector('.image-popup');
const imagePopupBackground = imagePopup.querySelector('.image-popup__image')
const imagePopupTitle = imagePopup.querySelector('.image-popup__title')

// Элементы диалогового окна профиля
const profilePopup = document.querySelector('.profile-popup');
const profileForm = profilePopup.querySelector('.popup__form_profile-form');
const profilePopupContent = profilePopup.querySelector('.popup__content');
const profileTitle = document.querySelector('.profile__title');
const profileSubitle = document.querySelector('.profile__subtitle');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileNameInput = document.querySelector('input[name="nameInput"]');
const profileJobInput = document.querySelector('input[name="jobInput"]');


const profileFormValid = new FormValidator(validationClassNames, profileForm);
const newPlaceFormValid = new FormValidator(validationClassNames, newPlaceForm);

profileFormValid.enableValidation();
newPlaceFormValid.enableValidation();

const containerCards = document.querySelector('.cards');

// Common functions
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupOnPushEsc);
}

export function closePopup(popupToClose){
    popupToClose.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupOnPushEsc);
}

export const closePopupOnPushEsc = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

const disabledButton = (formElement) => {
    const buttonElement = formElement.querySelector('.popup__button');
    if (buttonElement) {
        buttonElement.classList.add('popup__button_inactive');
        buttonElement.setAttribute('disabled', true);
    }
}

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
            closePopup(popup)
        }
    })
})

function handlFormSubmit(evt) {
    evt.preventDefault(); 

    profileTitle.textContent = profileNameInput.value;
    profileSubitle.textContent = profileJobInput.value;
    closePopup(profilePopup);
}

editProfileButton.addEventListener('click', () => {
    disabledButton(profilePopup);

    openPopup(profilePopup);

    profileFormValid.hideInputErrorsOnClosePopup();

    profileNameInput.value = profileTitle.textContent;
    profileJobInput.value = profileSubitle.textContent;
});


profilePopupContent.addEventListener('submit', handlFormSubmit);

addNewCardButton.addEventListener('click', () => {
    openPopup(newCardPopup);

    newPlaceFormValid.hideInputErrorsOnClosePopup();

    disabledButton(newCardPopup);
});

// create default card
initialCards.forEach((item) => {
    const card = new Card(item, '.card-template');
    const cardElement = card.generateCard();
  
    containerCards.append(cardElement);
  }); 
  
function saveNewCard(event) {
    event.preventDefault();

    const data = {
        name: newPlaceName.value,
        link: newPlaceLink.value
    }

    const newCard = new Card(data, '.card-template');
    const newCardElement = newCard.generateCard();

    containerCards.prepend(newCardElement);

    newPlaceName.value = "";
    newPlaceLink.value = "";

    closePopup(newCardPopup);
    disabledButton(newCardPopup);
}

newCardPopupContent.addEventListener('submit', saveNewCard);

// add validation
