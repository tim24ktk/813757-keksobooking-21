'use strict';

//  функция создания массива из 8 сгенериванных JS объектов
const ARRAYS_LENGTH = 8;
const TYPES_OF_HOUSING = [`palace`, `flat`, `parking`, `house`, `elevator`, `bungalow`];
const CHECKIN_CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
const TYPES_OF_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MAX_X = 1200;
const MIN_Y = 130;
const MAX_Y = 630;
const MAX_PRICE = 1000000;
const MIN_ROOM = 1;
const MAX_ROOM = 4;
const MIN_GUEST = 1;
const MAX_GUEST = 10;

// функция получения случайного числа
const getRandomNumber = function (min, max) {
  return Math.random() * (max - min) + min;
};

const getRandomGeneration = function () {
  const temporaryArrays = [];
  for (let i = 1; i <= ARRAYS_LENGTH; i++) {
    const locations = {
      x: getRandomNumber(0, MAX_X),
      y: getRandomNumber(MIN_Y, MAX_Y)
    };

    const declarationExample = {
      author: {
        avatar: `img/avatars/user0` + i + `.png`
      },
      offer: {
        title: `Заголовок предложения ` + i,
        address: `` + locations.x + `, ` + locations.y + ``,
        price: getRandomNumber(0, MAX_PRICE),
        type: TYPES_OF_HOUSING[Math.round(getRandomNumber(0, TYPES_OF_HOUSING.length - 1))],
        rooms: Math.round(getRandomNumber(MIN_ROOM, MAX_ROOM)),
        guests: Math.round(getRandomNumber(MIN_GUEST, MAX_GUEST)),
        checkin: `` + CHECKIN_CHECKOUT_TIMES[Math.round(getRandomNumber(0, CHECKIN_CHECKOUT_TIMES.length - 1))] + ``,
        checkout: `` + CHECKIN_CHECKOUT_TIMES[Math.round(getRandomNumber(0, CHECKIN_CHECKOUT_TIMES.length - 1))] + ``,
        features: TYPES_OF_FEATURES.slice(getRandomNumber(0, TYPES_OF_FEATURES.length - 1)),
        description: `Описание ` + i,
        photos: PHOTOS.slice(getRandomNumber(0, PHOTOS.length - 1))
      },
      location: {
        x: getRandomNumber(0, MAX_X),
        y: getRandomNumber(MIN_Y, MAX_Y)
      }
    };
    temporaryArrays.push(declarationExample);
  }
  return temporaryArrays;
};
const declarations = getRandomGeneration();

//  убирает класс у map
const map = document.querySelector('.map');
map.classList.remove('map--faded');


//  создание DOM элемента на основе JS-объекта
const PIN_OFFSET_X = 25;
const PIN_OFFSET_Y = 70;

const createElementWithSimpleLabel = function (declaration) {
  const pinContent = document.querySelector('#pin').content.querySelector('.map__pin');
  const pinContentClone = pinContent.cloneNode(true);
  const pinImg = pinContentClone.querySelector('img');
  pinContentClone.style.left = declaration.location.x + PIN_OFFSET_X + 'px';
  pinContentClone.style.top = declaration.location.y + PIN_OFFSET_Y + 'px';
  pinImg.src = declaration.author.avatar;
  pinImg.alt = declaration.offer.title;
  return pinContentClone;
};


// функция заполнения блока DOM-элементами на основе массива JS-объектов
const createMapPins = function () {
  const mapPins = map.querySelector('.map__pins');
  const fragment = document.createDocumentFragment();
  declarations.forEach(function fillingBlockWithElements(item) {
    fragment.appendChild(createElementWithSimpleLabel(item));
  });
  mapPins.appendChild(fragment);
};
createMapPins(getRandomGeneration());
