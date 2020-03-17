'use strict';

(function () {

  var advertisingForm = window.form.advertisingForm;
  var capacitySelectElement = advertisingForm.querySelector('#capacity');
  var roomsSelectElement = advertisingForm.querySelector('#room_number');

  var NOT_FOR_GUESTS_VALUE = 0;
  var MAX_ROOMS_VALUE = 100;

  var HousingType = {
    BUNGALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace'
  };

  var HousingPrice = {
    BUNGALO: '0',
    FLAT: '1000',
    HOUSE: '5000',
    PALACE: '10000'
  };

  var ValidationMessage = {
    ONLY_100_ROOMS: 'Только 100 комнат!',
    NOT_FOR_GUESTS: 'Не для гостей!',
    TOO_MUCH_GUESTS: 'Слишком много гостей!',
    EMPTY_MESSAGE: ''
  };

  function roomsToGuestsValidation() {
    var roomsValue = Number(roomsSelectElement.value);
    var guestsValue = Number(capacitySelectElement.value);

    if (guestsValue === NOT_FOR_GUESTS_VALUE && roomsValue !== MAX_ROOMS_VALUE) {
      capacitySelectElement.setCustomValidity(ValidationMessage.ONLY_100_ROOMS);
    } else if (guestsValue !== NOT_FOR_GUESTS_VALUE && roomsValue === MAX_ROOMS_VALUE) {
      capacitySelectElement.setCustomValidity(ValidationMessage.NOT_FOR_GUESTS);
    } else if (roomsValue < guestsValue) {
      capacitySelectElement.setCustomValidity(ValidationMessage.TOO_MUCH_GUESTS);
    } else {
      capacitySelectElement.setCustomValidity(ValidationMessage.EMPTY_MESSAGE);
    }
  }

  function housingTypeToMinPriceValidation() {
    var typeSelectElement = advertisingForm.querySelector('#type');
    var pricePerNightElement = advertisingForm.querySelector('#price');
    var type = typeSelectElement.value;

    switch (type) {
      case HousingType.BUNGALO:
        pricePerNightElement.setAttribute('min', HousingPrice.BUNGALO);
        pricePerNightElement.setAttribute('placeholder', HousingPrice.BUNGALO);
        break;
      case HousingType.FLAT:
        pricePerNightElement.setAttribute('min', HousingPrice.FLAT);
        pricePerNightElement.setAttribute('placeholder', HousingPrice.FLAT);
        break;
      case HousingType.HOUSE:
        pricePerNightElement.setAttribute('min', HousingPrice.HOUSE);
        pricePerNightElement.setAttribute('placeholder', HousingPrice.HOUSE);
        break;
      case HousingType.PALACE:
        pricePerNightElement.setAttribute('min', HousingPrice.PALACE);
        pricePerNightElement.setAttribute('placeholder', HousingPrice.PALACE);
        break;
    }
    typeSelectElement.addEventListener('change', housingTypeToMinPriceValidation);
  }

  function getTimeSync() {
    var timeInSelectElement = advertisingForm.querySelector('#timein');
    var timeOutSelectElement = advertisingForm.querySelector('#timeout');
    var timeInOptionsElement = timeInSelectElement.querySelectorAll('option');
    var timeOutOptionsElement = timeOutSelectElement.querySelectorAll('option');

    function onChangeTimeIn() {
      timeInOptionsElement.forEach(function (item, index) {
        if (item.selected) {
          timeOutOptionsElement[index].selected = true;
        }
      });
    }
    function onChangeTimeOut() {
      timeOutOptionsElement.forEach(function (item, index) {
        if (item.selected) {
          timeInOptionsElement[index].selected = true;
        }
      });
    }
    timeInSelectElement.addEventListener('change', onChangeTimeIn);
    timeOutSelectElement.addEventListener('change', onChangeTimeOut);
  }

  window.formValidation = {
    roomsToGuestsValidation: roomsToGuestsValidation,
    housingTypeToMinPriceValidation: housingTypeToMinPriceValidation,
    getTimeSync: getTimeSync
  };
})();
