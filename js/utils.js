'use strict';

(function () {
  window.ENTER_KEYCODE = 13;
  window.ESC_KEYCODE = 27;

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

  /**
   * Show all elements of capacity list
   * @param {array} elements
   */
  function showAllElements(elements) {
    for (var i = 0; i < elements.length; i++) {
      changeElementDisplay(elements[i], 'block');
    }
  }

  /**
   * Make all pins invisible, excepting main pin.
   * @param {array} elements
   */
  function hideAllElements(elements) {
    for (var i = 0; i < elements.length; i++) {
      changeElementDisplay(elements[i], 'none');
    }
  }

  window.utils = {
    getRandomNumberInTheRange: getRandomNumberInTheRange,
    shortenArrayRandomly: shortenArrayRandomly,
    changeElementDisplay: changeElementDisplay,
    showAllElements: showAllElements,
    hideAllElements: hideAllElements
  };

})();
