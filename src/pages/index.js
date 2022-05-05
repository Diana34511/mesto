import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import PopupWithSubmit from "../components/PopupWithSubmit";
import {
  addCardBtn,
  editProfileButton,
  valifationConfig,
  nameInput,
  jobInput,
} from "../utils/constants.js";

const formValidators = {};

const enableFormsValidation = ({ formSelector, validationClassNames }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationClassNames, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableFormsValidation(valifationConfig);

const api = new Api({
  url: "https://nomoreparties.co/v1/cohort-40/",
  headers: {
    authorization: "4262d86a-0c05-431c-aa2a-8625ad9b488b",
    "Content-Type": "application/json",
  },
});

const cardPopupWithImage = new PopupWithImage(".image-popup");
cardPopupWithImage.setEventListeners();

const submitPopup = new PopupWithSubmit(".alert-popup");
submitPopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarImageSelector: ".profile__avatar-image",
});

const profilePopup = new PopupWithForm(
  ".profile-popup",
  ({ nameInput: name, jobInput: job }) => {
    return api.updateUserInfo({ name, job }).then((res) => {
      userInfo.setUserInfo(res);
    });
  }
);

const avatarPopup = new PopupWithForm(".avatar-popup", ({ avatar }) => {
  return api.updateAvatar(avatar).then((res) => {
    userInfo.setUserInfo(res);
  });
});
avatarPopup.setEventListeners();

document.querySelector(".profile__avatar").addEventListener("click", () => {
  formValidators["avatar"].resetValidation();
  avatarPopup.open();
});

const generateNewCardElement = (data) => {
  const userId = userInfo.getUserInfo().id;

  const card = new Card(
    data,
    ".card-template",
    userId,
    () => {
      cardPopupWithImage.open({ name: data.name, link: data.link });
    },
    (id) => {
      return api.addLike(id);
    },
    (id) => {
      return api.deleteLike(id);
    },
    (id) => {
      return api.deleteCard(id);
    },
    (submitHandler) => {
      submitPopup.setSubmitHandler(submitHandler);
      submitPopup.open();
    }
  );

  const cardElement = card.generateCard();

  return cardElement;
};

profilePopup.setEventListeners();

editProfileButton.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();

  formValidators["profile"].resetValidation();
  jobInput.value = job;
  nameInput.value = name;
  profilePopup.open();
});

const showAllCards = (cards) => {
  const cardsSection = new Section(
    {
      items: cards,
      renderer: (data) => {
        const newCardElement = generateNewCardElement(data);
        cardsSection.addItem(newCardElement);
      },
    },
    ".cards"
  );

  cardsSection.renderElements();

  const addCardPopup = new PopupWithForm(
    ".new-card-popup",
    ({ placeName: name, placeLink: link }) => {
      return api.createNewCard({ name, link }).then((res) => {
        const newCardElement = generateNewCardElement(res);
        cardsSection.addItem(newCardElement, true);
      });
    }
  );

  addCardPopup.setEventListeners();

  addCardBtn.addEventListener("click", () => {
    formValidators["new-place"].resetValidation();
    addCardPopup.open();
  });
};

Promise.all([api.getUserInfo(), api.getAllCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    showAllCards(cardsData);
  })
  .catch((err) => {
    console.error(err);
  });
