'use strict';

(() => {
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT_ACTIVE = 80;
  const ENTER = `Enter`;
  const ESCAPE = `Escape`;
  const MOUSE_EVENT_INDEX = 0;
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

  // функция активации страницы
  const activatePage = () => {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    window.map.createPins();
    for (const mapFiltersChild of mapFiltersChildren) {
      mapFiltersChild.disabled = false;
    }
    for (const adFormChild of adFormChildren) {
      adFormChild.disabled = false;
    }
    window.form.renderAddress(mainPinAddress.x, mainPinAddress.y);
    window.form.submitButton.style.pointerEvents = `auto`;
    mapPinMain.removeEventListener(`mousedown`, onMapPinMainMouseDown);
    mapPinMain.removeEventListener(`keydown`, onMapPinMainEnterKeyDown);
  };

  // активация страницы c помощью Enter
  const onMapPinMainEnterKeyDown = (evt) => {
    checkEnter(evt, activatePage);
  };

  // активация страницы с помощью мыши
  const onMapPinMainMouseDown = (evt) => {
    checkMouseDown(evt, activatePage);
  };

  const addEvent = () => {
    mapPinMain.addEventListener(`keydown`, onMapPinMainEnterKeyDown);
    mapPinMain.addEventListener(`mousedown`, onMapPinMainMouseDown);
  };

  addEvent();

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
  const checkEnter = (evt, enterActionCb) => {
    if (evt.key === ENTER) {
      enterActionCb();
    }
  };

  const checkMouseDown = (evt, clickActionCb) => {
    if (evt.button === MOUSE_EVENT_INDEX) {
      clickActionCb();
    }
  };

  const checkEscape = (evt, escapeActionCb) => {
    if (evt.key === ESCAPE) {
      evt.preventDefault();
      escapeActionCb();
    }
  };

  // экспорт
  window.main = {
    map: map,
    adForm: adForm,
    mapFilters: mapFilters,
    checkEscape: checkEscape,
    checkMouseDown: checkMouseDown,
    mapPin: mapPinMain,
    address: address,
    pinWidth: MAIN_PIN_WIDTH,
    pinHeightActive: MAIN_PIN_HEIGHT_ACTIVE,
    blockFilters: blockFilters,
    blockFilling: blockFilling,
    addEvent: addEvent,
    pinAddressX: mainPinAddress.x,
    pinAddressY: mainPinAddress.y,
  };
})();
