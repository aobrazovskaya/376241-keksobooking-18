'use strict';

(function () {

  var requestInfo = {
    method: 'GET',
    url: 'https://js.dump.academy/keksobooking/data',
  };

  function onError() {
    var errorElement = document.querySelector('#error');
    document.querySelector('main').appendChild(errorElement.content);
    document.querySelector('.error p').addEventListener('click', getAds);
  }

  function onSuccess(data) {
    window.keksobooking.data.ads = data;
    window.keksobooking.pin.createDomElements(data.slice(0, 5));
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.keksobooking.pin.showCardsOfSelectedPin(mapPins);
    if (data) {
      window.keksobooking.map.setFilteresDisabledStatus(false);
    }
  }

  /**
   * A complete list of similar ads is loaded after the page is in an active state.
   */
  function getAds() {
    window.keksobooking.makeHttpRequest(requestInfo, onSuccess, onError);
  }

  window.keksobooking.data = {
    getAds: getAds
  };

}());
