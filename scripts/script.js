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


// Элементы диалогового окна новой карточки
const newCardPopup = document.querySelector('.new-card-popup');
const newCardPopupContent = newCardPopup.querySelector('.popup__content');
const addNewCardButton = document.querySelector('.profile__add-card-button');
const newPlaceName = newCardPopup.querySelector('input[name="placeName"]');
const newPlaceLink = newCardPopup.querySelector('input[name="placeLink"]');
const submitButton = newCardPopup.querySelector('.popup__button');

// Элементы диалогового окна открытия изображения
const imagePopup = document.querySelector('.image-popup');
const imagePopupBackground = imagePopup.querySelector('.image-popup__image')
const imagePopupTitle = imagePopup.querySelector('.image-popup__title')

// Элементы диалогового окна профиля
const profilePopup = document.querySelector('.profile-popup');
const profilePopupContent = profilePopup.querySelector('.popup__content');
const profileTitle = document.querySelector('.profile__title');
const profileSubitle = document.querySelector('.profile__subtitle');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileNameInput = document.querySelector('input[name="nameInput"]');
const profileJobInput = document.querySelector('input[name="jobInput"]');
const profilePopupSubmitButton = document.querySelector('.popup__button');

// Общие функции
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popupToClose){
    popupToClose.classList.remove('popup_opened');
}

const hideInputErrorsOnClosePopup = (formElement) => {
    const inputs = formElement.querySelectorAll('.popup__textarea');
    inputs.forEach(inputElement => {
        hideInputError(formElement, inputElement, validationClassNames);
        inputElement.value = "";
    });
}

const disabledButton = (formElement) => {
    const buttonElement = formElement.querySelector('.popup__button');
    buttonElement.classList.add('popup__button_inactive');
    buttonElement.setAttribute('disabled', true);
}

const closeAndCleanPopup = (formElement) => {
    closePopup(formElement);
        
    hideInputErrorsOnClosePopup(formElement);

    disabledButton(formElement);
}

const closePopupOnPushEsc = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closeAndCleanPopup(openedPopup);
        
    }
    document.removeEventListener('keydown', closePopupOnPushEsc);
}

// Общие листенеры для закрытия попапов на нажатие бэкграунда 
[imagePopup, profilePopup, newCardPopup].forEach(popup => {
    popup.addEventListener('click', (event) => {
        if (event.target === event.currentTarget) {
            const formElement = event.target;

            closeAndCleanPopup(formElement);
         }  
    });
});


// Общие листенеры закрытия диалоговых окон
const popCloseButtons = document.querySelectorAll('.popup__close-button');

popCloseButtons.forEach(closeBtn => {
    closeBtn.addEventListener('click', (event) => {
        const popUpToClose = event.target.closest('.popup');
        closePopup(popUpToClose);
        hideInputErrorsOnClosePopup(popUpToClose);
    });
});

// Функционал диалогового окна профиля
function handlFormSubmit(evt) {
    evt.preventDefault(); 

    profileTitle.textContent = profileNameInput.value;
    profileSubitle.textContent = profileJobInput.value;
    closePopup(profilePopup);
}

editProfileButton.addEventListener('click', () => {
    openPopup(profilePopup);

    document.addEventListener('keydown', closePopupOnPushEsc);

    profileNameInput.value = profileTitle.textContent;
    profileJobInput.value = profileSubitle.textContent;
});


profilePopupContent.addEventListener('submit', handlFormSubmit);

// Функционал диалогового окна добавления карточки
const userCards = document.querySelector('#cards').content;
const containerCards = document.querySelector('.cards');
const cardTemplate = userCards.querySelector('.cards__item');

function createNewCard(newCardData) {
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.cards__image');
    const cardTitle = cardElement.querySelector('.cards__title');
    const likeCardBtn = cardElement.querySelector('.cards__like');
    const removeCardButton = cardElement.querySelector('.cards__trash-button');

    cardImage.src = newCardData.link;
    cardImage.alt = newCardData.name;

    cardTitle.textContent = newCardData.name;

    likeCardBtn.addEventListener('click', () => likeCardBtn.classList.toggle('cards__like_active'));

    cardImage.addEventListener('click', () => {
        openPopup(imagePopup);

        document.addEventListener('keydown', closePopupOnPushEsc);

        imagePopupBackground.src = newCardData.link;
        imagePopupBackground.alt = newCardData.name;
        imagePopupTitle.textContent = newCardData.name;
    });

    removeCardButton.addEventListener('click', () => {
        removeCardButton.closest('.cards__item').remove();
    });

    return cardElement;
}

function saveNewCard(event) {
    event.preventDefault();

    const newCard = createNewCard({
        name: newPlaceName.value,
        link: newPlaceLink.value
    });

    containerCards.prepend(newCard);

    newPlaceName.value = "";
    newPlaceLink.value = "";

    closePopup(newCardPopup);
    disabledButton(newCardPopup);
}

addNewCardButton.addEventListener('click', () => {
    openPopup(newCardPopup);
    document.addEventListener('keydown', closePopupOnPushEsc);
});

newCardPopupContent.addEventListener('submit', saveNewCard);

containerCards.append(...initialCards.map(card => createNewCard(card)));




// document.addEventListener('keydown', closePopupOnPushEsc);

