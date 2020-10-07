'use strict';

// модуль отрисовки меток на карте
(() => {
  const LENGTHS = 8;
  const SPACES = [`palace`, `flat`, `house`, `bungalow`];
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
  const mapPins = window.main.map.querySelector(`.map__pins`);
  const pinContent = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  // функция создания одного объекта объявления
  const getExampleAd = (index) => {
    const locations = {
      x: Math.round(window.main.getRandomNumber(MIN_X, MAX_X)),
      y: Math.round(window.main.getRandomNumber(MIN_Y, MAX_Y))
    };

    const declarationExample = {
      author: {
        avatar: `img/avatars/user0${index}.png`
      },
      offer: {
        title: `Заголовок предложения ${index}`,
        address: `${locations.x}, ${locations.y}`,
        price: Math.round(window.main.getRandomNumber(0, MAX_PRICE)),
        type: SPACES[Math.round(window.main.getRandomNumber(0, SPACES.length - 1))],
        rooms: Math.round(window.main.getRandomNumber(MIN_ROOM, MAX_ROOM)),
        guests: Math.round(window.main.getRandomNumber(MIN_GUEST, MAX_GUEST)),
        checkin: `${CHECKIN_CHECKOUT_TIMES[Math.round(window.main.getRandomNumber(0, CHECKIN_CHECKOUT_TIMES.length - 1))]}`,
        checkout: `${CHECKIN_CHECKOUT_TIMES[Math.round(window.main.getRandomNumber(0, CHECKIN_CHECKOUT_TIMES.length - 1))]}`,
        features: TYPES.slice(Math.round(window.main.getRandomNumber(0, TYPES.length - 1))),
        description: `Описание ${index}`,
        photos: PHOTOS.slice(Math.round(window.main.getRandomNumber(0, PHOTOS.length - 1)))
      },
      location: {
        x: locations.x,
        y: locations.y
      }
    };
    return declarationExample;
  };

  // ф-я создания массива из 8 сгенерированнх JS объектов
  const getArraysRandomAds = () => {
    const temporaryArrays = [];
    for (let i = 1; i <= LENGTHS; i++) {
      temporaryArrays.push(getExampleAd(i));
    }
    return temporaryArrays;
  };

  const declarations = getArraysRandomAds();

  // создание DOM элемента на основе JS-объекта
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
  const createMapPins = () => {
    const fragment = document.createDocumentFragment();
    declarations.forEach((item) => {
      fragment.appendChild(getElementWithSimpleLabel(item));
    });
    mapPins.appendChild(fragment);
  };

  window.map = {
    createMapPins: createMapPins,
  };
})();
