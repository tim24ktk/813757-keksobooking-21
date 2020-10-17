'use strict';
// модуль создания пина
(() => {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const MAX_SIMILAR_PIN_COUNT = 5;
  const mapPins = window.main.map.querySelector(`.map__pins`);
  const pinContent = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const removePinActive = () => {
    const clickedElement = mapPins.querySelector(`.map__pin--active`);

    if (clickedElement) {
      clickedElement.classList.remove('map__pin--active');
    }
  };

  // создание DOM элемента на основе JS-объекта
  const getElementWithSimpleLabel = (declaration) => {
    const pinContentClone = pinContent.cloneNode(true);
    const pinImg = pinContentClone.querySelector(`img`);
    pinContentClone.style.left = `${declaration.location.x - PIN_WIDTH / 2}px`;
    pinContentClone.style.top = `${declaration.location.y - PIN_HEIGHT}px`;
    pinImg.src = declaration.author.avatar;
    pinImg.alt = declaration.offer.title;

    pinContentClone.addEventListener(`click`, () => {
      window.map.removeCard();

      removePinActive();

      pinContentClone.classList.add(`map__pin--active`);

      window.card.createCard(declaration);
    });

    return pinContentClone;
  };

  const createSimilarElements = (elements) => {
    const takeNumber = elements.length > MAX_SIMILAR_PIN_COUNT ? MAX_SIMILAR_PIN_COUNT : elements.length;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < takeNumber; i++) {
      if (elements[i].offer !== undefined) {
        fragment.appendChild(getElementWithSimpleLabel(elements[i]));
      }
    }
    mapPins.appendChild(fragment);
  };

  window.pins = {
    createElements: createSimilarElements,
    removeActive: removePinActive
  };
})();
