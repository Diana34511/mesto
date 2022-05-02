import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import {
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

const api = new Api({
  url: "https://nomoreparties.co/v1/cohort-40/",
  headers: {
    authorization: "4262d86a-0c05-431c-aa2a-8625ad9b488b",
    "Content-Type": "application/json",
  },
});

const cardPopupWithImage = new PopupWithImage(".image-popup");
cardPopupWithImage.setEventListeners();

const generateNewCardElement = ({ name, link, likes }) => {
  const card = new Card({ name, link, likes }, ".card-template", () => {
    cardPopupWithImage.open({ name, link });
  });

  const cardElement = card.generateCard();

  return cardElement;
};

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
});

const profilePopup = new PopupWithForm(
  ".profile-popup",
  ({ nameInput: name, jobInput: job }) => {
    return api.updateUserInfo({ name, job }).then((res) => {
      console.log(res);
      userInfo.setUserInfo({
        name: res.name,
        job: res.about,
      });
    });
  }
);

profilePopup.setEventListeners();

editProfileButton.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  document.getElementById("job-input").value = job;
  document.getElementById("name-input").value = name;
  profileFormValidator.hideInputErrorsOnOpenPopup();
  profilePopup.open();
});

const allCards = api.getAllCards();

allCards
  .then((fetchedCards) => {
    const cardsSection = new Section(
      {
        items: fetchedCards,
        renderer: ({ name, link, likes }) => {
          const newCardElement = generateNewCardElement({ name, link, likes });
          cardsSection.addItem(newCardElement);
        },
      },
      ".cards"
    );

    cardsSection.renderElements();

    const addCardPopup = new PopupWithForm(
      ".new-card-popup",
      ({ placeName: name, placeLink: link }) => {
        return api.createNewCard({ name, link, likes }).then((res) => {
          const newCardElement = generateNewCardElement({
            name: res.name,
            link: res.link,
            likes: res.likes,
          });
          cardsSection.addItem(newCardElement, true);
        });
      }
    );

    addCardPopup.setEventListeners();

    addCardBtn.addEventListener("click", () => {
      newPlaceFormValidator.hideInputErrorsOnOpenPopup();
      addCardPopup.open();
    });
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getUserInfo()
  .then(({ name, about }) => {
    userInfo.setUserInfo({ name, job: about });
  })
  .catch((err) => {
    console.error(err);
  });
