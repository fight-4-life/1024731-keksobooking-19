'use strict';

(function () {

  var LEFT_BUTTON_MOUSE = 0;
  var MAIN_PIN_X = 570;
  var MAIN_PIN_Y = 375;
  var MAIN_PIN_HEIGHT_AND_WIDTH = 62;
  var SPIRE_HEIGHT = 22;

  var addressInputElement = document.querySelector('#address');
  var advertisingFormElement = document.querySelector('.ad-form');
  var resetFormButtonElement = advertisingFormElement.querySelector('.ad-form__reset');
  var formFieldsets = advertisingFormElement.querySelectorAll('fieldset');
  var mainPinElement = document.querySelector('.map__pin--main');
  var mapElement = document.querySelector('.map');
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
  var debounceOnChangeFilterForm = window.debounce(onChangeFilterForm);

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
    window.filter.enable(debounceOnChangeFilterForm);
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
    advertisingFormElement.classList.remove('ad-form--disabled');
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
    addressInputElement.value = location.x + ', ' + location.y;
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
    mapElement.classList.add('map--faded');
    advertisingFormElement.classList.add('ad-form--disabled');
    window.pins.removePins();
    disableForm();
    advertisingFormElement.reset();
    window.imgUpload.avatarField.removeEventListener('change', window.imgUpload.avatarChooser);
    window.imgUpload.housingPhotoField.removeEventListener('change', window.imgUpload.housingPhotoChooser);
    window.imgUpload.removeUploadedImg();
    onMainPinClick();
    mainPinElement.style.left = MAIN_PIN_X + 'px';
    mainPinElement.style.top = MAIN_PIN_Y + 'px';
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
    var mainElement = document.querySelector('main');
    mainElement.appendChild(errorMessage);
  }

  advertisingFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.load.postRequest(new FormData(advertisingFormElement), onPostSuccess, onPostError);
  });

  resetFormButtonElement.addEventListener('click', function () {
    mapElement.classList.add('map--faded');
    advertisingFormElement.classList.add('ad-form--disabled');
    window.pins.removePins();
    disableForm();
    advertisingFormElement.reset();
    onMainPinClick();
    mainPinElement.style.left = MAIN_PIN_X + 'px';
    mainPinElement.style.top = MAIN_PIN_Y + 'px';
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
    mainPin: mainPinElement,
    advertisingForm: advertisingFormElement
  };
})();
