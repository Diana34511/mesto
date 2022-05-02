import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setSubmitHandler(handleSubmit) {
    this._handleSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupSelector.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmit()
        .then(() => {
          this.close();
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }
}
