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
      }

      if (filteredAdverts.length === MAX_ADVERT) {
        break;
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
    const errorMessage = document.createElement(`div`);
    errorMessage.textContent = error;
    errorMessage.style.width = `400px`;
    errorMessage.style.height = `60px`;
    errorMessage.style.borderWidth = `5px`;
    errorMessage.style.borderStyle = `solid`;
    errorMessage.style.borderRadius = `20px`;
    errorMessage.style.font = `25px`;
    errorMessage.style.color = `red`;
    errorMessage.style.backgroundColor = `white`;
    errorMessage.style.position = `fixed`;
    errorMessage.style.zIndex = `1000`;
    errorMessage.style.display = `flex`;
    errorMessage.style.justifyContent = `space-around`;
    errorMessage.style.alignItems = `center`;
    errorMessage.style.top = `50%`;
    errorMessage.style.left = `50%`;
    errorMessage.style.transform = `translateX(-200px)`;
    document.body.appendChild(errorMessage);
    window.main.blockElements();
  };

  const createMapPins = () => {
    window.load(onLoadSuccess, onLoadError);
  };

  window.map = {
    createPins: createMapPins
  };
})();
