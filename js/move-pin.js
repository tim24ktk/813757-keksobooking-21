'use strict';

(() => {
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT_ACTIVE = 80;
  const MIN_Y = 130;
  const MAX_Y = 630;


  const mapPins = document.querySelector(`.map__pins`);
  window.main.mapPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    // координаты точки с которорй начали перемещать pin
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      // смещение относительно стартовой точки
      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      // перезаписывает координаты стартовой точки
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // текущие координаты
      let currentCoordinats = {
        x: `${window.main.mapPin.offsetLeft - shift.x}`,
        y: `${window.main.mapPin.offsetTop - shift.y}`
      };

      if (currentCoordinats.x >= -MAIN_PIN_WIDTH / 2
         && currentCoordinats.x <= window.main.map.clientWidth - MAIN_PIN_WIDTH / 2
         && currentCoordinats.y >= MIN_Y
         && currentCoordinats.y <= MAX_Y) {
        window.main.mapPin.style.left = `${currentCoordinats.x}px`;
        window.main.mapPin.style.top = `${currentCoordinats.y}px`;
        window.form.renderAddress(+currentCoordinats.x + MAIN_PIN_WIDTH / 2, +currentCoordinats.y + MAIN_PIN_HEIGHT_ACTIVE);
      }
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      mapPins.removeEventListener(`mousemove`, onMouseMove);
      mapPins.removeEventListener(`mouseup`, onMouseUp);
    };

    mapPins.addEventListener(`mousemove`, onMouseMove);
    mapPins.addEventListener(`mouseup`, onMouseUp);
  });
})();
