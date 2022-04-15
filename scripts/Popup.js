export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        this._popupSelector.classList.add('popup__transition');
        this._popupSelector.classList.add('popup_opened');
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', closePopupOnPushEsc);
    
        setTimeout(() => {
            this._popupSelector.classList.remove('popup__transition');
        }, 500); 
    }
}