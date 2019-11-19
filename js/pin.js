'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;
  var pinMain = document.querySelector('.map .map__pin--main');
  var MAIN_PIN_START_COORD_X = pinMain.offsetLeft;
  var MAIN_PIN_START_COORD_Y = pinMain.offsetTop;
  var pinTemplate = document.querySelector('#pin').content.querySelector('button');
  var mapPinsBlock = document.querySelector('.map__pins');

  /**
   * Add DOM elements to HTML doc.
   * @param {array} arr array of js elements
   * @return {array} created pin HTML elements
   */
  function createDomElements(arr) {
    var fragment = document.createDocumentFragment();
    var pinElements = [];
    arr.forEach(function (element) {
      if (element.offer) {
        var pinElement = createPinElement(element);
        fragment.appendChild(pinElement);
        pinElements.push(pinElement);
      }
    });
    mapPinsBlock.appendChild(fragment);

    return pinElements;
  }

  /**
   * Set different values for some properties of pin.
   * @param {object} adCard object
   * @return {object} user object with new values
   */
  function createPinElement(adCard) {
    var newAdCard = pinTemplate.cloneNode(true);

    newAdCard.style.left = (adCard.location.x - PIN_WIDTH / 2) + 'px';
    newAdCard.style.top = (adCard.location.y - PIN_HEIGHT) + 'px';
    newAdCard.querySelector('img').src = adCard.author.avatar;
    newAdCard.querySelector('img').alt = adCard.offer.title;
    return newAdCard;
  }

  function showCardsOfSelectedPin(mapPins) {
    mapPins.forEach(function (pin) {
      pin.addEventListener('click', window.keksobooking.card.showElement);
      pin.addEventListener('keydown', showCardByEnter);
    });
  }

  function showCardByEnter(evt) {
    if (evt.keyCode === window.keksobooking.utils.ENTER_KEYCODE) {
      window.keksobooking.card.showElement(evt);
    }
  }

  function checkCoordsInterval(shift) {
    var mapWidthEnd = window.keksobooking.map.mapElement.offsetWidth - MAIN_PIN_WIDTH / 2;
    var mapWidthBegin = 0 - MAIN_PIN_WIDTH / 2;
    var MAP_BEGIN_MAIN_PIN_HEIGHT = window.keksobooking.map.BEGIN_HEIGHT - MAIN_PIN_HEIGHT;
    var MAP_END_MAIN_PIN_HEIGHT = window.keksobooking.map.END_HEIGHT - MAIN_PIN_HEIGHT;

    var currentCoordY = pinMain.offsetTop - shift.y;
    var currentCoordX = pinMain.offsetLeft - shift.x;
    if (currentCoordY < MAP_BEGIN_MAIN_PIN_HEIGHT) {
      currentCoordY = MAP_BEGIN_MAIN_PIN_HEIGHT;
    } else if (currentCoordY > MAP_END_MAIN_PIN_HEIGHT) {
      currentCoordY = MAP_END_MAIN_PIN_HEIGHT;
    }
    if (currentCoordX < mapWidthBegin) {
      currentCoordX = mapWidthBegin;
    } else if (currentCoordX > mapWidthEnd) {
      currentCoordX = mapWidthEnd;
    }

    var coords = {
      coordX: currentCoordX,
      coordY: currentCoordY
    };
    return coords;
  }

  /**
   * Change status of map and form on active.
   */
  function makePageAvailiable() {
    if (window.keksobooking.map.mapElement.classList.contains('map--faded')) {
      window.keksobooking.data.loadAds();
      window.keksobooking.map.setMapNotFaded();
      window.keksobooking.form.makeAvailable();
      window.keksobooking.form.setPinAddress(pinMain);
    }
  }

  function deletePins() {
    var pins = window.keksobooking.map.mapElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.removeEventListener('click', window.keksobooking.card.showElement);
      pin.removeEventListener('keydown', showCardByEnter);
      pin.remove();
    });
  }

  /**
   * Set coordinates x and y for main pin.
   * If x or y isn't set, x and y will be with default value (centr of the map).
   * @param {number} x
   * @param {number} y
   */
  function setPinMainCoords(x, y) {
    x = x || MAIN_PIN_START_COORD_X;
    y = y || MAIN_PIN_START_COORD_Y;
    pinMain.style.top = y + 'px';
    pinMain.style.left = x + 'px';
  }

  /**
   * Initialize event listeners for pin moving.
   */
  function runModule() {
    pinMain.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.keksobooking.utils.ENTER_KEYCODE) {
        makePageAvailiable();
      }
    });

    pinMain.addEventListener('mousedown', makePageAvailiable);

    pinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var coords = checkCoordsInterval(shift);
        setPinMainCoords(coords.coordX, coords.coordY);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.querySelector('.map').removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        window.keksobooking.form.setPinAddress(pinMain);
      };

      document.querySelector('.map').addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  window.keksobooking.pin = {
    HEIGHT: PIN_HEIGHT,
    WIDTH: PIN_WIDTH,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    createDomElements: createDomElements,
    showCardsOfSelectedPin: showCardsOfSelectedPin,
    deletePins: deletePins,
    setMainCoords: setPinMainCoords,
    main: pinMain,
    runModule: runModule
  };

})();
