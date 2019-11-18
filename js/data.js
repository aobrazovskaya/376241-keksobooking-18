'use strict';

(function () {

  var requestInfo = {
    method: 'GET',
    url: 'https://js.dump.academy/keksobooking/data',
  };

  function onError() {
    window.keksobooking.form.onError();
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
  function loadAds() {
    window.keksobooking.makeHttpRequest(requestInfo, onSuccess, onError);
  }

  window.keksobooking.data = {
    loadAds: loadAds
  };

}());
