'use strict';

var ADS_QUANTITY = 8;
var TITLES = [
  'Замечательная квартира',
  'Лучшее предложение',
  'Успевайте бронировать',
  'Номер 1 в городе',
  'Бесплатные завтраки',
  'У Андрея :D',
  'Якудза',
  'Отель ХАРАКИРИ'];
var MIN_PRICE = 1500;
var MAX_PRICE = 10000;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 4];
var GUESTS = [1, 2, 3, 4, 5];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var X_MIN = 0;
var X_MAX = document.body.clientWidth;
var Y_MIN = 130;
var Y_MAX = 630;
var DESCRIPTION = 'Типичное описание типичного объявления типичного вида';

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArray(arr) {
  var newArray = [];
  var newArrayLength = getRandomNumber(1, arr.length - 1);
  for (var i = 0; i < newArrayLength; i++) {
    newArray.push(arr[i]);
  }
  return newArray[getRandomNumber(0, newArray.length)];
}

var getRandomObject = function (objectNumber) {
  return {
    author: {
      avatar: 'img/avatars/user0' + (objectNumber + 1) + '.png'
    },
    offer: {
      title: TITLES[objectNumber],
      address: '600, 350',
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: TYPES[getRandomNumber(0, TYPES.length)],
      rooms: ROOMS[getRandomNumber(0, ROOMS.length)],
      guests: GUESTS[getRandomNumber(0, GUESTS.length)],
      checkin: TIMES[getRandomNumber(0, TIMES.length)],
      checkout: TIMES[getRandomNumber(0, TIMES.length)],
      features: getRandomArray(FEATURES),
      description: DESCRIPTION,
      photos: getRandomArray(PHOTOS)
    },
    location: {
      x: getRandomNumber(X_MIN + PIN_WIDTH, X_MAX - PIN_WIDTH),
      y: getRandomNumber(Y_MIN + PIN_HEIGHT, Y_MAX - PIN_HEIGHT)
    }
  };
};

var getObjectsArray = function () {
  var offers = [];
  for (var i = 0; i < ADS_QUANTITY; i++) {
    offers.push(getRandomObject(i));
  }
  return offers;
};

var newOffer = getObjectsArray(ADS_QUANTITY);

document.querySelector('.map').classList.remove('map--faded');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinListElement = document.querySelector('.map__pins');

var renderPin = function (offers) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = offers[i].location.x + 'px';
    pinElement.style.top = offers[i].location.y + 'px';
    pinElement.querySelector('img').src = offers[i].author.avatar;
    pinElement.querySelector('img').alt = offers[i].offer.title;

    fragment.appendChild(pinElement);
  }
  pinListElement.appendChild(fragment);
};

renderPin(newOffer);
