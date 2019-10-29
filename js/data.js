'use strict';

(function () {

  var onError = function () {
    var errorElement = document.querySelector('#error');
    document.querySelector('main').appendChild(errorElement.content);
  };

  var onSuccess = function (data) {
    window.data = {
      ads: data
    };
    window.pin.createDomElements(data);
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.pin.showCardsOfSelectedPin(mapPins);
  };

  window.data = {
    getAds: function () {
      window.upload('https://js.dump.academy/keksobooking/data', onSuccess, onError);
    }
  };
}());
