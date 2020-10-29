'use strict';

(() => {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const LEFT = 570;
  const TOP = 375;
  const adFormTime = window.main.adForm.querySelector(`.ad-form__element--time`);
  const price = window.main.adForm.querySelector(`#price`);
  const timeIn = adFormTime.querySelector(`#timein`);
  const timeOut = adFormTime.querySelector(`#timeout`);
  const roomNumber = window.main.adForm.querySelector(`#room_number`);
  const capacity = window.main.adForm.querySelector(`#capacity`);
  const adTitleInput = window.main.adForm.querySelector(`#title`);
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

  // ф-я изменения placeholder и проверки мин цены в зависимости от типа жилья
  const onTypeChange = (evt) => {
    if (evt.target.value === `bungalow`) {
      price.placeholder = `0`;
      price.min = `0`;
    } else if (evt.target.value === `flat`) {
      price.placeholder = `1 000`;
      price.min = `1000`;
    } else if (evt.target.value === `house`) {
      price.placeholder = `5 000`;
      price.min = `5000`;
    } else if (evt.target.value === `palace`) {
      price.placeholder = `10 000`;
      price.min = `10000`;
    }
  };

  type.addEventListener(`change`, onTypeChange);

  // ф-я проверки провильного заполнения заголовка объявления
  adTitleInput.addEventListener(`input`, () => {
    const valueLength = adTitleInput.value.length;
    if (valueLength < MIN_TITLE_LENGTH) {
      adTitleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
    } else if (adTitleInput > MAX_TITLE_LENGTH) {
      adTitleInput.setCustomValidity(`Удалите ${valueLength - MAX_TITLE_LENGTH} симв.`);
    } else {
      adTitleInput.setCustomValidity(``);
    }
  });

  adTitleInput.addEventListener(`invalid`, () => {
    if (adTitleInput.validity.tooShort) {
      adTitleInput.setCustomValidity(`Имя должно состоять минимум из 30 символов`);
    } else if (adTitleInput.validity.tooLong) {
      adTitleInput.setCustomValidity(`Имя не должно превышать 100 символов`);
    } else if (adTitleInput.validity.valueMissing) {
      adTitleInput.setCustomValidity(`Обязательное поле`);
    } else {
      adTitleInput.setCustomValidity(``);
    }
  });

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
})();
