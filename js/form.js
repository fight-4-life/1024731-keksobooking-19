'use strict';

(function () {
  var MAIN_PIN_X = 570;
  var MAIN_PIN_Y = 375;
  var MAIN_PIN_HEIGHT_AND_WIDTH = 65;
  var SPIRE_HEIGHT = 22;
  var addressInput = document.querySelector('#address');
  var form = document.querySelector('.ad-form');
  var formFieldsets = form.querySelectorAll('fieldset');

  var currentOffer = {
    author: {
      avatar: null,
    },
    offer: {
      title: null,
      address: null,
      price: null,
      type: null,
      rooms: null,
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

  var newOffers = window.data.getObjectsArray();

  function activateForm() {
    window.pins.renderPin(newOffers);
    enableForm();
    window.formValidation.roomsToGuestsValidation();
    form.classList.remove('ad-form--disabled');
    document.querySelector('.map').classList.remove('map--faded');
    currentOffer.location.y = MAIN_PIN_Y + MAIN_PIN_HEIGHT_AND_WIDTH + SPIRE_HEIGHT;
    updateCurrentOfferLocation(currentOffer.location);
    document.querySelector('#room_number').addEventListener('change', function () {
      currentOffer.rooms = document.querySelector('#room_number').value;
      window.formValidation.roomsToGuestsValidation();
    });
    document.querySelector('#capacity').addEventListener('change', function () {
      currentOffer.guests = document.querySelector('#capacity').value;
    });
  }

  function updateCurrentOfferLocation(location) {
    addressInput.value = location.x + ', ' + location.y;
  }

  window.form = {
    disableForm: disableForm,
    activateForm: activateForm,
    updateCurrentOfferLocation: updateCurrentOfferLocation,
    currentOffer: currentOffer
  };
})();
