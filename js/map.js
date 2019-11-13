'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var map = document.querySelector('.map');
  var mapFaded = 'map--faded';
  var mapFilteresContainer = map.querySelector('.map__filters-container');
  var mapFilteres = map.querySelector('.map__filters');
  var filtersAll = mapFilteres.querySelectorAll('select');
  var featuresAll = Array.from(mapFilteres.querySelectorAll('.map__checkbox'));
  var MAP_BEGIN_HEIGHT = 130;
  var MAP_END_HEIGHT = 630;
  var mapWidth = mapElement.offsetWidth - window.keksobooking.pin.WIDTH;
  var mapBeginHeight = MAP_BEGIN_HEIGHT - window.keksobooking.pin.HEIGHT;
  var mapEndHeight = MAP_END_HEIGHT - window.keksobooking.pin.HEIGHT;
  var filteres = Array.from(filtersAll).concat(featuresAll);
  var typeFilter = filteres[0];
  var priceFilter = filteres[1];
  var roomFilteres = filteres[2];
  var guestsFilteres = filteres[3];

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
    window.keksobooking.card.closeCard();
    var pins = window.keksobooking.map.mapBlock.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.keksobooking.pin.deletePins(pins);
    var filteredAds = window.keksobooking.data.ads.filter(function (ad) {
      var isType = typeFilter.value === 'any' || ad.offer.type === typeFilter.value;
      var isPrice = switchPrice(priceFilter.value, parseInt(ad.offer.price, 10));
      var isRoomNumber = roomFilteres.value === 'any' || ad.offer.rooms === parseInt(roomFilteres.value, 10);
      var isGuestsNumber = guestsFilteres.value === 'any' || ad.offer.guests === parseInt(guestsFilteres.value, 10);
      var isFeatures = isFeaturesExist(ad.offer.features, checkedFeatures(featuresAll));

      return isType && isPrice && isRoomNumber && isGuestsNumber && isFeatures;
    });
    var fiveFilterAds = window.keksobooking.utils.cropArrayToFiveElements(filteredAds);
    window.keksobooking.pin.createDomElements(fiveFilterAds);
    pins = window.keksobooking.map.mapBlock.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.keksobooking.pin.showCardsOfSelectedPin(pins);
  }

  function isFeaturesExist(adFeatures, selectedFeatures) {
    if (selectedFeatures.length === 0) {
      return true;
    }
    return selectedFeatures.every(function (selectedFeature) {
      return adFeatures.includes(selectedFeature);
    });
  }

  function checkedFeatures(features) {
    return features.filter(function (element) {
      return element.checked;
    }).map(function (element) {
      return element.value;
    });
  }

  function switchPrice(price, x) {
    switch (price) {
      case 'any':
        return true;
      case 'middle':
        return x >= 10000 && x <= 50000;
      case 'low':
        return x < 10000;
      case 'high':
        return x > 50000;
      default: return false;
    }
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
