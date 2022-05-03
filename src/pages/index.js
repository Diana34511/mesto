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
  addNewCardForm,
  profileForm,
  editProfileButton,
  validationClassNames,
  changeProfileAvatarForm,
} from "../utils/constants.js";

const profileFormValidator = new FormValidator(
  validationClassNames,
  profileForm
);
const newPlaceFormValidator = new FormValidator(
  validationClassNames,
  addNewCardForm
);

const avatarFormValidator = new FormValidator(
  validationClassNames,
  changeProfileAvatarForm
);

profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();
avatarFormValidator.enableValidation();

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
  return api
    .updateAvatar(avatar)
    .then((res) => {
      userInfo.updateAvatar(res.avatar);
    })
    .catch((err) => {
      console.error(err);
    });
});
avatarPopup.setEventListeners();

document.querySelector(".profile__avatar").addEventListener("click", () => {
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
  document.getElementById("job-input").value = job;
  document.getElementById("name-input").value = name;
  profileFormValidator.hideInputErrorsOnOpenPopup();
  profilePopup.open();
});

const allCards = api.getAllCards();

const fetchAllCards = () => {
  return allCards
    .then((fetchedCards) => {
      const cardsSection = new Section(
        {
          items: fetchedCards,
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
        newPlaceFormValidator.hideInputErrorsOnOpenPopup();
        addCardPopup.open();
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

const fetchUserInfo = () => {
  return api
    .getUserInfo()
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch((err) => {
      console.error(err);
    });
};

fetchUserInfo()
  .then(() => {
    return fetchAllCards();
  })
  .catch((err) => {
    console.error(err);
  });
