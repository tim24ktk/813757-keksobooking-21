'use strict';

const MIN_Y = 130;
const MAX_Y = 630;
const COORDINATE_CORRECTION = 1;
const mapPins = document.querySelector(`.map__pins`);

window.main.mapPin.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();
  // координаты точки с которорй начали перемещать pin
  let startCoordinate = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMapPinsMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    // смещение относительно стартовой точки
    const shift = {
      x: startCoordinate.x - moveEvt.clientX,
      y: startCoordinate.y - moveEvt.clientY
    };

    // перезаписывает координаты стартовой точки
    startCoordinate = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    // текущие координаты
    const currentCoordinate = {
      x: window.main.mapPin.offsetLeft - shift.x,
      y: window.main.mapPin.offsetTop - shift.y
    };

    if (currentCoordinate.x >= -window.main.pinWidth / 2
        && currentCoordinate.x <= (window.main.map.clientWidth - window.main.pinWidth / 2 + COORDINATE_CORRECTION)
        && currentCoordinate.y >= (MIN_Y - window.main.pinHeightActive)
        && currentCoordinate.y <= (MAX_Y - window.main.pinHeightActive)) {

      window.main.mapPin.style.left = `${currentCoordinate.x}px`;
      window.main.mapPin.style.top = `${currentCoordinate.y}px`;
      window.form.renderAddress(currentCoordinate.x + Math.floor(window.main.pinWidth / 2), currentCoordinate.y + window.main.pinHeightActive);
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
