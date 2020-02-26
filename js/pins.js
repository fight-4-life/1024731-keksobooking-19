'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  function renderPins(offers) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinListElement = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    offers.forEach(function (offer) {
      var pinElement = pinTemplate.cloneNode(true);

      pinElement.style.left = (offer.location.x - PIN_WIDTH / 2) + 'px';
      pinElement.style.top = (offer.location.y - PIN_HEIGHT) + 'px';
      pinElement.querySelector('img').src = offer.author.avatar;
      pinElement.querySelector('img').alt = offer.offer.title;

      fragment.appendChild(pinElement);

      pinElement.addEventListener('click', function () {
        window.card.renderCards(offer);
      });
    });
    pinListElement.appendChild(fragment);
  }

  function removePins() {
    var mapPinsItems = document.querySelectorAll('.map__pin[type="button"]');
    mapPinsItems.forEach(function (element) {
      element.remove();
    });
  }

  window.pins = {
    renderPins: renderPins,
    removePins: removePins
  };
})();
