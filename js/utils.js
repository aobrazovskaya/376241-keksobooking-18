'use strict';

(function () {
  window.ENTER_KEYCODE = 13;
  window.ESC_KEYCODE = 27;

  /**
   * @param {number} min
   * @param {number} max
   * @return {number}
   */
  window.getRandomNumberInTheRange = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  /**
   * @param {array} array
   * @return {array} with random elements
   */
  window.shortenArrayRandomly = function (array) {
    var arr = [];
    for (var i = 0; i < array.length; i++) {
      var isRandomNumber = window.getRandomNumberInTheRange(0, 2);
      if (isRandomNumber) {
        arr.push(array[i]);
      }
    }
    return arr;
  };

  /**
   * Change value of display property of HTML Element.
   * @param {HTMLElement} element
   * @param {String} displayValue value of display property
   */
  window.changeElementDisplay = function (element, displayValue) {
    element.style.display = displayValue;
  };

  /**
   * Show all elements of capacity list
   * @param {array} elements
   */
  window.showAllElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      window.changeElementDisplay(elements[i], 'block');
    }
  };

  /**
   * Make all pins invisible, excepting main pin.
   * @param {array} elements
   */
  window.hideAllElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      window.changeElementDisplay(elements[i], 'none');
    }
  };

})();
