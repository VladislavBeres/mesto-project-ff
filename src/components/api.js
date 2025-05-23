const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-39",
  headers: {
    authorization: "84f7634e-c844-43b2-886b-d0ecf25273a3",
    "Content-Type": "application/json",
  },
};

const checkResponse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
};

// здесь храниться наш ID
let currentUserId = "";


export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse)
}

//функция получения карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(checkResponse)
};

// отправляем отредактированные данные профиля
export const getNewName = (newName, newAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,

    body: JSON.stringify({
      name: newName,
      about: newAbout,
    }),
  })
    .then(checkResponse)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.error("Ошибка обновления профиля:", err);
    });
};

// Добавление новой карточки
export const getNewCard = (newCardName, newCardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,

    body: JSON.stringify({
      name: newCardName,
      link: newCardLink,
    }),
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка добавления карточки:", err);
    });
};

export const deleteCardFromServer =(cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
    });
}

export const likeOrRemoveLike = (cardId, method) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers,
  }).then(checkResponse)
}


export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(checkResponse)
};