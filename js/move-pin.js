'use strict';

(() => {
  const MIN_Y = 130;
  const MAX_Y = 630;
  const mapPins = document.querySelector(`.map__pins`);

  window.main.mapPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    // координаты точки с которорй начали перемещать pin
    let startCoordinat = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMapPinsMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      // смещение относительно стартовой точки
      const shift = {
        x: startCoordinat.x - moveEvt.clientX,
        y: startCoordinat.y - moveEvt.clientY
      };

      // перезаписывает координаты стартовой точки
      startCoordinat = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // текущие координаты
      const currentCoordinat = {
        x: window.main.mapPin.offsetLeft - shift.x,
        y: window.main.mapPin.offsetTop - shift.y
      };

      if (currentCoordinat.x >= -window.main.pinWidth / 2
         && currentCoordinat.x <= window.main.map.clientWidth - window.main.pinWidth / 2
         && currentCoordinat.y >= (MIN_Y - window.main.pinHeightActive)
         && currentCoordinat.y <= (MAX_Y - window.main.pinHeightActive)) {

        window.main.mapPin.style.left = `${currentCoordinat.x}px`;
        window.main.mapPin.style.top = `${currentCoordinat.y}px`;
        window.form.renderAddress(currentCoordinat.x + Math.round(window.main.pinWidth / 2), currentCoordinat.y + window.main.pinHeightActive);
      }
    };

    const onMapPinsMouseUp = (upEvt) => {
      upEvt.preventDefault();
      mapPins.removeEventListener(`mousemove`, onMapPinsMouseMove);
      mapPins.removeEventListener(`mouseup`, onMapPinsMouseUp);
    };

    mapPins.addEventListener(`mousemove`, onMapPinsMouseMove);
    mapPins.addEventListener(`mouseup`, onMapPinsMouseUp);

    mapPins.addEventListener(`mouseleave`, () => {
      mapPins.removeEventListener(`mousemove`, onMapPinsMouseMove);
      mapPins.removeEventListener(`mouseup`, onMapPinsMouseUp);
    });
  });
})();
