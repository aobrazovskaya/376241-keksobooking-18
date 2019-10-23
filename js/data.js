'use strict';

(function () {
  var TITLES = ['Милая квартирка недалеко от метро', 'Квартира недорого', 'Квартира в Токио'];
  var FLAT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MAX_ROOM_COUNT = 10;
  var MAX_GUESTS_COUNT = 20;
  var ADS_COUNT = 8;
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var mapWidth = document.querySelector('.map').offsetWidth - PIN_WIDTH;
  var MAP_BEGIN_HEIGHT = 130 - PIN_HEIGHT;
  var MAP_END_HEIGHT = 630 - PIN_HEIGHT;
  window.ads = createAds();

  /**
   * @param {number} min
   * @param {number} max
   * @return {number}
   */
  function getRandomNumberInTheRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * @param {array} array
   * @return {array} with random elements
   */
  function shortenArrayRandomly(array) {
    var arr = [];
    for (var i = 0; i < array.length; i++) {
      var isRandomNumber = getRandomNumberInTheRange(0, 2);
      if (isRandomNumber) {
        arr.push(array[i]);
      }
    }
    return arr;
  }

  /**
   * @typedef {{author: {
    avatar: String
  },
    offer: {
      title: Array,
      address: String,
      price: Number,
      type: Array,
      rooms: Number,
      guests: Number,
      checkin: String,
      checkout: String,
      features: Array,
      description: String,
      PHOTOS: Array
    },

    location: {
      x: Number,
      y: Number
  }
  }} ad
  */

  /**
   * Create array of js objects of ads.
   * @return {ad[]}
   */
  function createAds() {
    var newAds = [];

    for (var i = 0; i < ADS_COUNT; i++) {
      var avatar = 'img/avatars/user0' + (i + 1) + '.png';
      var title = TITLES[getRandomNumberInTheRange(0, TITLES.length)];
      var location = {
        x: getRandomNumberInTheRange(0, mapWidth),
        y: getRandomNumberInTheRange(MAP_BEGIN_HEIGHT, MAP_END_HEIGHT)
      };
      var address = location.x + ', ' + location.y;

      var ad = {
        author: {
          avatar: avatar
        },

        offer: {
          title: title,
          address: address,
          price: getRandomNumberInTheRange(50, 1000),
          type: FLAT_TYPES[getRandomNumberInTheRange(0, FLAT_TYPES.length)],
          rooms: getRandomNumberInTheRange(1, MAX_ROOM_COUNT),
          guests: getRandomNumberInTheRange(1, MAX_GUESTS_COUNT),
          checkin: CHECKINS[getRandomNumberInTheRange(0, CHECKINS.length)],
          checkout: CHECKINS[getRandomNumberInTheRange(0, CHECKINS.length)],
          features: shortenArrayRandomly(FEATURES),
          description: title + ' по адресу: ' + address,
          PHOTOS: shortenArrayRandomly(PHOTOS),
        },

        location: {
          x: location.x,
          y: location.y,
        }
      };
      newAds.push(ad);
    }
    return newAds;
  }
})();
