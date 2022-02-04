const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', openPopup);
function openPopup() {
    const popup = document.querySelector('.popup');
    popup.classList.add('popup_opened');
    // console.log(popup);

    const profileTitle = document.querySelector('.profile__title');
    const profileSubitle = document.querySelector('.profile__subtitle');

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubitle.textContent;

}


function closePopupOnBackground(event) {
    console.log(event.target, event.currentTarget);
    if (event.target !== event.currentTarget) {
       return
    }  
    closePopup()
}

function closePopup(){
    popup.classList.remove('popup_opened');
}

const popup = document.querySelector('.popup');
popup.addEventListener('click', closePopupOnBackground);
const popupCloseButton = document.querySelector('.popup__close-button');
popupCloseButton.addEventListener('click', closePopup);

// Находим форму в DOM
const formElement = document.querySelector('.popup__content');
// Находим поля формы в DOM
const nameInput = document.querySelector('input[name="nameInput"]');
const jobInput = document.querySelector('input[name="jobInput"]');

function validateInputs() {
    if(nameInput.value && jobInput.value) {
        popupSubmitButton.removeAttribute('disabled');
    } else {
        popupSubmitButton.setAttribute('disabled', true);
    }
}

nameInput.addEventListener('input', validateInputs);
jobInput.addEventListener('input', validateInputs);

const popupSubmitButton = document.querySelector('.popup__button');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Выберите элементы, куда должны быть вставлены значения полей
    const profileTitle = document.querySelector('.profile__title');
    const profileSubitle = document.querySelector('.profile__subtitle');

    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameInput.value;
    profileSubitle.textContent = jobInput.value;

    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);