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
      var title = TITLES[window.utils.getRandomNumberInTheRange(0, TITLES.length)];
      var location = {
        x: window.utils.getRandomNumberInTheRange(0, mapWidth),
        y: window.utils.getRandomNumberInTheRange(MAP_BEGIN_HEIGHT, MAP_END_HEIGHT)
      };
      var address = location.x + ', ' + location.y;

      var ad = {
        author: {
          avatar: avatar
        },

        offer: {
          title: title,
          address: address,
          price: window.utils.getRandomNumberInTheRange(50, 1000),
          type: FLAT_TYPES[window.utils.getRandomNumberInTheRange(0, FLAT_TYPES.length)],
          rooms: window.utils.getRandomNumberInTheRange(1, MAX_ROOM_COUNT),
          guests: window.utils.getRandomNumberInTheRange(1, MAX_GUESTS_COUNT),
          checkin: CHECKINS[window.utils.getRandomNumberInTheRange(0, CHECKINS.length)],
          checkout: CHECKINS[window.utils.getRandomNumberInTheRange(0, CHECKINS.length)],
          features: window.utils.shortenArrayRandomly(FEATURES),
          description: title + ' по адресу: ' + address,
          PHOTOS: window.utils.shortenArrayRandomly(PHOTOS),
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
