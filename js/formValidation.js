'use strict';

(function () {

  var HousingTypes = {
    BUNGALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace'
  };

  var adForm = document.querySelector('.ad-form');
  var capacitySelect = adForm.querySelector('#capacity');
  var roomsSelect = adForm.querySelector('#room_number');

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

  var typeSelect = adForm.querySelector('#type');
  var pricePerNight = adForm.querySelector('#price');

  function housngTypeToMinPriceValidation() {
    var type = typeSelect.value;
    if (type === HousingTypes.BUNGALO) {
      pricePerNight.setAttribute('min', '0');
      pricePerNight.setAttribute('placeholder', '0');
    } else if (type === HousingTypes.FLAT) {
      pricePerNight.setAttribute('min', '1000');
      pricePerNight.setAttribute('placeholder', '1000');
    } else if (type === HousingTypes.HOUSE) {
      pricePerNight.setAttribute('min', '5000');
      pricePerNight.setAttribute('placeholder', '5000');
    } else if (type === HousingTypes.PALACE) {
      pricePerNight.setAttribute('min', '10000');
      pricePerNight.setAttribute('placeholder', '10000');
    }

    typeSelect.addEventListener('change', housngTypeToMinPriceValidation);
  }

  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');

  function getTimeSync() {
    var timeInOptions = timeInSelect.querySelectorAll('option');
    var timeOutOptions = timeOutSelect.querySelectorAll('option');

    function onChangeTimeIn() {
      timeInOptions.forEach(function (item, index) {
        if (item.selected) {
          timeOutOptions[index].selected = true;
        }
      });
    }
    function onChangeTimeOut() {
      timeOutOptions.forEach(function (item, index) {
        if (item.selected) {
          timeInOptions[index].selected = true;
        }
      });
    }
    timeInSelect.addEventListener('change', onChangeTimeIn);
    timeOutSelect.addEventListener('change', onChangeTimeOut);
  }

  window.formValidation = {
    roomsToGuestsValidation: roomsToGuestsValidation,
    housngTypeToMinPriceValidation: housngTypeToMinPriceValidation,
    getTimeSync: getTimeSync
  };
})();
