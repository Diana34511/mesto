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

const editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', openPopup);

function openPopup() {
    const popup = document.querySelector('.popup');
    const profileTitle = document.querySelector('.profile__title');
    const profileSubitle = document.querySelector('.profile__subtitle');

    popup.classList.add('popup_opened');

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubitle.textContent;
}


function closePopupOnBackground(event) {
    if (event.target !== event.currentTarget) {
       return null;
    }  

    closePopup()
}

function closePopup(){
    const popupToClose = document.querySelector('.popup_opened');

    popupToClose.classList.remove('popup_opened');
}

const popup = document.querySelector('.popup[data-popup-name="renameTitle"]');
const popupCloseButton = popup.querySelector('.popup__close-button');

popup.addEventListener('click', closePopupOnBackground);

popupCloseButton.addEventListener('click', closePopup);

function validateInputs(firstInput, secondInput, submitBtn) {
    if(firstInput.value && secondInput.value) {
        submitBtn.removeAttribute('disabled');
    } else {
        submitBtn.setAttribute('disabled', true);
    }
}

// Находим поля формы в DOM
const nameInput = document.querySelector('input[name="nameInput"]');
const jobInput = document.querySelector('input[name="jobInput"]');
const popupSubmitButton = document.querySelector('.popup__button');

nameInput.addEventListener('input', () => {
    validateInputs(nameInput, jobInput, popupSubmitButton)
});

jobInput.addEventListener('input', () => {
    validateInputs(nameInput, jobInput, popupSubmitButton)
});



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handlFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Выберите элементы, куда должны быть вставлены значения полей
    const profileTitle = document.querySelector('.profile__title');
    const profileSubitle = document.querySelector('.profile__subtitle');

    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameInput.value;
    profileSubitle.textContent = jobInput.value;

    closePopup();
}

// Находим форму в DOM
const formElement = document.querySelector('.popup__content');

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handlFormSubmit);

const userCards = document.querySelector('#cards').content;
const containerCards = document.querySelector('.cards');

function openImagePopUp(card) {
    const imagePopupContainer = document.querySelector('.image-popup');

    imagePopupContainer.classList.add('popup_opened');
    imagePopupContainer.querySelector('.image-popup__image').src = card.link;
    imagePopupContainer.querySelector('.image-popup__title').textContent = card.name;
}

//Добавление карточек

function appendCardData(card, flag = false) {
    const cardItem = userCards.querySelector('.cards__item').cloneNode(true);

    cardItem.querySelector('.cards__image').src = card.link;
    cardItem.querySelector('.cards__title').textContent = card.name;

    if (flag) {
        containerCards.prepend(cardItem);
    } else {
        containerCards.append(cardItem);
    }

    const likesNew = cardItem.querySelector('.cards__like');
    const cardImage = cardItem.querySelector('.cards__image');

    likesNew.addEventListener('click', () => likesNew.classList.toggle('cards__like_active'));
    
    cardImage.addEventListener('click', () => {
        openImagePopUp(card);
    }) //обработчик клика для открытия полного размера картинки

    const removeCardButton = cardItem.querySelector('.cards__trash-button');

    removeCardButton.addEventListener('click', () => {
        removeCardButton.closest('.cards__item').remove();
    });
   
}

initialCards.forEach((card) => {
    appendCardData(card);
});

//кнопка добавления карточки, открытие и закрытие
const popupForAddNewCard = document.querySelector('.popup[data-popup-name="newCard"]');
const addNewCardButton = document.querySelector('.profile__add-button');
const newPlaceName = popupForAddNewCard.querySelector('input[name="placeName"]');
const newPlaceLink = popupForAddNewCard.querySelector('input[name="placeLink"]');
const submitButton = popupForAddNewCard.querySelector('.popup__button');

addNewCardButton.addEventListener('click', openPopupForAddNewCard);

popupForAddNewCard.querySelector('.popup__close-button').addEventListener('click', closePopup);
popupForAddNewCard.addEventListener('click', closePopupOnBackground);

newPlaceName.addEventListener('input', () => {
        validateInputs(newPlaceName, newPlaceLink, submitButton) 
 });
newPlaceLink.addEventListener('input', () => {
        validateInputs(newPlaceName, newPlaceLink, submitButton) 
 });

function openPopupForAddNewCard() {
    const popup = document.querySelector('.popup[data-popup-name="newCard"]');

    popup.classList.add('popup_opened');
    validateInputs(newPlaceName, newPlaceLink, submitButton);
}

//добавление новых карточек

function saveNewCard(event) {
    event.preventDefault();
    
    const newCard = {
        name: newPlaceName.value,
        link: newPlaceLink.value
    };

    appendCardData(newCard, true);
    newPlaceName.value = "";
    newPlaceLink.value = "";
    closePopup();
}


popupForAddNewCard.querySelector('.popup__content').addEventListener('submit', saveNewCard);

//открытие и закрытие попапа + его замена 

const imagePopupContainer = document.querySelector('.image-popup');

imagePopupContainer.addEventListener('click', closePopupOnBackground);
imagePopupContainer.querySelector('.image-popup__close-button').addEventListener('click', closePopup);