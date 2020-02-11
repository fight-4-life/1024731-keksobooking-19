'use strict';

(function () {
  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getRandomArray(arr) {
    var newArray = [];
    var newArrayLength = getRandomNumber(1, arr.length + 1);
    for (var i = 0; i < newArrayLength; i++) {
      newArray.push(arr[i]);
    }
    return newArray;
  }
  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomArray: getRandomArray
  };
})();
