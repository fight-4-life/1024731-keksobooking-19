'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

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

  function removePins() {
    var mapPinsItems = document.querySelectorAll('.map__pin[type="button"]');
    mapPinsItems.forEach(function (element) {
      element.remove();
    });
  }

  window.pins = {
    renderPin: renderPin,
    removePins: removePins
  };
})();
