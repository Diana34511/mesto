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
    popup.classList.add('popup_opened');

    const profileTitle = document.querySelector('.profile__title');
    const profileSubitle = document.querySelector('.profile__subtitle');

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubitle.textContent;

}


function closePopupOnBackground(event) {
    console.log(event.target, event.currentTarget);
    if (event.target !== event.currentTarget) {
       return
    }  
    closePopup()
}

function closePopup(){
    const popupToClose = document.querySelector('.popup_opened');
    popupToClose.classList.remove('popup_opened');
}

const popup = document.querySelector('.popup[data-popup-name="renameTitle"]');
popup.addEventListener('click', closePopupOnBackground);
const popupCloseButton = popup.querySelector('.popup__close-button');
popupCloseButton.addEventListener('click', closePopup);

// Находим форму в DOM
const formElement = document.querySelector('.popup__content');
// Находим поля формы в DOM
const nameInput = document.querySelector('input[name="nameInput"]');
const jobInput = document.querySelector('input[name="jobInput"]');

function validateInputs() {
    if(nameInput.value && jobInput.value) {
        popupSubmitButton.removeAttribute('disabled');
    } else {
        popupSubmitButton.setAttribute('disabled', true);
    }
}

nameInput.addEventListener('input', validateInputs);
jobInput.addEventListener('input', validateInputs);

const popupSubmitButton = document.querySelector('.popup__button');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handlFormSubmit (evt) {
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

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handlFormSubmit);

const userCards = document.querySelector('#cards').content;
const containerCards = document.querySelector('.cards');

//Добавление карточек

function appendCardData(card) {
    const cardItem = userCards.querySelector('.cards__item').cloneNode(true);
    cardItem.querySelector('.cards__image').src = card.link;
    cardItem.querySelector('.cards__title').textContent = card.name;
    console.log(card);
    containerCards.append(cardItem);
}

initialCards.forEach(appendCardData);

//кнопка добавления карточки
const popupForAddNewCard = document.querySelector('.popup[data-popup-name="newCard"]');
const addNewCardButton = document.querySelector('.profile__add-button');
addNewCardButton.addEventListener('click', openPopupForAddNewCard);

function openPopupForAddNewCard() {
    const popup = document.querySelector('.popup[data-popup-name="newCard"]');
    popup.classList.add('popup_opened');

}

popupForAddNewCard.querySelector('.popup__close-button').addEventListener('click', closePopup);
popupForAddNewCard.addEventListener('click', closePopupOnBackground);
