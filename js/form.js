'use strict';

(function () {
  var MAIN_PIN_X = 570;
  var MAIN_PIN_Y = 375;
  var MAIN_PIN_HEIGHT_AND_WIDTH = 65;
  var SPIRE_HEIGHT = 22;
  var addressInput = document.querySelector('#address');
  var form = document.querySelector('.ad-form');
  var formFieldsets = form.querySelectorAll('fieldset');
  var downloadedOffers = null;

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

  function handleChangeFilterForm() {
    var filteredOffers = window.filter.returnFiltered(downloadedOffers);
    window.pins.removePins();
    window.pins.renderPin(filteredOffers);
  }

  function disableForm() {
    formFieldsets.forEach(function (formFieldset) {
      formFieldset.setAttribute('disabled', 'disabled');
    });
  }

  function enableForm() {
    formFieldsets.forEach(function (formFieldset) {
      formFieldset.removeAttribute('disabled');
    });
  }

  function onSuccessLoad(offers) {
    window.filter.enable(handleChangeFilterForm);
    downloadedOffers = offers;
    var filteredOffers = window.filter.returnFiltered(downloadedOffers);
    window.pins.renderPin(filteredOffers);
  }

  function activateForm() {
    window.load(onSuccessLoad);
    enableForm();
    window.card.pinDrugNDrop();
    window.formValidation.roomsToGuestsValidation();
    window.formValidation.housingTypeToMinPriceValidation();
    window.formValidation.getTimeSync();
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
