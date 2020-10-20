'use strict';

(() => {
  // ф-ия синхронного переключения времени въезда / выезда
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const adFormTime = window.main.adForm.querySelector(`.ad-form__element--time`);
  const price = window.main.adForm.querySelector(`#price`);
  const timeIn = adFormTime.querySelector(`#timein`);
  const timeOut = adFormTime.querySelector(`#timeout`);
  const roomNumber = window.main.adForm.querySelector(`#room_number`);
  const capacity = window.main.adForm.querySelector(`#capacity`);
  const adTitleInput = window.main.adForm.querySelector(`#title`);
  const type = document.querySelector(`#type`);

  // адрес активированного пина
  const renderAddress = (x, y) => {
    window.main.address.value = `${x}, ${y}`;
  };

  const onAdFormTimeChange = (evt) => {
    timeIn.value = evt.target.value;
    timeOut.value = evt.target.value;
  };
  adFormTime.addEventListener(`change`, onAdFormTimeChange);

  // ф-я изменения placeholder и проверки мин цены в зависимости от типа жилья
  const onTypeChange = (evt) => {
    if (evt.target.value === `bungalo`) {
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

  window.form = {
    renderAddress: renderAddress,
  };
})();
