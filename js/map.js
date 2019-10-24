'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var map = document.querySelector('.map');
  window.mapFilteresContainer = map.querySelector('.map__filters-container');
  window.mapFilteres = map.querySelector('.map__filters');
  window.mapWidth = mapElement.offsetWidth - window.PIN_WIDTH;
  window.MAP_BEGIN_HEIGHT = 130 - window.PIN_HEIGHT;
  window.MAP_END_HEIGHT = 630 - window.PIN_HEIGHT;
  var mapFaded = 'map--faded';

  /**
   * Turn status of the map in active.
   * @param {HTMLElement} element map
   */
  window.setMapNotFaded = function () {
    map.classList.remove('map--faded');
  };

  map.classList.add(mapFaded);
})();
