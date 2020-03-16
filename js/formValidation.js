'use strict';

(function () {

  var advertisingForm = window.form.advertisingForm;
  var capacitySelect = advertisingForm.querySelector('#capacity');
  var roomsSelect = advertisingForm.querySelector('#room_number');

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

  function housingTypeToMinPriceValidation() {
    var typeSelect = advertisingForm.querySelector('#type');
    var pricePerNight = advertisingForm.querySelector('#price');
    var type = typeSelect.value;

    switch (type) {
      case HousingType.BUNGALO:
        pricePerNight.setAttribute('min', HousingPrice.BUNGALO);
        pricePerNight.setAttribute('placeholder', HousingPrice.BUNGALO);
        break;
      case HousingType.FLAT:
        pricePerNight.setAttribute('min', HousingPrice.FLAT);
        pricePerNight.setAttribute('placeholder', HousingPrice.FLAT);
        break;
      case HousingType.HOUSE:
        pricePerNight.setAttribute('min', HousingPrice.HOUSE);
        pricePerNight.setAttribute('placeholder', HousingPrice.HOUSE);
        break;
      case HousingType.PALACE:
        pricePerNight.setAttribute('min', HousingPrice.PALACE);
        pricePerNight.setAttribute('placeholder', HousingPrice.PALACE);
        break;
    }
    typeSelect.addEventListener('change', housingTypeToMinPriceValidation);
  }

  function getTimeSync() {
    var timeInSelect = advertisingForm.querySelector('#timein');
    var timeOutSelect = advertisingForm.querySelector('#timeout');
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
    housingTypeToMinPriceValidation: housingTypeToMinPriceValidation,
    getTimeSync: getTimeSync
  };
})();
