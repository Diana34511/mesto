import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import {
  initialCards,
  addCardBtn,
  addNewCardForm,
  profileForm,
  editProfileButton,
  validationClassNames,
} from "./constants.js";

const profileFormValidator = new FormValidator(
  validationClassNames,
  profileForm
);
const newPlaceFormValidator = new FormValidator(
  validationClassNames,
  addNewCardForm
);

profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();

//new creating card
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      const cardPopupWithImage = new PopupWithImage(".image-popup");
      cardPopupWithImage.setEventListeners();

      const card = new Card({ name, link }, ".card-template", () => {
        cardPopupWithImage.open({ name, link });
      });

      const cardElement = card.generateCard();
      cardsSection.addItem(cardElement);
    },
  },
  ".cards"
);

cardsSection.renderElements();

const addCardPopup = new PopupWithForm(
  ".new-card-popup",
  ({ placeName: name, placeLink: link }) => {
    const cardPopupWithImage = new PopupWithImage(".image-popup");
    cardPopupWithImage.setEventListeners();

    const newCard = new Card({ name, link }, ".card-template", () => {
      cardPopupWithImage.open({ name, link });
    });

    const newCardElement = newCard.generateCard();
    cardsSection.addItem(newCardElement, true);
  }
);

addCardPopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
});

const profilePopup = new PopupWithForm(
  ".profile-popup",
  ({ nameInput: name, jobInput: job }) => {
    userInfo.setUserInfo({
      name,
      job,
    });
  }
);

profilePopup.setEventListeners();

addCardBtn.addEventListener("click", () => {
  addCardPopup.open();
});

editProfileButton.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  document.getElementById("job-input").value = job;
  document.getElementById("name-input").value = name;
  profilePopup.open();
});
