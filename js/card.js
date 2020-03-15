'use strict';

(function () {

  var housingTypesMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var ESC_KEY = 'Escape';

  var MIN_HEIGHT = 130;
  var MAX_HEIGHT = 630;

  function processOfferData(element, hasData, text) {
    if (hasData) {
      element.textContent = text;
    } else {
      element.style.display = 'none';
    }
  }

  function renderFeatures(cardElement, features) {

    var featuresListElement = cardElement.querySelector('.popup__features');
    var featuresList = featuresListElement.querySelectorAll('.popup__feature');

    if (features.length === 0) {
      featuresListElement.style.display = 'none';
      return;
    }
    featuresList.forEach(function (feature) {
      var featureItem = featuresListElement.removeChild(feature);

      features.forEach(function (offerFeature) {
        if (featureItem.classList.value.includes(offerFeature)) {
          featuresListElement.appendChild(featureItem);
        }
      });
    });
  }
  function renderPhotos(cardElement, photos) {
    var photosElement = cardElement.querySelector('.popup__photos');
    if (photos.length === 0) {
      photosElement.style.display = 'none';
      return;
    }
    var photoList = photosElement.removeChild(photosElement.querySelector('.popup__photo'));
    photos.forEach(function (photo) {
      var photoElement = photoList.cloneNode();
      photoElement.src = photo;
      photosElement.appendChild(photoElement);
    });
    cardElement.appendChild(photosElement);
  }

  // ===>> Функция отрисовки модального окна с информацией об объявлении <<===

  function renderCards(offer) {

    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);

    var avatarElement = cardElement.querySelector('.popup__avatar');
    if (offer.author.avatar) {
      avatarElement.src = offer.author.avatar;
    } else {
      avatarElement.style.display = 'none';
    }

    var titleElement = cardElement.querySelector('.popup__title');
    processOfferData(titleElement, !!offer.offer.title, offer.offer.title);

    var addresElement = cardElement.querySelector('.popup__text--address');
    processOfferData(addresElement, !!offer.offer.address, offer.offer.address);

    var priceElement = cardElement.querySelector('.popup__text--price');
    processOfferData(priceElement, !!offer.offer.price, offer.offer.price + '₽/ночь');

    var typeElement = cardElement.querySelector('.popup__type');
    processOfferData(typeElement, !!housingTypesMap[offer.offer.type], housingTypesMap[offer.offer.type]);

    var capacityElement = cardElement.querySelector('.popup__text--capacity');
    processOfferData(capacityElement, offer.offer.rooms > 0 && offer.offer.guests > 0, offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей');

    var checkinCheckoutElement = cardElement.querySelector('.popup__text--time');
    processOfferData(checkinCheckoutElement, !!offer.offer.checkin && !!offer.offer.checkout, 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout);

    var descriptionElement = cardElement.querySelector('.popup__description');
    processOfferData(descriptionElement, !!offer.offer.description, offer.offer.description);

    renderFeatures(cardElement, offer.offer.features);
    renderPhotos(cardElement, offer.offer.photos);

    var map = document.querySelector('.map');
    map.insertBefore(cardElement, map.querySelector('.map__filters-container'));

    // ===>> Функция закрытия модального окна <<===

    function onCloseButtonClick(evt) {
      if (evt.target.type === 'button') {
        map.removeChild(cardElement);
        cardElement.removeEventListener('click', onCloseButtonClick);
        window.removeEventListener('keydown', onEscapeBtn);
      }
    }

    // ===>> Функция закрытия модального окна на клавишу Escape <<===

    function onEscapeBtn(evt) {
      if (evt.key === ESC_KEY) {
        map.removeChild(cardElement);
        cardElement.removeEventListener('click', onCloseButtonClick);
        window.removeEventListener('keydown', onEscapeBtn);
      }
    }
    cardElement.addEventListener('click', onCloseButtonClick);
    window.addEventListener('keydown', onEscapeBtn);
  }
  // ===>> Функция закрытия ранее открытого модального окна <<===
  function closeOpenedCard() {
    var popupItem = document.querySelector('.map__card');
    if (popupItem) {
      popupItem.remove();
    }
  }

  // ===>> Функция перетаскивания метки <<===

  function pinDrugNDrop() {
    var mainPinHandle = window.form.mainPin;
    var mapWidth = document.querySelector('body').clientWidth;
    var mainPinHeight = window.form.MAIN_PIN_HEIGHT_AND_WIDTH + window.form.SPIRE_HEIGHT;
    var helfMainPinWidth = window.form.MAIN_PIN_HEIGHT_AND_WIDTH / 2;
    var currentPinCoordinates = {
      x: window.form.currentOffer.location.x,
      y: window.form.currentOffer.location.y
    };

    mainPinHandle.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var currentCursorCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: currentCursorCoordinates.x - moveEvt.clientX,
          y: currentCursorCoordinates.y - moveEvt.clientY
        };

        currentCursorCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var coordinateY = (mainPinHandle.offsetTop - shift.y);
        var coordinateX = (mainPinHandle.offsetLeft - shift.x);

        if (coordinateY >= MIN_HEIGHT - mainPinHeight && coordinateY <= (MAX_HEIGHT - mainPinHeight)) {
          mainPinHandle.style.top = coordinateY + 'px';
          currentPinCoordinates.y = coordinateY + mainPinHeight;
        }
        if (coordinateX <= (mapWidth - helfMainPinWidth) && coordinateX >= (mapWidth - mapWidth - helfMainPinWidth)) {
          mainPinHandle.style.left = coordinateX + 'px';
          currentPinCoordinates.x = coordinateX + helfMainPinWidth;
        }
        window.form.updateCurrentOfferLocation(currentPinCoordinates);
      }

      function onMouseUp(upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mousedown', onMouseUp);
      }
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }
  window.card = {
    renderCards: renderCards,
    closeOpenedCard: closeOpenedCard,
    pinDrugNDrop: pinDrugNDrop,
    ESC_KEY: ESC_KEY
  };
})();
