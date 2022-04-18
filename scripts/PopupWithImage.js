import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }

    open(link, name) {
        super.open();
        const imagePopupBackground = this._popupSelector.querySelector('.image-popup__image');
        const imagePopupTitle = this._popupSelector.querySelector('.image-popup__title');

        imagePopupBackground.src = link;
        imagePopupBackground.alt = name;
        imagePopupTitle.textContent = name;
    }
}