export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const addCardBtn = document.querySelector(".profile__add-card-button");
export const addNewCardForm = document.querySelector(
  ".popup__form_new-place-form"
);
export const profileForm = document.querySelector(".popup__form_profile-form");
export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);

export const validationClassNames = {
  formSelector: ".popup__form",
  inputSelector: ".popup__textarea",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__textarea_type_error",
  inputErrorActiveClass: "popup__textarea-error_active",
  errorClass: "popup__error_visible",
};
