'use strict';

(function () {

  var requestInfo = {
    method: 'GET',
    url: 'https://js.dump.academy/keksobooking/data',
  };

  var onError = function () {
    var errorElement = document.querySelector('#error');
    document.querySelector('main').appendChild(errorElement.content);
  };

  var onSuccess = function (data) {
    window.keksobooking.data.ads = data;
    window.keksobooking.pin.createDomElements(data);
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.keksobooking.pin.showCardsOfSelectedPin(mapPins);
  };

  /**
   * A complete list of similar ads is loaded after the page is in an active state.
   */
  function getAds() {
    window.keksobooking.makehttprequest(requestInfo, onSuccess, onError);
  }

  window.keksobooking.data = {
    getAds: getAds
  };

}());
