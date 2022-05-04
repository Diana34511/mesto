import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._buttonElement = this._popup.querySelector(".popup__button");
    this._inputs = this._popup.querySelectorAll(".popup__textarea");
    this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    const data = {};
    this._inputs.forEach((element) => {
      data[element.name] = element.value;
    });

    return data;
  }

  _renderLoading(isLoading) {
    if (isLoading) {
      this._buttonElement.textContent = "Сохранение...";
    }
  }

  close() {
    super.close();

    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (event) => {
      event.preventDefault();

      const initialText = this._buttonElement.textContent;
      this._renderLoading(true);
      this._buttonElement.textContent = "Сохранение...";
      this._submitForm(this._getInputValues())
        .then((res) => this.close())
        .finally(() => {
          this._buttonElement.textContent = initialText;
        });
    });
  }

  _disabledButton() {
    this._buttonElement.classList.add("popup__button_inactive");
    this._buttonElement.setAttribute("disabled", true);
  }
}
