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

  const createCardOne = (advert) => {
    const announcementСardClone = announcementСard.cloneNode(true);
    const popupTextPrice = announcementСardClone.querySelector(`.popup__text--price`);
    const popupAvatar = announcementСardClone.querySelector(`.popup__avatar`);
    const popupTitle = announcementСardClone.querySelector(`.popup__title`);
    const popupTextAddress = announcementСardClone.querySelector(`.popup__text--address`);
    const popupType = announcementСardClone.querySelector(`.popup__type`);
    const popupTextCapacity = announcementСardClone.querySelector(`.popup__text--capacity`);
    const popupTextTime = announcementСardClone.querySelector(`.popup__text--time`);
    const popupDescription = announcementСardClone.querySelector(`.popup__description`);

    if (advert.offer.price !== undefined) {
      popupTextPrice.textContent = `${advert.offer.price}₽/ночь`;
    } else {
      popupTextPrice.remove();
    }

    if (advert.author.avatar !== undefined) {
      popupAvatar.src = advert.author.avatar;
    } else {
      popupAvatar.remove();
    }

    if (advert.offer.title !== undefined) {
      popupTitle.textContent = advert.offer.title;
    } else {
      popupTitle.remove();
    }

    if (advert.offer.address !== undefined) {
      popupTextAddress.textContent = advert.offer.address;
    } else {
      popupTextAddress.remove();
    }

    if (getWordValue(advert.offer.type) !== undefined) {
      popupType.textContent = getWordValue(advert.offer.type);
    } else {
      popupType.remove();
    }

    if (advert.offer.rooms !== undefined && advert.offer.guests !== undefined) {
      popupTextCapacity.textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
    } else {
      popupTextCapacity.remove();
    }

    if (advert.offer.checkin !== undefined && advert.offer.checkout !== undefined) {
      popupTextTime.textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
    } else {
      popupTextTime.remove();
    }

    if (advert.offer.description !== undefined) {
      popupDescription.textContent = advert.offer.description;
    } else {
      popupDescription.remove();
    }

    const features = announcementСardClone.querySelector(`.popup__features`);

    features.innerHTML = ``;
    // создание списка features
    if (advert.offer.features !== undefined) {
      const fragment = document.createDocumentFragment();
      advert.offer.features.forEach((feature) => {
        const featureItem = document.createElement(`li`);
        featureItem.className = `popup__feature popup__feature--${feature}`;
        fragment.appendChild(featureItem);
      });
      features.appendChild(fragment);
    }

    // вставить фото в каждый отдельный img
    const popupPhotos = announcementСardClone.querySelector(`.popup__photos`);
    const popupPhoto = announcementСardClone.querySelector(`.popup__photo`);

    if (advert.offer.photos !== undefined) {
      advert.offer.photos.forEach((photo) => {
        const clonedImage = popupPhoto.cloneNode(true);
        clonedImage.src = photo;
        popupPhotos.appendChild(clonedImage);
      });
    }

    popupPhotos.removeChild(popupPhoto);

    const popupClose = announcementСardClone.querySelector(`.popup__close`);

    document.addEventListener(`keydown`, onEscapeKeydown);
    popupClose.addEventListener(`click`, onPopupCloseClick);

    return announcementСardClone;
  };

  const mapFiltersContainer = document.querySelector(`.map__filters-container`);
  const map = document.querySelector(`.map`);

  const closePopup = () => {
    window.map.removeCard();
    document.removeEventListener(`keydown`, onEscapeKeydown);
  };

  const onEscapeKeydown = (evt) => {
    window.main.checkEscape(evt, closePopup);
  };

  const onPopupCloseClick = (evt) => {
    window.main.checkMouseDown(evt, closePopup);
  };

  const createCard = (item) => {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(createCardOne(item));
    map.insertBefore(fragment, mapFiltersContainer);
  };

  window.card = {
    create: createCard
  };
})();
