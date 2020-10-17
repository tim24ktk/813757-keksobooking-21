'use strict';

(() => {
// ф-я присваивает анг. значениям на русском
  const getWordValue = (type) => {
    switch (type) {
      case `palace`:
        return `Дворец`;
      case `flat`:
        return `Квартира`;
      case `house`:
        return `Дом`;
      case `bungalow`:
        return `Бунгало`;
    }
    return type;
  };
  // ф-я отрисовки модального окна с информацией об объявлении
  const announcementСard = document.querySelector(`#card`).content.querySelector(`.popup`);

  const createCardOne = (declaration) => {
    const announcementСardClone = announcementСard.cloneNode(true);
    const popupTextPrice = announcementСardClone.querySelector(`.popup__text--price`);
    popupTextPrice.innerHTML = `${declaration.offer.price}<span>&#8381;/ночь</span>`;
    announcementСardClone.querySelector(`.popup__avatar`).src = declaration.author.avatar;
    announcementСardClone.querySelector(`.popup__title`).textContent = declaration.offer.title;
    announcementСardClone.querySelector(`.popup__text--address`).textContent = declaration.offer.address;
    announcementСardClone.querySelector(`.popup__type`).textContent = getWordValue(declaration.offer.type);
    announcementСardClone.querySelector(`.popup__text--capacity`).textContent = `${declaration.offer.rooms} комнаты для ${declaration.offer.guests} гостей`;
    announcementСardClone.querySelector(`.popup__text--time`).textContent = `Заезд после ${declaration.offer.checkin}, выезд до ${declaration.offer.checkout}`;
    announcementСardClone.querySelector(`.popup__description`).textContent = declaration.offer.description;
    const features = announcementСardClone.querySelector(`.popup__features`).children;

    // удаление элемента списка
    for (let i = 0; i < features.length; i++) {
      if (!features[i].classList.contains(`popup__feature--${declaration.offer.features[i]}`)) {
        features[i].remove();
      }
    }

    // вставить фото в каждый отдельный img
    const popupPhotos = announcementСardClone.querySelector(`.popup__photos`);
    const popupPhoto = announcementСardClone.querySelector(`.popup__photo`);
    popupPhoto.setAttribute(`src`, declaration.offer.photos[0]);

    if (declaration.offer.photos[0] === undefined) {
      popupPhoto.remove();
    }

    for (let i = 1; i < declaration.offer.photos.length; i++) {
      const clonedImage = popupPhoto.cloneNode(true);
      clonedImage.setAttribute(`src`, declaration.offer.photos[i]);
      popupPhotos.appendChild(clonedImage);
    }

    const popupClose = announcementСardClone.querySelector(`.popup__close`);

    document.addEventListener(`keydown`, onPopupEscape);
    popupClose.addEventListener(`keydown`, onPopupEnter);
    popupClose.addEventListener(`click`, onPopupClick);

    return announcementСardClone;
  };

  const mapFiltersContainer = document.querySelector(`.map__filters-container`);
  const map = document.querySelector(`.map`);


  const closePopup = () => {
    window.map.removeCard();
    document.removeEventListener(`keydown`, onPopupEscape);
    document.removeEventListener(`keydown`, onPopupEnter);
    document.removeEventListener(`click`, onPopupClick);
  };

  const onPopupEscape = (evt) => {
    window.main.escapeKeyDown(evt, closePopup);
  };

  const onPopupEnter = (evt) => {
    window.main.enterKeyDown(evt, closePopup);
  };

  const onPopupClick = (evt) => {
    window.main.clickMouseDown(evt, closePopup);
  };

  const createCard = (item) => {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(createCardOne(item));
    map.insertBefore(fragment, mapFiltersContainer);
  };

  window.card = {
    createCard: createCard,
  };
})();
