'use strict';

var ADS_QUANTITY = 8;
var avatars = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'];
var titles = [
  'Замечательная квартира',
  'Лучшее предложение',
  'Успевайте бронировать',
  'Номер 1 в городе',
  'Бесплатные завтраки',
  'У Андрея :D',
  'Якудза',
  'Отель ХАРАКИРИ'];
var MIN_PRICE = 10000;
var MAX_PRICE = 1500;
var types = ['palace', 'flat', 'house', 'bungalo'];
var rooms = [1, 2, 3, 4];
var guests = [1, 2, 3, 4, 5];
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = [
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

function getRandomItem(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArray(arr) {
  var newArray = [];
  var newArrayLength = getRandomItem(1, arr.length);
  for (var i = 0; i < newArrayLength; i++) {
    newArray.push(arr[i]);
  }
  return newArray;
}

var getRandomObject = function () {
  return {
    author: {
      avatar: avatars[getRandomItem(0, avatars.length)]
    },
    offer: {
      title: titles[getRandomItem(0, titles.length)],
      address: '600, 350',
      price: getRandomItem(MIN_PRICE, MAX_PRICE),
      type: types[getRandomItem(0, types.length)],
      rooms: rooms[getRandomItem(0, rooms.length)],
      guests: guests[getRandomItem(0, guests.length)],
      checkin: times[getRandomItem(0, times.length)],
      checkout: times[getRandomItem(0, times.length)],
      features: getRandomArray(features),
      description: DESCRIPTION,
      photos: getRandomArray(photos)
    },
    location: {
      x: getRandomItem(X_MIN + PIN_WIDTH, X_MAX - PIN_WIDTH),
      y: getRandomItem(Y_MIN + PIN_HEIGHT, Y_MAX - PIN_HEIGHT)
    }
  };
};

var getObjectsArray = function () {
  var offers = [];
  for (var i = 0; i < ADS_QUANTITY; i++) {
    offers.push(getRandomObject());
  }
  return offers;
};

getObjectsArray(ADS_QUANTITY);

document.querySelector('.map').classList.remove('map--faded');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinListElement = document.querySelector('.map__pins');

var renderPin = function (offers) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < getObjectsArray.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = offers[i].location.x + 'px';
    pinElement.style.top = offers[i].location.y + 'px';
    pinElement.querySelector('img').src = offers[i].author.avatar;
    pinElement.querySelector('img').alt = offers[i].offer.title;

    fragment.appendChild(pinElement);
  }
  pinListElement.appendChild(fragment);
};

renderPin(getObjectsArray);
