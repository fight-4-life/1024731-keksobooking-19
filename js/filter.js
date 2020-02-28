'use strict';

(function () {

  var MAX_PINS_QUANTITY = 5;
  var mapFilters = document.querySelector('.map__filters');
  var housingTypeSelector = document.querySelector('#housing-type');
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
    var filterValue = housingTypeSelector.value;
    return (filterValue === 'any') || (filterValue === offer.offer.type);
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
