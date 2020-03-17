'use strict';

(function () {

  var MAX_PINS_QUANTITY = 5;
  var LOW_HOUSING_PRICE = 10000;
  var HIGH_HOUSING_PRICE = 50000;

  var mapFiltersElement = document.querySelector('.map__filters');
  var housingTypeSelectorElement = document.querySelector('#housing-type');
  var housingPriceSelectorElement = document.querySelector('#housing-price');
  var housingRoomsSelectorElement = document.querySelector('#housing-rooms');
  var housingGuestsSelectorElement = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('.map__checkbox');
  var selectFilters = mapFiltersElement.querySelectorAll('select');

  function enableFilter(eventHandler) {
    selectFilters.forEach(function (selectFilter) {
      selectFilter.removeAttribute('disabled');
    });
    mapFiltersElement.querySelector('.map__features').removeAttribute('disabled', 'disabled');
    mapFiltersElement.addEventListener('change', eventHandler);
  }

  function disableFilters(eventHandler) {
    selectFilters.forEach(function (selectFilter) {
      selectFilter.setAttribute('disabled', 'disabled');
    });
    mapFiltersElement.querySelector('.map__features').setAttribute('disabled', 'disabled');
    mapFiltersElement.removeEventListener('change', eventHandler);
  }

  function filterByHousingType(offer) {
    var housingType = housingTypeSelectorElement.value;
    return (housingType === 'any') || (housingType === offer.offer.type);
  }

  function filterByHousingPrice(offer) {
    var housingPrice = housingPriceSelectorElement.value;

    switch (housingPrice) {
      case 'low':
        return offer.offer.price < LOW_HOUSING_PRICE;
      case 'middle':
        return offer.offer.price >= LOW_HOUSING_PRICE && offer.offer.price <= HIGH_HOUSING_PRICE;
      case 'high':
        return offer.offer.price > HIGH_HOUSING_PRICE;
      default:
        return true;
    }
  }

  function filterByHousingRooms(offer) {
    var housingRooms = housingRoomsSelectorElement.value;
    return (housingRooms === 'any') || (offer.offer.rooms === Number(housingRooms));
  }

  function filterByHousingGuests(offer) {
    var housingGuests = housingGuestsSelectorElement.value;
    return (housingGuests === 'any') || (offer.offer.guests === Number(housingGuests));
  }

  function filterByHousingFeatures(offer) {
    return Array.from(housingFeatures).filter(function (element) {
      return element.checked;
    }).every(function (feature) {
      return offer.offer.features.includes(feature.value);
    });
  }

  function returnFiltered(offers) {
    var filteredOffers = [];
    var index = 0;

    while (filteredOffers.length < MAX_PINS_QUANTITY && index < offers.length) {
      var offer = offers[index];

      if (filterByHousingPrice(offer)
       && filterByHousingType(offer)
       && filterByHousingFeatures(offer)
       && filterByHousingRooms(offer)
       && filterByHousingGuests(offer)) {
        filteredOffers.push(offer);
      }
      index++;
    }
    return filteredOffers;
  }

  window.filter = {
    enable: enableFilter,
    disable: disableFilters,
    returnFiltered: returnFiltered,
    mapFilters: mapFiltersElement
  };
})();
