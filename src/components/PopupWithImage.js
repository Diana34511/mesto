import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopupBackground = this._popupSelector.querySelector(
      ".image-popup__image"
    );
    this._imagePopupTitle = this._popupSelector.querySelector(
      ".image-popup__title"
    );
  }

  open({ link, name }) {
    super.open();

    this._imagePopupBackground.src = link;
    this._imagePopupBackground.alt = name;
    this._imagePopupTitle.textContent = name;
  }
}
