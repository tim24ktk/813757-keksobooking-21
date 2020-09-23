'use strict';

//  функция создания массива из 8 сгенериванных JS объектов
const getRandomGeneration = function () {
  const temporaryArray = [];
  const declarationExample = {
    author: {
      avatar: `img/avatars/user{{xx}}.png`
    },
    offer: {
      title: `title`,
      address: `address`,
      price: `price`,
      type: `type`,
      rooms: `number`,
      guests: `guest`,
      checkin: `checkin`,
      checkout: `checkout`,
      features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
      description: `description`,
      photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`]
    },
    location: {
      x: `100`,
      y: `100`
    }
  };
  for (let i = 0; i < 8; i++) {
    temporaryArray.push(declarationExample);
  }
  return temporaryArray;
};
const declarations = getRandomGeneration();

//  убирает класс у map
const map = document.querySelector('.map');
map.classList.remove('map--faded');


//  создание DOM элемента на основе JS-объекта
const createElement = function (declaration) {
  const pin = document.querySelector('#pin').content;
  const pinContent = pin.querySelector('.map__pin');
  const pinContentClone = pinContent.cloneNode(true);
  const pinImg = pinContentClone.querySelector('img');
  pinContentClone.style.left = declaration.location.x + 'px';
  pinContentClone.style.top = declaration.location.y + 'px';
  pinImg.src = declaration.author.avatar;
  pinImg.alt = declaration.offer.title;
  return pinContentClone;
};


// функция заполнения блока DOM-элементами на основе массива JS-объектов
const fragment = document.createDocumentFragment();
for (let i = 0; i < declarations.length; i++) {
  fragment.appendChild(createElement(declarations[i]));
}
map.appendChild(fragment);
