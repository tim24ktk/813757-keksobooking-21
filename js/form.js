'use strict';

const LEFT = 570;
const TOP = 375;
const adFormTime = window.main.adForm.querySelector(`.ad-form__element--time`);
const price = window.main.adForm.querySelector(`#price`);
const timeIn = adFormTime.querySelector(`#timein`);
const timeOut = adFormTime.querySelector(`#timeout`);
const roomNumber = window.main.adForm.querySelector(`#room_number`);
const capacity = window.main.adForm.querySelector(`#capacity`);
const type = document.querySelector(`#type`);
const submitButton = window.main.adForm.querySelector(`.ad-form__submit`);

// адрес активированного пина
const renderAddress = (x, y) => {
  window.main.address.value = `${x}, ${y}`;
};

// ф-ия синхронного переключения времени въезда / выезда
const onAdFormTimeChange = (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
};
adFormTime.addEventListener(`change`, onAdFormTimeChange);

const houseTypeToPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

// ф-я изменения placeholder и проверки мин цены в зависимости от типа жилья
const setHouseTypeMinPrice = () => {
  const value = houseTypeToPrice[type.value];
  price.placeholder = value;
  price.min = value;
};

const onTypeChange = () => {
  setHouseTypeMinPrice();
};

type.addEventListener(`change`, onTypeChange);

// ф-я проверки количества соответствия количества гостей и комнат

const onCapacityChange = () => {
  validateRoomCapacity();
};

const onRoomNumberChange = () => {
  validateRoomCapacity();
};

capacity.addEventListener(`change`, onCapacityChange);
roomNumber.addEventListener(`change`, onRoomNumberChange);

const checkRoomCapacity = () => {
  const capacityValue = +capacity.value;
  const roomValue = +roomNumber.value;
  return (capacityValue <= roomValue && roomValue !== 100 && capacityValue !== 0)
          || (roomValue === 100 && capacityValue === 0);
};

const validateRoomCapacity = () => {
  const errorMessage = checkRoomCapacity() ? `` : `Недоступное кол. мест`;
  capacity.setCustomValidity(errorMessage);
  const className = errorMessage !== `` ? `red` : ``;
  roomNumber.style.borderColor = className;
  capacity.style.borderColor = className;
};

const successMessage = document.querySelector(`#success`).content.querySelector(`.success`);
const main = document.querySelector(`main`);

const showSuccessMessage = () => {
  const clonedSuccessMessage = successMessage.cloneNode(true);
  main.appendChild(clonedSuccessMessage);
};

const errorMessage = document.querySelector(`#error`).content.querySelector(`.error`);

const showErrorMessage = () => {
  const clonedErrorMessage = errorMessage.cloneNode(true);
  main.appendChild(clonedErrorMessage);

  const errorButton = clonedErrorMessage.querySelector(`.error__button`);
  errorButton.addEventListener(`click`, onErrorButtonClick);
};

const removeMessage = () => {
  const message = document.querySelector(`.success, .error`);
  if (message !== null) {
    message.remove();
    removeEvents();
  }
};

const onErrorButtonClick = () => {
  removeMessage();
};

const addEvent = () => {
  document.addEventListener(`keydown`, onDocumentKeyDown);
  document.addEventListener(`click`, onDocumentClick);
};

const removeEvents = () => {
  document.removeEventListener(`keydown`, onDocumentKeyDown);
  document.removeEventListener(`click`, onDocumentClick);
};

const onDocumentKeyDown = (evt) => {
  window.main.checkEscape(evt, removeMessage);
};

const onDocumentClick = (evt) => {
  window.main.checkMouseDown(evt, removeMessage);
};

const deactivatePage = () => {
  window.main.adForm.reset();
  setHouseTypeMinPrice();
  validateRoomCapacity();
  window.main.mapFilters.reset();
  window.main.map.classList.add(`map--faded`);
  window.main.adForm.classList.add(`ad-form--disabled`);
  window.uploadPhoto.reset();
  window.main.blockFilters();
  window.main.blockFilling();
  window.map.removePins();
  window.map.removeCard();
  window.main.mapPin.style.left = `${LEFT}px`;
  window.main.mapPin.style.top = `${TOP}px`;
  window.main.addEvent();
  submitButton.style.pointerEvents = `none`;
};

const onUploadSuccess = () => {
  deactivatePage();
  showSuccessMessage();
  addEvent();
};

const onUploadError = () => {
  showErrorMessage();
  addEvent();
};

const formReset = document.querySelector(`.ad-form__reset`);

const onFormResetClick = (evt) => {
  evt.preventDefault();

  deactivatePage();
};

formReset.addEventListener(`click`, onFormResetClick);

window.main.adForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  window.upload(new FormData(window.main.adForm), onUploadSuccess, onUploadError);
});

window.form = {
  renderAddress: renderAddress,
  submitButton: submitButton
};
