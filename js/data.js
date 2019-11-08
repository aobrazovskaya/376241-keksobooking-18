'use strict';

(function () {

  var onError = function () {
    var errorElement = document.querySelector('#error');
    document.querySelector('main').appendChild(errorElement.content);
  };

  var onSuccess = function (data) {
    window.keksobooking.data = {
      ads: data
    };
    window.keksobooking.pin.createDomElements(data);
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.keksobooking.pin.showCardsOfSelectedPin(mapPins);
  };

  window.keksobooking.data = {
    getAds: function () {
      window.keksobooking.upload('https://js.dump.academy/keksobooking/data', onSuccess, onError);
    }
  };
}());
