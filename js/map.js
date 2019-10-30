'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var map = document.querySelector('.map');
  var mapFaded = 'map--faded';
  var mapFilteresContainer = map.querySelector('.map__filters-container');
  var mapFilteres = map.querySelector('.map__filters');
  var MAP_BEGIN_HEIGHT = 130;
  var MAP_END_HEIGHT = 630;
  var mapWidth = mapElement.offsetWidth - window.pin.PIN_WIDTH;
  var mapBeginHeight = MAP_BEGIN_HEIGHT - window.pin.PIN_HEIGHT;
  var mapEndHeight = MAP_END_HEIGHT - window.pin.PIN_HEIGHT;

  /**
   * Turn status of the map in active.
   * @param {HTMLElement} element map
   */
  function setMapNotFaded() {
    map.classList.remove('map--faded');
  }

  window.map = {
    map: map,
    mapFilteresContainer: mapFilteresContainer,
    mapFilteres: mapFilteres,
    mapWidth: mapWidth,
    mapBeginHeight: mapBeginHeight,
    mapEndHeight: mapEndHeight,
    setMapNotFaded: setMapNotFaded,
    MAP_BEGIN_HEIGHT: MAP_BEGIN_HEIGHT,
    MAP_END_HEIGHT: MAP_END_HEIGHT
  };

  map.classList.add(mapFaded);
})();
