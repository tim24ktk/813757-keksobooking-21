'use strict';

const LENGTHS = 8;
const TYPES_OF_HOUSING = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN_CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
const TYPES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MIN_X = 0; // мин x-координата точки с меткой
const MAX_X = 1200; // мах x-координата точки с меткой
const MIN_Y = 130; // мин у-координата точки с меткой
const MAX_Y = 630; // макс y-координата точки с меткой
const MAX_PRICE = 1000000;
const MIN_ROOM = 1;
const MAX_ROOM = 4;
const MIN_GUEST = 1;
const MAX_GUEST = 10;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

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
        address: `${locations.x}, ${locations.y}`, // адрес на который указывает острый конец пина
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
      location: { // расположение пина
        x: locations.x - PIN_WIDTH / 2,
        y: locations.y - PIN_HEIGHT
      }
    };
    temporaryArrays.push(declarationExample);
  }
  return temporaryArrays;
};
const declarations = getRandomGeneration();

//  убирает класс у map
const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);


//  создание DOM элемента на основе JS-объекта
const pinContent = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const createElementWithSimpleLabel = (declaration) => {
  const pinContentClone = pinContent.cloneNode(true);
  const pinImg = pinContentClone.querySelector(`img`);
  pinContentClone.style.left = `${declaration.location.x}px`;
  pinContentClone.style.top = `${declaration.location.y}px`;
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
createMapPins(getRandomGeneration());
