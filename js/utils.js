'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var ADS_COUNT = 5;
  var DEBOUNCE_INTERVAL = 500; // ms

  /**
   * Change value of display property of HTML Element.
   * @param {HTMLElement} element
   * @param {String} displayValue value of display property
   */
  function changeElementDisplay(element, displayValue) {
    element.style.display = displayValue;
  }

  function cropArrayToFiveElements(arr) {
    return arr.slice(0, ADS_COUNT);
  }

  function debounce(cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }

  window.keksobooking = {};

  window.keksobooking.utils = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    cropArrayToFiveElements: cropArrayToFiveElements,
    changeElementDisplay: changeElementDisplay,
    debounce: debounce
  };

})();
