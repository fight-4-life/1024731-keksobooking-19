'use strict';

(function () {
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

  window.formValidation = {
    roomsToGuestsValidation: roomsToGuestsValidation
  };
})();
