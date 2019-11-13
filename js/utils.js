'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var ARRAY_COUNT = 5;

  /**
   * Change value of display property of HTML Element.
   * @param {HTMLElement} element
   * @param {String} displayValue value of display property
   */
  function changeElementDisplay(element, displayValue) {
    element.style.display = displayValue;
  }

  function cropArrayToFiveElements(arr) {
    return arr.slice(0, ARRAY_COUNT);
  }

  window.keksobooking = {};

  window.keksobooking.utils = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    cropArrayToFiveElements: cropArrayToFiveElements,
    changeElementDisplay: changeElementDisplay
  };

})();
