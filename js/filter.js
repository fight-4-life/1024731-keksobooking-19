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
    var result;

    switch (housingPrice) {
      case 'low':
        result = offer.offer.price < 10000;
        break;
      case 'middle':
        result = offer.offer.price >= 10000 && offer.offer.price <= 50000;
        break;
      case 'high':
        result = offer.offer.price > 50000;
        break;
      case 'any':
      default:
        result = true;
        break;
    }
    return result;
  }

  function filterByHousingRooms(offer) {
    var housingRooms = housingRoomsSelector.value;
    return housingRooms === 'any' ? true : offer.offer.rooms === Number(housingRooms);
  }

  function filterByHousingGuests(offer) {
    var housingGuests = housingGuestsSelector.value;
    return housingGuests === 'any' ? true : offer.offer.guests === Number(housingGuests);
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
