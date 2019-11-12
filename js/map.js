'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var map = document.querySelector('.map');
  var mapFaded = 'map--faded';
  var mapFilteresContainer = map.querySelector('.map__filters-container');
  var mapFilteres = map.querySelector('.map__filters');
  var filtersAll = mapFilteres.querySelectorAll('select');
  var featuresAll = mapFilteres.querySelectorAll('.map__checkbox');
  var MAP_BEGIN_HEIGHT = 130;
  var MAP_END_HEIGHT = 630;
  var mapWidth = mapElement.offsetWidth - window.keksobooking.pin.WIDTH;
  var mapBeginHeight = MAP_BEGIN_HEIGHT - window.keksobooking.pin.HEIGHT;
  var mapEndHeight = MAP_END_HEIGHT - window.keksobooking.pin.HEIGHT;
  var filteres = Array.from(filtersAll).concat(Array.from(featuresAll));
  var typeFilter = filteres[0];
  var priceFilter = filteres[1];
  var roomFilteres = filteres[2];
  var guestFilteres = filteres[3];

  /**
   * Turn status of the map in active.
   * @param {HTMLElement} element map
   */
  function setMapNotFaded() {
    map.classList.remove('map--faded');
  }

  /**
   * Turn status of the map in active.
   * @param {HTMLElement} element map
   */
  function setMapFaded() {
    map.classList.add('map--faded');
  }

  function setFilteresDisabled(changeTo) {
    filteres.forEach(function (element) {
      element.disabled = changeTo;
    });
    mapFilteres.reset();
  }

  filteres.forEach(function (element) {
    element.addEventListener('change', filterAds);
  });

  function filterAds() {
    var filteredAds = window.keksobooking.data.ads.filter(function (ad) {
      var isType = typeFilter.value === 'any' ? true : ad.offer.type === typeFilter.value;
      // var isPrice = priceFilter.value === 'any' ? true : 
      return isType;
    }).slice(0, 5);
    var pins = window.keksobooking.map.mapBlock.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.keksobooking.pin.deletePins(pins);
    window.keksobooking.pin.createDomElements(filteredAds);
  }

  window.keksobooking.map = {
    mapBlock: map,
    FilteresContainer: mapFilteresContainer,
    Filteres: mapFilteres,
    Width: mapWidth,
    BeginHeight: mapBeginHeight,
    EndHeight: mapEndHeight,
    setMapNotFaded: setMapNotFaded,
    setMapFaded: setMapFaded,
    setFilteresDisabled: setFilteresDisabled,
    BEGIN_HEIGHT: MAP_BEGIN_HEIGHT,
    END_HEIGHT: MAP_END_HEIGHT,
    runModule: runModule
  };

  function runModule() {
    map.classList.add(mapFaded);
  }
})();
