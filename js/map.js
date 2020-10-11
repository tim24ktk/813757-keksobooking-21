'use strict';

// модуль отрисовки меток на карте
(() => {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const MAX_SIMILAR_PIN_COUNT = 5;
  const mapPins = window.main.map.querySelector(`.map__pins`);
  const pinContent = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  // создание DOM элемента на основе JS-объекта
  const getElementWithSimpleLabel = (declaration) => {
    const pinContentClone = pinContent.cloneNode(true);
    const pinImg = pinContentClone.querySelector(`img`);
    pinContentClone.style.left = `${declaration.location.x - PIN_WIDTH / 2}px`;
    pinContentClone.style.top = `${declaration.location.y - PIN_HEIGHT}px`;
    pinImg.src = declaration.author.avatar;
    pinImg.alt = declaration.offer.title;
    return pinContentClone;
  };

  const onSuccess = (data) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < MAX_SIMILAR_PIN_COUNT; i++) {
      if (data[i].offer !== undefined) {
        fragment.appendChild(getElementWithSimpleLabel(data[i]));
      }
    }
    mapPins.appendChild(fragment);
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
