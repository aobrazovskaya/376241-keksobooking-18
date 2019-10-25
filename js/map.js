'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var map = document.querySelector('.map');
  var mapFaded = 'map--faded';
  var mapFilteresContainer = map.querySelector('.map__filters-container');
  var mapFilteres = map.querySelector('.map__filters');
  var mapWidth = mapElement.offsetWidth - window.PIN_WIDTH;
  var MAP_BEGIN_HEIGHT = 130 - window.PIN_HEIGHT;
  var MAP_END_HEIGHT = 630 - window.PIN_HEIGHT;

  /**
   * Turn status of the map in active.
   * @param {HTMLElement} element map
   */
  function setMapNotFaded() {
    map.classList.remove('map--faded');
  }

  window.map = {
    mapFilteresContainer: mapFilteresContainer,
    mapFilteres: mapFilteres,
    mapWidth: mapWidth,
    MAP_BEGIN_HEIGHT: MAP_BEGIN_HEIGHT,
    MAP_END_HEIGHT: MAP_END_HEIGHT,
    setMapNotFaded: setMapNotFaded
  };

  map.classList.add(mapFaded);
})();
