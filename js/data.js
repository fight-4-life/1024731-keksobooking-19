'use strict';

(function () {
  var ADS_QUANTITY = 8;
  var MIN_PRICE = 1500;
  var MAX_PRICE = 10000;
  var MAX_ROOMS = 4;
  var MAX_GUESTS = 5;
  var X_MIN = 0;
  var xMax = document.body.clientWidth;
  var Y_MIN = 130;
  var Y_MAX = 630;
  var DESCRIPTION = 'Типичное описание типичного объявления типичного вида';
  var TITLES = [
    'Замечательная квартира',
    'Лучшее предложение',
    'Успевайте бронировать',
    'Номер 1 в городе',
    'Бесплатные завтраки',
    'У Андрея :D',
    'Якудза',
    'Отель ХАРАКИРИ'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  function getRandomObject(objectIndex) {
    var locationX = window.utils.getRandomNumber(X_MIN, xMax);
    var locationY = window.utils.getRandomNumber(Y_MIN, Y_MAX);
    return {
      author: {
        avatar: 'img/avatars/user0' + (objectIndex + 1) + '.png'
      },
      offer: {
        title: TITLES[objectIndex],
        address: locationX + ', ' + locationY,
        price: window.utils.getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: TYPES[window.utils.getRandomNumber(0, TYPES.length)],
        rooms: window.utils.getRandomNumber(0, MAX_ROOMS),
        guests: window.utils.getRandomNumber(0, MAX_GUESTS),
        checkin: TIMES[window.utils.getRandomNumber(0, TIMES.length)],
        checkout: TIMES[window.utils.getRandomNumber(0, TIMES.length)],
        features: window.utils.getRandomArray(FEATURES),
        description: DESCRIPTION,
        photos: window.utils.getRandomArray(PHOTOS)
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

  window.data = {
    getRandomObject: getRandomObject,
    getObjectsArray: getObjectsArray
  };
})();
