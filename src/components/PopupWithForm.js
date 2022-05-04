import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._buttonElement = this._popupSelector.querySelector(".popup__button");
  }

  _getInputValues() {
    const inputs = this._popupSelector.querySelectorAll(".popup__textarea");
    const data = {};
    inputs.forEach((element) => {
      data[element.name] = element.value;
    });

    return data;
  }

  _renderLoading(isLoading) {
    if (isLoading) {
      this._buttonElement.textContent = "Сохранение...";
    } else if (this._buttonElement.name === "newPlace") {
      this._buttonElement.textContent = "Создать";
    } else {
      this._buttonElement.textContent = "Сохранить";
    }
  }

  close() {
    super.close();

    this._popupSelector.querySelector(".popup__form").reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupSelector.addEventListener("submit", (event) => {
      event.preventDefault();
      this._renderLoading(true);
      const formValues = this._getInputValues();
      this._submitForm(formValues)
        .then((res) => {
          this._disabledButton();
          this.close();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this._renderLoading(false);
        });
    });
  }

  _disabledButton() {
    this._buttonElement.classList.add("popup__button_inactive");
    this._buttonElement.setAttribute("disabled", true);
  }
}
