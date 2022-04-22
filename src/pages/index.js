import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  addCardBtn,
  addNewCardForm,
  profileForm,
  editProfileButton,
  validationClassNames,
} from "../utils/constants.js";

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

const cardPopupWithImage = new PopupWithImage(".image-popup");
cardPopupWithImage.setEventListeners();

const generateNewCardElement = ({ name, link }) => {
  const card = new Card({ name, link }, ".card-template", () => {
    cardPopupWithImage.open({ name, link });
  });

  const cardElement = card.generateCard();

  return cardElement;
};

//new creating card
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      const newCardElement = generateNewCardElement({ name, link });
      cardsSection.addItem(newCardElement);
    },
  },
  ".cards"
);

cardsSection.renderElements();

const addCardPopup = new PopupWithForm(
  ".new-card-popup",
  ({ placeName: name, placeLink: link }) => {
    const newCardElement = generateNewCardElement({ name, link });
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
  newPlaceFormValidator.hideInputErrorsOnOpenPopup();
  addCardPopup.open();
});

editProfileButton.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  document.getElementById("job-input").value = job;
  document.getElementById("name-input").value = name;
  profileFormValidator.hideInputErrorsOnOpenPopup();
  profilePopup.open();
});
