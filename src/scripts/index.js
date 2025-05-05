import '../pages/index.css';
import {initialCards} from './cards.js';
import { createCard, likeCard, onDelete } from "../components/card.js";
import {
  openPopup,
  closePopup,
  closePopupOverlay,
} from "../components/modal.js";


const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

// переменные кнопок
const addButton = document.querySelector(".profile__add-button");
const buttonEdit = document.querySelector(".profile__edit-button");
const popupClose = document.querySelectorAll('.popup__close');

//  пременная всех попапов
const popups = document.querySelectorAll('.popup');

const cardTemplate = document.querySelector("#card-template").content;

//  колбэки удаления карточки, лайка карточки и открытие карточки в большом окне
const callbacks = {
  onDelete,
  likeCard,
  magnifiedImage,
};

//  функция добавления карточек на страницу
function renderCard(card) {
  placesList.append(card)
};

// вывод карточек на страницу
initialCards.forEach (function (item) {
  renderCard(createCard(item, callbacks, cardTemplate));
});

// переменные с попапами
const popupImage = document.querySelector('.popup_type_image');
const popupProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

// функция открытие карточки в большом окне
function magnifiedImage(src, textContent) {
  const popupSrc = popupImage.querySelector(".popup__image");
  const popupText = popupImage.querySelector(".popup__caption");
  popupSrc.src = src;
  popupText.textContent = textContent;
  openPopup(popupImage);
}

buttonEdit.addEventListener('click',() => {
  openPopup(popupProfile);
  fillProfileForm();
});

addButton.addEventListener('click', () => {
  openPopup(popupNewCard);
} );

// закрытие попапа на крестик
popupClose.forEach((button) => {
  button.addEventListener("click", () => {
    const popupToClose = button.closest(".popup");
    closePopup(popupToClose);
  });
});

popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    closePopupOverlay(event);
    
  });
});

// --------------------------работа с формой профиля---------------------------------//

// находим заголовок и параграф
const profilTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Находим поля формы в DOM
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_description');

//  поля «Имя» и «О себе» заполнены теми значениями, которые отображаются на странице
function fillProfileForm() {
  nameInput.value = profilTitle.textContent;
  jobInput.value = profileDescription.textContent;
}


// Обработчик отправки формы
function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    profilTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupProfile);
}

popupProfile.addEventListener('submit', handleFormSubmitProfile);


// -----------------------------добавление карточки--------------------

// получаем поля с ссылкой и назвнием новой карточки
const popupUrl = popupNewCard.querySelector(".popup__input_type_url");
const popupCardName = popupNewCard.querySelector(".popup__input_type_card-name");

// функция добавления карточки
function addCard(item, method = "append") {
  const cardElement = createCard(item, callbacks, cardTemplate);
  placesList[method](cardElement);
}

// Обработчик добавления
function handleFormSubmitCard(evt) {
  evt.preventDefault();

  const newCard = {
    link: popupUrl.value,
    name: popupCardName.value,
  };

  addCard(newCard, "prepend");
  closePopup(popupNewCard);
  evt.target.reset();
}

popupNewCard.addEventListener('submit', handleFormSubmitCard);
