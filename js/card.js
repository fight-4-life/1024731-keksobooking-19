'use strict';

(function () {

  // ===>> Функция отрисовки модального окна с информацией об объявлении <<===

  function renderCards(offer) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = offer.author.avatar;
    cardElement.querySelector('.popup__title').innerText = offer.offer.title;
    cardElement.querySelector('.popup__text--address').innerText = offer.offer.address;
    cardElement.querySelector('.popup__text--price').innerText = offer.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').innerText = offer.offer.type;
    cardElement.querySelector('.popup__text--capacity').innerText = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').innerText = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    cardElement.querySelector('.popup__description').innerText = offer.offer.description;

    var featuresList = cardElement.querySelector('.popup__features');
    var features = featuresList.querySelectorAll('.popup__feature');

    features.forEach(function (feature) {
      var featureItem = featuresList.removeChild(feature);
      offer.offer.features.forEach(function (offerFeature) {
        if (featureItem.classList.value.includes(offerFeature)) {
          featuresList.appendChild(featureItem);
        }
      });
    });

    var photos = cardElement.querySelector('.popup__photos');

    if (offer.offer.photos) {
      var photoList = photos.removeChild(photos.querySelector('.popup__photo'));
      offer.offer.photos.forEach(function (photo) {
        var photoElement = photoList.cloneNode();
        photoElement.src = photo;
        photos.appendChild(photoElement);
      });
      cardElement.appendChild(photos);
    } else {
      cardElement.removeChild(photos);
    }

    var map = document.querySelector('.map');
    map.insertBefore(cardElement, map.querySelector('.map__filters-container'));

    // ===>> Функция закрытия модального окна (не по заданию, просто бесило), нужно еще на Esc <<===

    function onCloseButtonClick(evt) {
      if (evt.target.type === 'button') {
        map.removeChild(cardElement);
        cardElement.removeEventListener('click', onCloseButtonClick);
      }
    }
    cardElement.addEventListener('click', onCloseButtonClick);
  }

  window.card = {
    renderCards: renderCards
  };
})();
