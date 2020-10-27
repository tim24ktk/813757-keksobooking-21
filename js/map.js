'use strict';

// модуль отрисовки меток на карте
(() => {
  const MAX_ADVERT = 5;
  const TYPE_ANY = `any`;
  const TYPE_MIDDLE = `middle`;
  const TYPE_LOW = `low`;
  const TYPE_HIGH = `high`;
  const MIN_PRICE = 0;
  const LOW_PRICE = 10000;
  const HIGH_PRICE = 50000;


  const housingType = window.main.mapFilters.querySelector(`#housing-type`);
  const housingPrice = window.main.mapFilters.querySelector(`#housing-price`);
  const housingRooms = window.main.mapFilters.querySelector(`#housing-rooms`);
  const housingGuests = window.main.mapFilters.querySelector(`#housing-guests`);

  let adverts = [];

  // ф-я удаляет пины которые уже отрисованы на карте
  const removePins = () => {
    const mapPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    mapPins.forEach((pin) => {
      pin.remove();
    });
  };

  const removeCard = () => {
    const declarationCard = document.querySelector(`.map__card`);
    if (declarationCard) {
      declarationCard.remove();
      window.pins.removeActive();
    }
  };

  const checkHousingType = (advert) => {
    return housingType.value === TYPE_ANY || housingType.value === advert.offer.type;
  };

  const checkHousingPrice = (advert) => {
    switch (housingPrice.value) {
      case TYPE_ANY:
        return advert.offer.price >= MIN_PRICE;
      case TYPE_MIDDLE:
        return advert.offer.price >= LOW_PRICE && advert.offer.price <= HIGH_PRICE;
      case TYPE_LOW:
        return advert.offer.price <= LOW_PRICE;
      case TYPE_HIGH:
        return advert.offer.price >= HIGH_PRICE;
    }
    return advert.offer.price;
  };

  const checkHousingRooms = (advert) => {
    return housingRooms.value === TYPE_ANY || +housingRooms.value === advert.offer.rooms;
  };

  const checkHousingGuests = (advert) => {
    return housingGuests.value === TYPE_ANY || +housingGuests.value === advert.offer.guests;
  };

  const checkHousingFeatures = (advert) => {
    const features = [];

    const housingFeatures = window.main.mapFilters.querySelectorAll(`input:checked`);

    for (let i = 0; i < housingFeatures.length; i++) {
      features.push(housingFeatures[i].value);
    }

    return features.every((value) => {
      return advert.offer.features.includes(value);
    });
  };

  const checkFilters = (advert) => {
    return checkHousingType(advert)
      && checkHousingPrice(advert)
      && checkHousingRooms(advert)
      && checkHousingGuests(advert)
      && checkHousingFeatures(advert);
  };

  const updatePins = () => {
    const filteredAdverts = [];

    for (let i = 0; i < adverts.length; i++) {
      const advert = adverts[i];

      if (checkFilters(advert)) {
        filteredAdverts.push(advert);

        if (filteredAdverts.length === MAX_ADVERT) {
          break;
        }
      }
    }
    window.pins.createElements(filteredAdverts);
  };

  window.main.mapFilters.addEventListener(`change`, (evt) => {
    evt.preventDefault();
    window.debounce(() => {
      removePins();
      removeCard();
      updatePins();
    });
  });

  const onLoadSuccess = (data) => {
    adverts = data;
    updatePins();
  };

  const onLoadError = (error) => {
    window.message.showError(error);
    window.main.blockFilters();
  };

  const createMapPins = () => {
    window.download(onLoadSuccess, onLoadError);
  };

  window.map = {
    createPins: createMapPins,
    removeCard: removeCard,
    removePins: removePins,
    updatePins: updatePins,
  };
})();
