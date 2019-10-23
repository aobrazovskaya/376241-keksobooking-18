'use strict';

window.ENTER_KEYCODE = 13;
window.ESC_KEYCODE = 27;

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
