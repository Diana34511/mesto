class FormValidator {
  constructor(data, formToValid) {
    this._validationProps = data;
    this._form = formToValid;
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationProps.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._validationProps.inputErrorActiveClass);
  }

  hideInputErrorsOnClosePopup() {
    const inputs = this._form.querySelectorAll(
      this._validationProps.inputSelector
    );
    inputs.forEach((inputElement) => {
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
    const inputList = Array.from(
      this._form.querySelectorAll(this._validationProps.inputSelector)
    );
    const buttonElement = this._form.querySelector(
      this._validationProps.submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement, this._validationProps);

    inputList.forEach((inputElement) => {
      const eventsList = ["change", "paste", "input"];
      eventsList.forEach((eventName) => {
        inputElement.addEventListener(eventName, () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(inputList, buttonElement);
        });
      });
    });
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._validationProps.inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this._validationProps.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export { FormValidator };
