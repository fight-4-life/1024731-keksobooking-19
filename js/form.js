'use strict';

(function () {
  var MAIN_PIN_X = 570;
  var MAIN_PIN_Y = 375;
  var MAIN_PIN_HEIGHT_AND_WIDTH = 62;
  var SPIRE_HEIGHT = 22;
  var addressInput = document.querySelector('#address');
  var form = document.querySelector('.ad-form');
  var resetFormButton = form.querySelector('.ad-form__reset');
  var formFieldsets = form.querySelectorAll('fieldset');
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var LEFT_BUTTON_MOUSE = 0;
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
    window.card.closeOpenedCard();
    window.pins.removePins();
    window.pins.renderPin(filteredOffers);
  }
  var debounceHandleChangeFilterForm = window.debounce(handleChangeFilterForm);

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
    window.filter.enable(debounceHandleChangeFilterForm);
    downloadedOffers = offers;
    var filteredOffers = window.filter.returnFiltered(downloadedOffers);
    window.pins.renderPin(filteredOffers);
  }

  function activateForm() {
    window.load.getRequest(onSuccessLoad);
    window.filter.mapFilters.reset();
    enableForm();
    window.imgUpload.avatarField.addEventListener('click', window.imgUpload.avatarChooser);
    window.imgUpload.housingPhotoField.addEventListener('click', window.imgUpload.housingPhotoChooser);
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

    var onSuccessMessageClick = function () {
      window.removeEventListener('click', onSuccessMessageClick);
      window.removeEventListener('keydown', onSuccessMessageEscPress);
      successMessage.remove();
    };
    var onSuccessMessageEscPress = function (evt) {
      if (evt.key === window.card.ESC_KEY) {
        window.removeEventListener('click', onSuccessMessageClick);
        window.removeEventListener('keydown', onSuccessMessageEscPress);
        successMessage.remove();
      }
    };

    window.addEventListener('click', onSuccessMessageClick);
    window.addEventListener('keydown', onSuccessMessageEscPress);
    document.body.appendChild(successMessage);
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    window.pins.removePins();
    disableForm();
    form.reset();
    window.imgUpload.avatarField.removeEventListener('click', window.imgUpload.avatarChooser);
    window.imgUpload.housingPhotoField.removeEventListener('click', window.imgUpload.housingPhotoChooser);
    onMainPinClick();
    mainPin.style.left = MAIN_PIN_X + 'px';
    mainPin.style.top = MAIN_PIN_Y + 'px';
    updateCurrentOfferLocation(currentOffer.location);
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

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.load.postRequest(new FormData(form), onPostSuccess, onPostError);
  });

  resetFormButton.addEventListener('click', function () {
    form.reset();
  });

  window.form = {
    disableForm: disableForm,
    activateForm: activateForm,
    updateCurrentOfferLocation: updateCurrentOfferLocation,
    currentOffer: currentOffer,
    MAIN_PIN_HEIGHT_AND_WIDTH: MAIN_PIN_HEIGHT_AND_WIDTH,
    SPIRE_HEIGHT: SPIRE_HEIGHT,
    onMainPinClick: onMainPinClick
  };
})();
