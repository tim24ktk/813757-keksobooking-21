'use strict';

// модуль отрисовки меток на карте
(() => {
  const MAX_ADVERT = 5;
  const TYPE_ANY = `any`;

  const housingType = window.main.mapFilters.querySelector(`#housing-type`);

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

  const checkFilters = (advert) => {
    return checkHousingType(advert);
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

  housingType.addEventListener(`change`, (evt) => {
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
