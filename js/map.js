'use strict';

(function () {

  var MAP_BEGIN_HEIGHT = 130;
  var MAP_END_HEIGHT = 630;
  var mapElement = document.querySelector('.map');
  var mapFaded = 'map--faded';
  var mapFilteresContainer = mapElement.querySelector('.map__filters-container');
  var mapFilteres = mapElement.querySelector('.map__filters');
  var filtersAll = mapFilteres.querySelectorAll('select');
  var featuresAll = Array.from(mapFilteres.querySelectorAll('.map__checkbox'));
  var mapWidth = mapElement.offsetWidth - window.keksobooking.pin.WIDTH;
  var mapBeginHeight = MAP_BEGIN_HEIGHT - window.keksobooking.pin.HEIGHT;
  var mapEndHeight = MAP_END_HEIGHT - window.keksobooking.pin.HEIGHT;
  var filteres = Array.from(filtersAll).concat(featuresAll);
  var typeFilter = filteres[0];
  var priceFilter = filteres[1];
  var roomFilteres = filteres[2];
  var guestsFilteres = filteres[3];

  function setMapNotFaded() {
    mapElement.classList.remove('map--faded');
  }

  function setMapFaded() {
    mapElement.classList.add('map--faded');
  }

  function filterAds() {
    var pins = window.keksobooking.map.mapElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.keksobooking.card.closeCard();
    window.keksobooking.pin.deletePins(pins);

    var filteredAds = window.keksobooking.data.ads.filter(function (ad) {
      var isType = typeFilter.value === 'any' || ad.offer.type === typeFilter.value;
      var isPrice = switchPrice(priceFilter.value, parseInt(ad.offer.price, 10));
      var isRoomNumber = roomFilteres.value === 'any' || ad.offer.rooms === parseInt(roomFilteres.value, 10);
      var isGuestsNumber = guestsFilteres.value === 'any' || ad.offer.guests === parseInt(guestsFilteres.value, 10);
      var isFeatures = isFeaturesExist(ad.offer.features, getCheckedFeatures(featuresAll));

      return isType && isPrice && isRoomNumber && isGuestsNumber && isFeatures;
    });

    var fiveFilterAds = window.keksobooking.utils.cropArrayToFiveElements(filteredAds);
    window.keksobooking.pin.createDomElements(fiveFilterAds);
    pins = window.keksobooking.map.mapElement.querySelectorAll('.map__pin:not(.map__pin--main)');
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

  function getCheckedFeatures(features) {
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

  /**
   * @param {boolean} changeTo
   */
  function setFilteresDisabledStatus(changeTo) {
    filteres.forEach(function (element) {
      element.disabled = changeTo;
    });
  }

  function runModule() {
    mapElement.classList.add(mapFaded);

    filteres.forEach(function (element) {
      element.addEventListener('change', window.keksobooking.utils.debounce(filterAds));
    });
  }

  window.keksobooking.map = {
    BEGIN_HEIGHT: MAP_BEGIN_HEIGHT,
    END_HEIGHT: MAP_END_HEIGHT,
    mapElement: mapElement,
    filteresContainer: mapFilteresContainer,
    setFilteresDisabledStatus: setFilteresDisabledStatus,
    filteres: mapFilteres,
    width: mapWidth,
    beginHeight: mapBeginHeight,
    endHeight: mapEndHeight,
    setMapNotFaded: setMapNotFaded,
    setMapFaded: setMapFaded,
    runModule: runModule
  };

})();
