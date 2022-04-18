import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
    }

    _getInputValues() {
        const inputs = this._popupSelector.querySelectorAll('.popup__textarea');
        const data = {};
        inputs.forEach(element => {
            data[element.name] = element.value;
        });

        return data;
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupSelector.addEventListener('submit', this._submitForm);
    }

    close() {
        super.close();

        this._popupSelector.querySelector('.popup__form').reset();
    }
}