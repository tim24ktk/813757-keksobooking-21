'use strict';

const LENGTHS = 8;
const TYPES_OF_HOUSING = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN_CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
const TYPES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MIN_X = 0;
const MAX_X = 1200;
const MIN_Y = 130;
const MAX_Y = 630;
const MAX_PRICE = 1000000;
const MIN_ROOM = 1;
const MAX_ROOM = 4;
const MIN_GUEST = 1;
const MAX_GUEST = 10;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGHT_ACTIVE = 80;
const ENTER = `Enter`;
const MOUSE_EVENT_INDEX = 0;
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

// переменные для активации страницы и валидации формы!!!
const map = document.querySelector(`.map`);
const mapFilters = map.querySelector(`.map__filters`);
const adForm = document.querySelector(`.ad-form`);
const price = adForm.querySelector(`#price`);
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
  createMapPins(getArraysRandomAds());
  renderAddress();
  mapPinMain.removeEventListener(`mousedown`, onMapPinMainMouseDown);
  mapPinMain.removeEventListener(`keydown`, onMapPinMainEnterKeyDown);
};

// активация страницы c помощью Enter
const onMapPinMainEnterKeyDown = (evt) => {
  if (evt.key === ENTER) {
    activatePage();
  }
};

mapPinMain.addEventListener(`keydown`, onMapPinMainEnterKeyDown);

// активация страницы с помощью мыши
const onMapPinMainMouseDown = (evt) => {
  if (evt.button === MOUSE_EVENT_INDEX) {
    activatePage();
  }
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

// ф-ия синхронного переключения времени въезда / выезда
const adFormTime = adForm.querySelector(`.ad-form__element--time`);
const timeIn = adFormTime.querySelector(`#timein`);
const timeOut = adFormTime.querySelector(`#timeout`);

const onAdFormTimeChange = (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
};
adFormTime.addEventListener(`change`, onAdFormTimeChange);

// ф-я изменения placeholder и проверки мин цены в зависимости от типа жилья
const type = document.querySelector(`#type`);
const checkPriceOffer = (evt) => {
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

type.addEventListener(`change`, checkPriceOffer);

// ф-я проверки провильного заполнения заголовка объявления
const adTitleInput = adForm.querySelector(`#title`);
adTitleInput.addEventListener(`input`, () => {
  const valueLength = adTitleInput.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    adTitleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (adTitleInput > MAX_TITLE_LENGTH) {
    adTitleInput.setCustomValidity(`Удалите ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    adTitleInput.setCustomValidity(``);
  }
  // adTitleInput.reportVadality(); почему-то с ним показывает ошибку хотя в в демонстрации добавляется на 18 шаге, но без него все работает как задумано!
});

adTitleInput.addEventListener(`invalid`, function () {
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
const roomNumber = adForm.querySelector(`#room_number`);
const capacity = adForm.querySelector(`#capacity`);

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

// функция получения случайного числа
const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

// функция создания массива из 8 сгенериванных JS объектов
const getExampleAd = (index) => {
  const locations = {
    x: Math.round(getRandomNumber(MIN_X, MAX_X)),
    y: Math.round(getRandomNumber(MIN_Y, MAX_Y))
  };

  const declarationExample = {
    author: {
      avatar: `img/avatars/user0${index}.png`
    },
    offer: {
      title: `Заголовок предложения ${index}`,
      address: `${locations.x}, ${locations.y}`,
      price: Math.round(getRandomNumber(0, MAX_PRICE)),
      type: TYPES_OF_HOUSING[Math.round(getRandomNumber(0, TYPES_OF_HOUSING.length - 1))],
      rooms: Math.round(getRandomNumber(MIN_ROOM, MAX_ROOM)),
      guests: Math.round(getRandomNumber(MIN_GUEST, MAX_GUEST)),
      checkin: `${CHECKIN_CHECKOUT_TIMES[Math.round(getRandomNumber(0, CHECKIN_CHECKOUT_TIMES.length - 1))]}`,
      checkout: `${CHECKIN_CHECKOUT_TIMES[Math.round(getRandomNumber(0, CHECKIN_CHECKOUT_TIMES.length - 1))]}`,
      features: TYPES.slice(Math.round(getRandomNumber(0, TYPES.length - 1))),
      description: `Описание ${index}`,
      photos: PHOTOS.slice(Math.round(getRandomNumber(0, PHOTOS.length - 1)))
    },
    location: {
      x: locations.x,
      y: locations.y
    }
  };
  return declarationExample;
};

const getArraysRandomAds = () => {
  const temporaryArrays = [];
  for (let i = 1; i <= LENGTHS; i++) {
    temporaryArrays.push(getExampleAd(i));
  }
  return temporaryArrays;
};

const declarations = getArraysRandomAds();

// создание DOM элемента на основе JS-объекта
const pinContent = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const getElementWithSimpleLabel = (declaration) => {
  const pinContentClone = pinContent.cloneNode(true);
  const pinImg = pinContentClone.querySelector(`img`);
  pinContentClone.style.left = `${declaration.location.x - PIN_WIDTH / 2}px`;
  pinContentClone.style.top = `${declaration.location.y - PIN_HEIGHT}px`;
  pinImg.src = declaration.author.avatar;
  pinImg.alt = declaration.offer.title;
  return pinContentClone;
};

// функция заполнения блока DOM-элементами на основе массива JS-объектов
const mapPins = map.querySelector(`.map__pins`);
const createMapPins = () => {
  const fragment = document.createDocumentFragment();
  declarations.forEach((item) => {
    fragment.appendChild(getElementWithSimpleLabel(item));
  });
  mapPins.appendChild(fragment);
};
