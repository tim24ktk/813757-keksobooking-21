'use strict';

// модуль отрисовки меток на карте
(() => {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
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

  const createMapPins = (arrays) => {
    const fragment = document.createDocumentFragment();
    arrays.forEach((item) => {
      fragment.appendChild(getElementWithSimpleLabel(item));
    });
    mapPins.appendChild(fragment);
  };

  window.map = {
    createPins: createMapPins,
  };
})();
