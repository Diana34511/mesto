class FormValidator {
  constructor(data, formToValid) {
    this._validationProps = data;
    this._form = formToValid;
    this._inputs = this._form.querySelectorAll(
      this._validationProps.inputSelector
    );
    this._buttonElement = this._form.querySelector(
      this._validationProps.submitButtonSelector
    );
    this._inputList = Array.from(this._inputs);
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationProps.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._validationProps.inputErrorActiveClass);
  }

  _hideInputErrors() {
    this._inputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
      inputElement.value = "";
    });
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationProps.inputErrorClass);
    errorElement.classList.remove(this._validationProps.inputErrorActiveClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      const eventsList = ["change", "paste", "input"];
      eventsList.forEach((eventName) => {
        inputElement.addEventListener(eventName, () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disabledButton();
    } else {
      this._buttonElement.classList.remove(
        this._validationProps.inactiveButtonClass
      );
      this._buttonElement.removeAttribute("disabled");
    }
  }

  _disabledButton() {
    this._buttonElement.classList.add(
      this._validationProps.inactiveButtonClass
    );
    this._buttonElement.setAttribute("disabled", true);
  }

  resetValidation() {
    this._hideInputErrors();
    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export { FormValidator };
