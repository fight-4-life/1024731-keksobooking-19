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
var MAX_ROOMS = 4;
var MAX_GUESTS = 5;
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var X_MIN = 0;
var xMax = document.body.clientWidth;
var Y_MIN = 130;
var Y_MAX = 630;
var DESCRIPTION = 'Типичное описание типичного объявления типичного вида';
var LEFT_BUTTON_MOUSE = 0;
var MAIN_PIN_X = 570;
var MAIN_PIN_Y = 375;
var MAIN_PIN_HEIGHT_AND_WIDTH = 65;
var SPIRE_HEIGHT = 22;

var addressInput = document.querySelector('#address');

var currentOffer = {
  author: {
    avatar: null,
  },
  offer: {
    title: null,
    address: null,
    price: null,
    type: null,
    rooms: null, // document.querySelector('#room_number').value,
    guests: null,
    checkin: null,
    checkout: null,
    features: null,
    description: null,
    photos: null,
  },
  location: {
    x: MAIN_PIN_X + MAIN_PIN_HEIGHT_AND_WIDTH / 2,
    y: MAIN_PIN_Y + MAIN_PIN_HEIGHT_AND_WIDTH / 2
  }
};

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArray(arr) {
  var newArray = [];
  var newArrayLength = getRandomNumber(1, arr.length + 1);
  for (var i = 0; i < newArrayLength; i++) {
    newArray.push(arr[i]);
  }
  return newArray;
}

function getRandomObject(objectIndex) {
  var locationX = getRandomNumber(X_MIN, xMax);
  var locationY = getRandomNumber(Y_MIN, Y_MAX);
  return {
    author: {
      avatar: 'img/avatars/user0' + (objectIndex + 1) + '.png'
    },
    offer: {
      title: TITLES[objectIndex],
      address: locationX + ', ' + locationY,
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: TYPES[getRandomNumber(0, TYPES.length)],
      rooms: getRandomNumber(0, MAX_ROOMS),
      guests: getRandomNumber(0, MAX_GUESTS),
      checkin: TIMES[getRandomNumber(0, TIMES.length)],
      checkout: TIMES[getRandomNumber(0, TIMES.length)],
      features: getRandomArray(FEATURES),
      description: DESCRIPTION,
      photos: getRandomArray(PHOTOS)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
}

function getObjectsArray() {
  var offers = [];
  for (var i = 0; i < ADS_QUANTITY; i++) {
    offers.push(getRandomObject(i));
  }
  return offers;
}

function renderPin(offers) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinListElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);
    var offer = offers[i];
    pinElement.style.left = (offer.location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (offer.location.y - PIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = offer.author.avatar;
    pinElement.querySelector('img').alt = offer.offer.title;

    fragment.appendChild(pinElement);
  }
  pinListElement.appendChild(fragment);
}

var form = document.querySelector('.ad-form');
var formFieldsets = form.querySelectorAll('fieldset');

function disableForm() {
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].setAttribute('disabled', '');
  }
}

function enableForm() {
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].removeAttribute('disabled');
  }
}

var newOffers = getObjectsArray();

var adForm = document.querySelector('.ad-form');
var capacitySelect = adForm.querySelector('select[name=capacity]');
var roomsSelect = adForm.querySelector('select[name=rooms');

function roomsToGuestsValidation() {
  var roomsValue = Number(roomsSelect.value);
  var guestsValue = Number(capacitySelect.value);

  if (guestsValue === 0 && roomsValue !== 100) {
    capacitySelect.setCustomValidity('Только 100 комнат!');
  } else if (guestsValue !== 0 && roomsValue === 100) {
    capacitySelect.setCustomValidity('Не для гостей!');
  } else if (roomsValue < guestsValue) {
    capacitySelect.setCustomValidity('Слишком много гостей!');
  } else {
    capacitySelect.setCustomValidity('');
  }
}

function activateForm() {
  renderPin(newOffers);
  enableForm();
  form.classList.remove('ad-form--disabled');
  document.querySelector('.map').classList.remove('map--faded');
  currentOffer.location.y = MAIN_PIN_Y + MAIN_PIN_HEIGHT_AND_WIDTH + SPIRE_HEIGHT;
  updateCurrentOfferLocation(currentOffer.location);
  document.querySelector('#room_number').addEventListener('change', function () {
    currentOffer.rooms = document.querySelector('#room_number').value;
    roomsToGuestsValidation();
  });
  document.querySelector('#capacity').addEventListener('change', function () {
    currentOffer.guests = document.querySelector('#capacity').value;
  });
}

function updateCurrentOfferLocation(location) {
  addressInput.value = location.x + ', ' + location.y;
}

function init() {
  disableForm();
  updateCurrentOfferLocation(currentOffer.location);
  var mapPinMain = document.querySelector('.map__pin--main');
  mapPinMain.addEventListener('click', function activateEventHandler(evt) {
    if (evt.button === LEFT_BUTTON_MOUSE) {
      activateForm();
      mapPinMain.removeEventListener('click', activateEventHandler);
    }
  }
  );
}

init();
