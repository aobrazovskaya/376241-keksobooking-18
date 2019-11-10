'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;
  var pinTemplate = document.querySelector('#pin').content.querySelector('button');
  var mapPinsBlock = document.querySelector('.map__pins');
  var pinMain = document.querySelector('.map .map__pin--main');
  var MAIN_PIN_START_COORDX = pinMain.offsetLeft;
  var MAIN_PIN_START_COORDY = pinMain.offsetTop;

  window.keksobooking.pin = {
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_WIDTH: PIN_WIDTH,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    createDomElements: createDomElements,
    showCardsOfSelectedPin: showCardsOfSelectedPin,
    deletePins: deletePins,
    setPinMainCoords: setPinMainCoords,
    pinMain: pinMain,
    runPinModule: runPinModule
  };

  /**
   * Add DOM elements to HTML doc.
   * @param {array} arr array of js elements
   */
  function createDomElements(arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].offer) {
        fragment.appendChild(createPinElement(arr[i]));
      }
    }
    mapPinsBlock.appendChild(fragment);
  }

  /**
   * Set different values for some properties of pin.
   * @param {object} adCard object
   * @return {object} user object with new values
   */
  function createPinElement(adCard) {
    var newAdCard = pinTemplate.cloneNode(true);

    newAdCard.style = 'left: ' + (adCard.location.x - PIN_WIDTH / 2) + 'px; top: ' + (adCard.location.y - PIN_HEIGHT) + 'px;';
    newAdCard.children[0].src = adCard.author.avatar;
    newAdCard.children[0].alt = adCard.offer.title;
    return newAdCard;
  }

  function showCardsOfSelectedPin(mapPins) {
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].addEventListener('click', window.keksobooking.card.showCardElement);

      mapPins[i].addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.keksobooking.utils.ENTER_KEYCODE) {
          window.keksobooking.card.showCardElement(evt);
        }
      });
    }
  }

  function checkIntervalforCoords(shift) {
    var mapWidthEnd = window.keksobooking.map.map.offsetWidth - MAIN_PIN_WIDTH / 2;
    var mapWidthBegin = 0 - MAIN_PIN_WIDTH / 2;
    var MAP_BEGIN_MAIN_PIN_HEIGHT = window.keksobooking.map.MAP_BEGIN_HEIGHT - MAIN_PIN_HEIGHT;
    var MAP_END_MAIN_PIN_HEIGHT = window.keksobooking.map.MAP_END_HEIGHT - MAIN_PIN_HEIGHT;

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
    if (window.keksobooking.map.map.classList.contains('map--faded')) {
      window.keksobooking.data.getAds();
      window.keksobooking.map.setMapNotFaded();
      window.keksobooking.form.makeFormAvailable();
      window.keksobooking.form.setPinAddress(pinMain);
    }
  }

  function deletePins(pins) {
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  }

  /**
   * Set coordinates x and y for main pin.
   * If x or y isn't set, x and y will be with default value (centr of the map).
   * @param {number} x
   * @param {number} y
   */
  function setPinMainCoords(x, y) {
    x = x || MAIN_PIN_START_COORDX;
    y = y || MAIN_PIN_START_COORDY;
    pinMain.style.top = y + 'px';
    pinMain.style.left = x + 'px';
  }

  function runPinModule() {
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

        var coords = checkIntervalforCoords(shift);
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

})();
