export function createCard(data, callbacks, cardTemplate) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
    
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  
  // переменная кнопки удаления
  const delButton = cardElement.querySelector('.card__delete-button');

  // слушатель кнопки удаления
  delButton.addEventListener("click", () => {
    callbacks.onDelete(cardElement)
  });

  // переменная кнопки лайка
  const likeButton = cardElement.querySelector(".card__like-button");

  // слушатель кнопки лайка
  likeButton.addEventListener("click", () => {
    callbacks.likeCard(likeButton);
  });

  // слушатель открытия карточки
  cardImage.addEventListener("click", () => {
    callbacks.magnifiedImage(cardImage.src, cardTitle.textContent);
  });

  return cardElement;
}

// функция добавления и удаления лайка
export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export function onDelete(delCard) {
  delCard.remove();
};