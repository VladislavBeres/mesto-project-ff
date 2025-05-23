export function createCard(data, callbacks, cardTemplate, currentUserId) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const delButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  cardElement.dataset.id = data._id;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // Устанавливаем счётчик лайков
  likeCount.textContent = data.likes.length;

  // Проверяем, лайкнул ли текущий пользователь
  const isLiked = data.likes.some((like) => like._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Добавляем слушатель удаления, если карточка принадлежит пользователю
  if (data.owner._id === currentUserId) {
    delButton.addEventListener("click", () => {
      callbacks.deleteCardFromServer(data._id)
        .then(() => callbacks.onDelete(cardElement))
    });
  } else {
    delButton.remove();
  }
    
  // Обработка лайка
  likeButton.addEventListener("click", () => {
    callbacks.handleLikeClick(data._id, likeButton, likeCount, currentUserId);
});

  // Открытие увеличенного изображения
  cardImage.addEventListener("click", () => {
    callbacks.magnifiedImage(data.link, data.name);
  });

  return cardElement;
}

export function onDelete(cardElement) {
  cardElement.remove();
}

