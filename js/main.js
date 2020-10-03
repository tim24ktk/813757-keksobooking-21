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
  createMapPins(getRandomGeneration());
  renderAddress();
};

// активация страницы c помощью Enter
const onPinMainEnterPress = (evt) => {
  if (evt.key === ENTER) {
    activatePage();
    mapPinMain.removeEventListener(`mousedown`, onPinMousePress);
    mapPinMain.removeEventListener(`keydown`, onPinMainEnterPress);
  }
};

mapPinMain.addEventListener(`keydown`, onPinMainEnterPress);

// активация страницы с помощью мыши
const onPinMousePress = (evt) => {
  if (evt.button === MOUSE_EVENT_INDEX) {
    activatePage();
    mapPinMain.removeEventListener(`keydown`, onPinMainEnterPress);
    mapPinMain.removeEventListener(`mousedown`, onPinMousePress);
  }
};

mapPinMain.addEventListener(`mousedown`, onPinMousePress);

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
  } else {
    price.placeholder = `10 000`;
    price.min = `10000`;
  }
};
type.addEventListener(`change`, onTypeChange);

// ф-я проверки количества соответствия количества гостей и комнат
const roomNumber = adForm.querySelector(`#room_number`);
const capacity = adForm.querySelector(`#capacity`);

const onCapacityChange = () => {
  if ((+capacity.value <= +roomNumber.value && +roomNumber.value !== 100 && +capacity.value !== 0) || (+roomNumber.value === 100 && +capacity.value === 0)) {
    roomNumber.style.borderColor = ``;
    capacity.style.borderColor = ``;
  } else {
    roomNumber.style.borderColor = `red`;
    capacity.style.borderColor = `red`;
  }
};

capacity.addEventListener(`change`, onCapacityChange);

const getSelectValue = () => {
  if ((+capacity.value <= +roomNumber.value && +roomNumber.value !== 100 && +capacity.value !== 0) || (+roomNumber.value === 100 && +capacity.value === 0)) {
    return true;
  }
  return false;
};

// ф-я валидации и отправки формы
adForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  if (getSelectValue()) {
    adForm.submit();
  }
});

// функция получения случайного числа
const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

// функция создания массива из 8 сгенериванных JS объектов
const getRandomGeneration = () => {
  const temporaryArrays = [];
  for (let i = 1; i <= LENGTHS; i++) {
    const locations = {
      x: Math.round(getRandomNumber(MIN_X, MAX_X)),
      y: Math.round(getRandomNumber(MIN_Y, MAX_Y))
    };

    const declarationExample = {
      author: {
        avatar: `img/avatars/user0${i}.png`
      },
      offer: {
        title: `Заголовок предложения ${i}`,
        address: `${locations.x}, ${locations.y}`,
        price: Math.round(getRandomNumber(0, MAX_PRICE)),
        type: TYPES_OF_HOUSING[Math.round(getRandomNumber(0, TYPES_OF_HOUSING.length - 1))],
        rooms: Math.round(getRandomNumber(MIN_ROOM, MAX_ROOM)),
        guests: Math.round(getRandomNumber(MIN_GUEST, MAX_GUEST)),
        checkin: `${CHECKIN_CHECKOUT_TIMES[Math.round(getRandomNumber(0, CHECKIN_CHECKOUT_TIMES.length - 1))]}`,
        checkout: `${CHECKIN_CHECKOUT_TIMES[Math.round(getRandomNumber(0, CHECKIN_CHECKOUT_TIMES.length - 1))]}`,
        features: TYPES.slice(Math.round(getRandomNumber(0, TYPES.length - 1))),
        description: `Описание ${i}`,
        photos: PHOTOS.slice(Math.round(getRandomNumber(0, PHOTOS.length - 1)))
      },
      location: {
        x: locations.x,
        y: locations.y
      }
    };
    temporaryArrays.push(declarationExample);
  }
  return temporaryArrays;
};
const declarations = getRandomGeneration();

//  создание DOM элемента на основе JS-объекта
const pinContent = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const createElementWithSimpleLabel = (declaration) => {
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
    fragment.appendChild(createElementWithSimpleLabel(item));
  });
  mapPins.appendChild(fragment);
};
