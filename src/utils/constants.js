export const addCardBtn = document.querySelector(".profile__add-card-button");
export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);

export const jobInput = document.getElementById("job-input");
export const nameInput = document.getElementById("name-input");

export const validationClassNames = {
  formSelector: ".popup__form",
  inputSelector: ".popup__textarea",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__textarea_type_error",
  inputErrorActiveClass: "popup__textarea-error_active",
  errorClass: "popup__error_visible",
};

export const valifationConfig = {
  formSelector: ".popup__form",
  validationClassNames,
};
