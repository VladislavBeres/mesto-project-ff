// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const addButton = content.querySelector(".profile__add-button");

const buttonEdit = content.querySelectorAll(".profile__edit-button");

const cardTemplate = document.querySelector("#card-template").content;


function createCard(data, onDelete) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
    
  cardElement.querySelector(".card__image").src = data.link;
  cardElement.querySelector(".card__image").alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  const delButton = cardElement.querySelector('.card__delete-button');
  delButton.addEventListener("click", () => onDelete(cardElement));

  return cardElement;
}

  const handleDelete = function onDelete(delCard) {
    delCard.remove();
  };

  function renderCard(card) {
    placesList.append(card)
};


initialCards.forEach (function (item) {
  renderCard(createCard(item, handleDelete));
});


