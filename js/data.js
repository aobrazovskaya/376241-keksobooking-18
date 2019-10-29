'use strict';

(function () {

  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    console.log(data);
    window.adsData = data;
  };

  window.upload('https://js.dump.academy/keksobooking/data', onSuccess, onError);
}());
