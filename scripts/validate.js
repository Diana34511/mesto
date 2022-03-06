const validationClassNames = {
    formSelector: '.popup__form',
    inputSelector: '.popup__textarea',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__textarea_type_error',
    inputErrorActiveClass: 'popup__textarea-error_active',
    errorClass: 'popup__error_visible'
  };

const showInputError = (formElement, inputElement, errorMessage, validationProps) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationProps.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationProps.inputErrorActiveClass);
    console.log('hello');
  };

const hideInputError = (formElement, inputElement, validationProps) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationProps.inputErrorClass);
    errorElement.classList.remove(validationProps.inputErrorActiveClass);
    errorElement.textContent = '';
  };

const checkInputValidity = (formElement, inputElement, validationProps) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationProps);
    } else {
      hideInputError(formElement, inputElement, validationProps);
    }
  };

  const setEventListeners = (formElement, validationProps) => {
    const inputList = Array.from(formElement.querySelectorAll(validationProps.inputSelector));
    const buttonElement = formElement.querySelector(validationProps.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationProps);
    inputList.forEach((inputElement) => {
      const eventsList = ["change", "keyup", "paste", "input", "propertychange"];   
      eventsList.forEach(eventName => {
        inputElement.addEventListener(eventName, function () {
            checkInputValidity(formElement, inputElement, validationProps);
            toggleButtonState(inputList, buttonElement, validationProps);
          });
      })
    });
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  const toggleButtonState = (inputList, buttonElement, validationProps) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationProps.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(validationProps.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  const enableValidation = (validationProps) => {
    const formList = Array.from(document.querySelectorAll(validationProps.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, validationProps);
    });
  };

enableValidation(validationClassNames);