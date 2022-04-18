import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
  }

  _getInputValues() {
    const inputs = this._popupSelector.querySelectorAll(".popup__textarea");
    const data = {};
    inputs.forEach((element) => {
      data[element.name] = element.value;
    });

    return data;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupSelector.addEventListener("submit", (event) => {
      event.preventDefault();
      const formValues = this._getInputValues();
      this._submitForm(formValues);
      this._disabledButton();
      this.close();
    });
  }

  close() {
    super.close();

    this._popupSelector.querySelector(".popup__form").reset();
  }

  _disabledButton() {
    const buttonElement = this._popupSelector.querySelector(".popup__button");
    buttonElement.classList.add("popup__button_inactive");
    buttonElement.setAttribute("disabled", true);
  }
}
