'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('button');
  var mapPinsBlock = document.querySelector('.map__pins');
  var pinMain = document.querySelector('.map__pin--main');
  var pinElements = createDomElements(window.ads);

  /**
   * Add DOM elements to HTML doc.
   * @param {array} arr array of js elements
   * @return {object} fragment of DOM elements
   */
  function createDomElements(arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(createPinElement(arr[i]));
    }
    return fragment;
  }

  /**
   * Set different values for some properties of pin.
   * @param {object} adCard object
   * @return {object} user object with new values
   */
  function createPinElement(adCard) {
    var newAdCard = pinTemplate.cloneNode(true);

    newAdCard.style = 'left: ' + (adCard.location.x + PIN_WIDTH / 2) + 'px; top: ' + (adCard.location.y + PIN_HEIGHT) + 'px;';
    newAdCard.children[0].src = adCard.author.avatar;
    newAdCard.children[0].alt = adCard.offer.title;
    return newAdCard;
  }

  mapPinsBlock.appendChild(pinElements);

  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  window.hideAllElements(mapPins);

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      window.setMapNotFaded();
      window.makeFormAvailable();
      window.showAllElements(mapPins);
      window.setPinAddress(pinMain);
    }
  });

  pinMain.addEventListener('mousedown', function () {
    window.setMapNotFaded();
    window.makeFormAvailable();
    window.showAllElements(mapPins);
    window.setPinAddress(pinMain);
  });

  for (var i = 0; i < mapPins.length; i++) {
    mapPins[i].addEventListener('click', window.showCardElement);

    mapPins[i].addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ENTER_KEYCODE) {
        window.showCardElement(evt);
      }
    });
  }
})();
