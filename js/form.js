'use strict';

(function () {

  var LEFT_BUTTON_MOUSE = 0;
  var MAIN_PIN_X = 570;
  var MAIN_PIN_Y = 375;
  var MAIN_PIN_HEIGHT_AND_WIDTH = 62;
  var SPIRE_HEIGHT = 22;

  var addressInput = document.querySelector('#address');
  var advertisingForm = document.querySelector('.ad-form');
  var resetFormButton = advertisingForm.querySelector('.ad-form__reset');
  var formFieldsets = advertisingForm.querySelectorAll('fieldset');
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var downloadedOffers = null;

  var currentOfferLocation = {
    x: MAIN_PIN_X + MAIN_PIN_HEIGHT_AND_WIDTH / 2,
    y: MAIN_PIN_Y + MAIN_PIN_HEIGHT_AND_WIDTH / 2
  };

  function onChangeFilterForm() {
    var filteredOffers = window.filter.returnFiltered(downloadedOffers);
    window.card.closeOpenedCard();
    window.pins.removePins();
    window.pins.renderPin(filteredOffers);
  }
  var debounceHandleChangeFilterForm = window.debounce(onChangeFilterForm);

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
    var validOffers = offers.filter(function (offer) {
      return !!offer.offer;
    });
    window.filter.enable(debounceHandleChangeFilterForm);
    downloadedOffers = validOffers;
    var filteredOffers = window.filter.returnFiltered(downloadedOffers);
    window.pins.renderPin(filteredOffers);
  }

  function activateForm() {
    window.load.getRequest(onSuccessLoad);
    window.filter.mapFilters.reset();
    enableForm();
    window.imgUpload.avatarField.addEventListener('change', window.imgUpload.avatarChooser);
    window.imgUpload.housingPhotoField.addEventListener('change', window.imgUpload.housingPhotoChooser);
    window.card.pinDrugNDrop();
    window.formValidation.roomsToGuestsValidation();
    window.formValidation.housingTypeToMinPriceValidation();
    window.formValidation.getTimeSync();
    advertisingForm.classList.remove('ad-form--disabled');
    document.querySelector('.map').classList.remove('map--faded');
    currentOfferLocation.y = MAIN_PIN_Y + MAIN_PIN_HEIGHT_AND_WIDTH + SPIRE_HEIGHT;
    updateCurrentOfferLocation(currentOfferLocation);
    document.querySelector('#room_number').addEventListener('change', function () {
      window.formValidation.roomsToGuestsValidation();
    });
    document.querySelector('#capacity').addEventListener('change', function () {
      window.formValidation.roomsToGuestsValidation();
    });
  }

  function updateCurrentOfferLocation(location) {
    addressInput.value = location.x + ', ' + location.y;
  }

  function onMainPinClick() {
    var mapPinMain = document.querySelector('.map__pin--main');
    mapPinMain.addEventListener('click', function activateEventHandler(evt) {
      if (evt.button === LEFT_BUTTON_MOUSE) {
        window.form.activateForm();
        mapPinMain.removeEventListener('click', activateEventHandler);
      }
    }
    );
  }

  function onPostSuccess() {
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successMessageTemplate.cloneNode(true);

    function onSuccessMessageClick() {
      window.removeEventListener('click', onSuccessMessageClick);
      window.removeEventListener('keydown', onSuccessMessageEscPress);
      successMessage.remove();
    }
    function onSuccessMessageEscPress(evt) {
      if (evt.key === window.card.ESC_KEY) {
        window.removeEventListener('click', onSuccessMessageClick);
        window.removeEventListener('keydown', onSuccessMessageEscPress);
        successMessage.remove();
      }
    }

    window.addEventListener('click', onSuccessMessageClick);
    window.addEventListener('keydown', onSuccessMessageEscPress);
    document.body.appendChild(successMessage);
    map.classList.add('map--faded');
    advertisingForm.classList.add('ad-form--disabled');
    window.pins.removePins();
    disableForm();
    advertisingForm.reset();
    window.imgUpload.avatarField.removeEventListener('change', window.imgUpload.avatarChooser);
    window.imgUpload.housingPhotoField.removeEventListener('change', window.imgUpload.housingPhotoChooser);
    window.imgUpload.removeUploadedImg();
    onMainPinClick();
    mainPin.style.left = MAIN_PIN_X + 'px';
    mainPin.style.top = MAIN_PIN_Y + 'px';
    updateCurrentOfferLocation(currentOfferLocation);
  }

  function onPostError(errorText) {
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorMessageTemplate.cloneNode(true);
    errorMessage.querySelector('.error__message').textContent = errorText;

    errorMessage.querySelector('.error__button').addEventListener('click', function () {
      window.removeEventListener('click', onErrorMessageClick);
      window.removeEventListener('keydown', onErrorMessageEscPress);
      errorMessage.remove();
    });
    function onErrorMessageClick() {
      window.removeEventListener('click', onErrorMessageClick);
      errorMessage.remove();
    }
    function onErrorMessageEscPress(evt) {
      if (evt.key === window.card.ESC_KEY) {
        window.removeEventListener('keydown', onErrorMessageEscPress);
        errorMessage.remove();
      }
    }
    window.addEventListener('click', onPostError);
    window.addEventListener('keydown', onErrorMessageEscPress);
    var main = document.querySelector('main');
    main.appendChild(errorMessage);
  }

  advertisingForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.load.postRequest(new FormData(advertisingForm), onPostSuccess, onPostError);
  });

  resetFormButton.addEventListener('click', function () {
    map.classList.add('map--faded');
    advertisingForm.classList.add('ad-form--disabled');
    window.pins.removePins();
    disableForm();
    advertisingForm.reset();
    onMainPinClick();
    mainPin.style.left = MAIN_PIN_X + 'px';
    mainPin.style.top = MAIN_PIN_Y + 'px';
    updateCurrentOfferLocation(currentOfferLocation);
  });

  window.form = {
    disableForm: disableForm,
    activateForm: activateForm,
    updateCurrentOfferLocation: updateCurrentOfferLocation,
    currentOfferLocation: currentOfferLocation,
    MAIN_PIN_HEIGHT_AND_WIDTH: MAIN_PIN_HEIGHT_AND_WIDTH,
    SPIRE_HEIGHT: SPIRE_HEIGHT,
    onMainPinClick: onMainPinClick,
    mainPin: mainPin,
    advertisingForm: advertisingForm
  };
})();
