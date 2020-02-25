'use strict';

(function () {
  var HousingType = {
    ANY: 'any',
    PALACE: 'palace',
    FLAT: 'flat',
    HOUSE: 'house',
    BUNGALO: 'bungalo',
  };
  var MAX_PINS_QUANTITY = 5;
  var mapFilters = document.querySelector('.map__filters');
  var housingTypeSelector = document.querySelector('#housing-type');
  var selectFilterNodeList = mapFilters.querySelectorAll('select');

  function enableFilter(eventHandler) {
    selectFilterNodeList.forEach(function (selectFilter) {
      return selectFilter.removeAttribute('disabled');
    });
    mapFilters.addEventListener('change', eventHandler);
  }

  function disableFilters(eventHandler) {
    selectFilterNodeList.forEach(function (selectFilter) {
      return selectFilter.setAttribute('disabled', 'disabled');
    });
    mapFilters.removeEventListener('change', eventHandler);
  }

  function filterByHousingType(offer) {
    var filterValue = housingTypeSelector.value;
    return (filterValue === HousingType.ANY) || (offer.offer.type === filterValue);
  }

  function returnFiltered(offers) {
    var filteredOffers = [];
    var index = 0;

    while (filteredOffers.length < MAX_PINS_QUANTITY && index < offers.length) {
      var offer = offers[index];
      if (filterByHousingType(offer)) {
        filteredOffers.push(offer);
      }
      index++;
    }

    return filteredOffers;
  }

  window.filter = {
    enable: enableFilter,
    disable: disableFilters,
    returnFiltered: returnFiltered
  };
})();
