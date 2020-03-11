'use strict';

(function () {

  var MAX_PINS_QUANTITY = 5;
  var mapFilters = document.querySelector('.map__filters');
  var housingTypeSelector = document.querySelector('#housing-type');
  var housingPriceSelector = document.querySelector('#housing-price');
  var housingRoomsSelector = document.querySelector('#housing-rooms');
  var housingGuestsSelector = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('.map__checkbox');
  var selectFilterNodeList = mapFilters.querySelectorAll('select');
  var LOW_HOUSING_PRICE = 10000;
  var HIGHT_HOUSING_PRICE = 50000;

  function enableFilter(eventHandler) {
    selectFilterNodeList.forEach(function (selectFilter) {
      selectFilter.removeAttribute('disabled');
    });
    mapFilters.addEventListener('change', eventHandler);
  }

  function disableFilters(eventHandler) {
    selectFilterNodeList.forEach(function (selectFilter) {
      selectFilter.setAttribute('disabled', 'disabled');
    });
    mapFilters.removeEventListener('change', eventHandler);
  }

  function filterByHousingType(offer) {
    var housingType = housingTypeSelector.value;
    return (housingType === 'any') || (housingType === offer.offer.type);
  }

  function filterByHousingPrice(offer) {
    var housingPrice = housingPriceSelector.value;

    switch (housingPrice) {
      case 'low':
        return offer.offer.price < LOW_HOUSING_PRICE;
      case 'middle':
        return offer.offer.price >= LOW_HOUSING_PRICE && offer.offer.price <= HIGHT_HOUSING_PRICE;
      case 'high':
        return offer.offer.price > HIGHT_HOUSING_PRICE;
      case 'any':
      default:
        return true;
    }
  }

  function filterByHousingRooms(offer) {
    var housingRooms = housingRoomsSelector.value;
    return (housingRooms === 'any') || (offer.offer.rooms === Number(housingRooms));
  }

  function filterByHousingGuests(offer) {
    var housingGuests = housingGuestsSelector.value;
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
    mapFilters: mapFilters
  };
})();
