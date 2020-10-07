'use strict';

(() => {
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT_ACTIVE = 80;
  const ENTER = `Enter`;
  const MOUSE_EVENT_INDEX = 0;

  // переменные для активации страницы и валидации формы!!!
  const map = document.querySelector(`.map`);
  const mapFilters = map.querySelector(`.map__filters`);
  const adForm = document.querySelector(`.ad-form`);
  const mapFiltersChildren = mapFilters.children;
  const adFormChildren = adForm.children;
  const address = adForm.querySelector(`#address`);
  const mapPinMain = document.querySelector(`.map__pin--main`);

  const mainPinPositionX = mapPinMain.offsetLeft;
  const mainPinPositionY = mapPinMain.offsetTop;


  const mainPinCenter = {
    x: Math.round(mainPinPositionX + MAIN_PIN_WIDTH / 2),
    y: Math.round(mainPinPositionY + MAIN_PIN_WIDTH / 2)
  };

  const mainPinAddress = {
    x: Math.round(mainPinPositionX + MAIN_PIN_WIDTH / 2),
    y: Math.round(mainPinPositionY + MAIN_PIN_HEIGHT_ACTIVE),
  };

  // адрес активированного пина
  const renderAddress = () => {
    address.value = `${mainPinAddress.x}, ${mainPinAddress.y}`;
  };

  // функция активации страницы
  const activatePage = () => {
    for (const mapFiltersChild of mapFiltersChildren) {
      mapFiltersChild.disabled = false;
    }
    for (const adFormChild of adFormChildren) {
      adFormChild.disabled = false;
    }
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    window.map.createPins();
    renderAddress();
    mapPinMain.removeEventListener(`mousedown`, onMapPinMainMouseDown);
    mapPinMain.removeEventListener(`keydown`, onMapPinMainEnterKeyDown);
  };

  // активация страницы c помощью Enter
  const onMapPinMainEnterKeyDown = (evt) => {
    enterKeyDown(evt, activatePage);
  };
  mapPinMain.addEventListener(`keydown`, onMapPinMainEnterKeyDown);

  // активация страницы с помощью мыши
  const onMapPinMainMouseDown = (evt) => {
    clickMouseDown(evt, activatePage);
  };

  mapPinMain.addEventListener(`mousedown`, onMapPinMainMouseDown);

  // ф-я блокировки формы с фильтрами
  const blockFilters = () => {
    for (const mapFiltersChild of mapFiltersChildren) {
      mapFiltersChild.disabled = true;
    }
  };
  blockFilters();

  // функция блокировки формы заполнения инфомации об объявлении
  const blockFilling = () => {
    for (const adFormChild of adFormChildren) {
      adFormChild.disabled = true;
    }
    address.value = `${mainPinCenter.x}, ${mainPinCenter.y}`;
  };
  blockFilling();

  // общее
  const enterKeyDown = (evt, action) => {
    if (evt.key === ENTER) {
      action();
    }
  };

  const clickMouseDown = (evt, action) => {
    if (evt.button === MOUSE_EVENT_INDEX) {
      action();
    }
  };

  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  // экспорт
  window.main = {
    getRandomNumber: getRandomNumber,
    map: map,
    adForm: adForm,
  };
})();
