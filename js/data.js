'use strict';

(function () {

  var requestInfo = {
    method: 'GET',
    url: 'https://js.dump.academy/keksobooking/data',
  };

  function onError() {
    window.keksobooking.form.onError();
    window.keksobooking.form.makeAllPageInactive();
  }

  function onSuccess(data) {
    window.keksobooking.data.ads = data;
    if (data) {
      var fiveFirstAds = window.keksobooking.map.cropArrayToFiveElements(data);
      var pinElements = window.keksobooking.pin.createDomElements(fiveFirstAds);
      window.keksobooking.pin.showCardsOfSelectedPin(pinElements);
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
