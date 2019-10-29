'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  /**
   * @param {number} min
   * @param {number} max
   * @return {number}
   */
  function getRandomNumberInTheRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * @param {array} array
   * @return {array} with random elements
   */
  function shortenArrayRandomly(array) {
    var arr = [];
    for (var i = 0; i < array.length; i++) {
      var isRandomNumber = getRandomNumberInTheRange(0, 2);
      if (isRandomNumber) {
        arr.push(array[i]);
      }
    }
    return arr;
  }

  /**
   * Change value of display property of HTML Element.
   * @param {HTMLElement} element
   * @param {String} displayValue value of display property
   */
  function changeElementDisplay(element, displayValue) {
    element.style.display = displayValue;
  }

  window.utils = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    getRandomNumberInTheRange: getRandomNumberInTheRange,
    shortenArrayRandomly: shortenArrayRandomly,
    changeElementDisplay: changeElementDisplay
  };

})();
