'use strict';

(function () {
  var LEFT_BUTTON_MOUSE = 0;

  window.form.disableForm();
  window.form.updateCurrentOfferLocation((window.form.currentOffer).location);
  var mapPinMain = document.querySelector('.map__pin--main');
  mapPinMain.addEventListener('click', function activateEventHandler(evt) {
    if (evt.button === LEFT_BUTTON_MOUSE) {
      window.form.activateForm();
      mapPinMain.removeEventListener('click', activateEventHandler);
    }
  }
  );
})();
