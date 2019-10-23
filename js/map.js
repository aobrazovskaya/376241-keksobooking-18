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
   * Create a new ul list of available features.
   * @param {array} features of current ad
   * @param {HTMLElement} listElement html element of features list
   * @return {HTMLElement} new list
   */
  window.selectFeatures = function (features, listElement) {
    var currentFeaturesList = listElement.cloneNode(true);
    var featuresListNew = listElement.cloneNode(false);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      var currentElement = currentFeaturesList.querySelector('.popup__feature--' + features[i]);
      fragment.appendChild(currentElement);
    }
    featuresListNew.appendChild(fragment);
    return featuresListNew;
  };

  /**
   * Turn status of the map in active.
   * @param {HTMLElement} element map
   */
  window.setMapNotFaded = function () {
    map.classList.remove('map--faded');
  };

  map.classList.add(mapFaded);
})();
