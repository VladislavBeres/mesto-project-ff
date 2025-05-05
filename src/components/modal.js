// открытие попапа
export function openPopup (popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyHandler);
}

// закрытие попапая
export function closePopup (popup){
  popup.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', keyHandler);
};

// закрытие попапа на Escape
export function keyHandler(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_is-opened");
    closePopup(popupOpened);
};
};

export function closePopupOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}