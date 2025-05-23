import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, onDelete } from "../components/card.js";
import {
  openPopup,
  closePopup,
  closePopupOverlay,
} from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {getUserInfo, getInitialCards, getNewName, getNewCard, deleteCardFromServer, likeOrRemoveLike, updateAvatar} from "../components/api.js";

const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

// Переменные аватара
const popupAvatar = document.querySelector(".popup_type_avatar");
const avatarInput = popupAvatar.querySelector(".popup__input_type_avatar-url");
const avatarForm = popupAvatar.querySelector(".popup__form");
const profileImage = document.querySelector(".profile__image-wrapper");

// переменные кнопок
const addButton = document.querySelector(".profile__add-button");
const buttonEdit = document.querySelector(".profile__edit-button");
const popupClose = document.querySelectorAll(".popup__close");

//  пременная всех попапов
const popups = document.querySelectorAll(".popup");

const cardTemplate = document.querySelector("#card-template").content;

//  колбэки удаления карточки, лайка карточки и открытие карточки в большом окне
const callbacks = {
  onDelete,
  magnifiedImage,
  deleteCardFromServer,
  likeOrRemoveLike,
  handleLikeClick,
};

//  функция добавления карточек на страницу
function renderCard(card) {
  placesList.append(card);
}

// вывод карточек на страницу
// initialCards.forEach (function (item) {
//   renderCard(createCard(item, callbacks, cardTemplate));
// });

// переменные с попапами
const popupImage = document.querySelector(".popup_type_image");
const popupProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

// функция открытие карточки в большом окне
function magnifiedImage(src, textContent) {
  const popupSrc = popupImage.querySelector(".popup__image");
  const popupText = popupImage.querySelector(".popup__caption");
  popupSrc.src = src;
  popupText.textContent = textContent;
  openPopup(popupImage);
}

buttonEdit.addEventListener("click", () => {
  openPopup(popupProfile);
  fillProfileForm();
  clearValidation(popupProfile, validationConfig);
});

addButton.addEventListener("click", () => {
  openPopup(popupNewCard);
  clearValidation(popupNewCard, validationConfig);
});

profileImage.addEventListener("click", () => {
  openPopup(popupAvatar);
  clearValidation(popupAvatar, validationConfig);
});

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
const profilTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Находим поля формы в DOM
const nameInput = popupProfile.querySelector(".popup__input_type_name");
const jobInput = popupProfile.querySelector(".popup__input_type_description");

//  поля «Имя» и «О себе» заполнены теми значениями, которые отображаются на странице
function fillProfileForm() {
  nameInput.value = profilTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// Обработчик отправки формы
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  getNewName(nameInput.value, jobInput.value);
  profilTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupProfile);
}

popupProfile.addEventListener("submit", handleFormSubmitProfile);

// -----------------------------добавление карточки--------------------

// получаем поля с ссылкой и назвнием новой карточки
const popupUrl = popupNewCard.querySelector(".popup__input_type_url");
const popupCardName = popupNewCard.querySelector(
  ".popup__input_type_card-name"
);

// функция добавления карточки
function addCard(item, method = "append") {
  const cardElement = createCard(item, callbacks, cardTemplate, currentUserId);
  placesList[method](cardElement);
}

// Обработчик добавления
function handleFormSubmitCard(evt) {
  evt.preventDefault();

  const newCard = {
    link: popupUrl.value,
    name: popupCardName.value,
    likes: [],
    owner: { _id: currentUserId },
  };

  getNewCard(popupCardName.value, popupUrl.value)
    .then(cardData => {
      addCard(cardData, "prepend"); // теперь передаётся настоящая карточка от сервера
      closePopup(popupNewCard);
      evt.target.reset();
    })
    .catch(err => console.error("Ошибка при добавлении карточки:", err));
}

popupNewCard.addEventListener("submit", handleFormSubmitCard);

// -----------------------------Обновление аватара пользователя--------------------

function handleFormSubmitAvatar (evt) {
  evt.preventDefault();
  const newAvatar = avatarInput.value;
    updateAvatar(newAvatar)
      .then((data) => {
        document.querySelector('.profile__image').src = data.avatar;
        closePopup(popupAvatar);
        avatarForm.reset();
      })
      .catch((err) => console.error("Ошибка обновления аватара:", err));
}
avatarForm.addEventListener("submit", handleFormSubmitAvatar);

// ---------------------Валидеция форм-------------------------

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

// ---------------------Интеграция с API-------------------------

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-39",
  headers: {
    authorization: "84f7634e-c844-43b2-886b-d0ecf25273a3",
    "Content-Type": "application/json",
  },
};

// здесь храниться наш ID
let currentUserId = "";

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    // Сохраняем ID пользователя
    currentUserId = userData._id;
    // Вставляем наш avatar в фото профиля
    document.querySelector(".profile__image").src = userData.avatar;
    // Отображаем профиль
    profilTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;

    // Рендерим карточки пользователя
    cards.forEach((cardData) => {
      renderCard(createCard(cardData, callbacks, cardTemplate, currentUserId));
    });
  })
  .catch((err) => {
    console.error("Ошибка при загрузке данных:", err);
  });


function handleLikeClick(cardId, likeButton, likeCount, currentUserId) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const method = isLiked ? "DELETE" : "PUT";

  likeOrRemoveLike(cardId, method)
    .then(updatedCard => {
      likeCount.textContent = updatedCard.likes.length;
      const userLiked = updatedCard.likes.some(user => user._id === currentUserId);
      likeButton.classList.toggle("card__like-button_is-active", userLiked);
    })
    .catch(err => console.error("Ошибка при обработке лайка:", err));
}
