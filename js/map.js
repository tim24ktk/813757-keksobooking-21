'use strict';

// модуль отрисовки меток на карте
(() => {
  const housingType = window.main.mapFilters.querySelector(`#housing-type`);

  let pins = [];

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

  const updatePins = () => {
    const sameHousingType = pins.filter((housing) => {
      switch (housingType.value) {
        case `any`:
          return housing.offer.type;
      }
      return housing.offer.type === housingType.value;
    });
    window.pins.createElements(sameHousingType);
  };

  housingType.addEventListener(`change`, (evt) => {
    evt.preventDefault();
    window.debounce(() => {
      removePins();
      removeCard();
      updatePins(pins);
    });
  });

  const onSuccess = (data) => {
    pins = data;
    updatePins(pins);
  };

  const onError = (error) => {
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
    window.load(onSuccess, onError);
  };

  window.map = {
    createPins: createMapPins
  };
})();
