var adsNumbers = 8;
var mapElement = document.querySelector('.map');
var mapWidth = mapElement.offsetWidth;
var MAP_BEGIN_HEIGHT = 130;
var MAP_END_HEIGHT = 630;
var titleArray = ['Милая квартирка недалеко от метро', 'Квартира недорого', 'Квартира в Токио'];
var flatTypes = ['palace','flat','house','bungalo'];
var checkins = ['12:00','13:00','14:00'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var maxNumbderOfRooms = 10;
var maxNumberOfGuests = 20;

var createAds = function () {
  var ads = [];
  
  for (var i = 0; i < adsNumbers; i++) {
    var title = titleArray[getRandomNumberInTheRange(0, titleArray.length)];
    var avatar = 'img/avatars/user0' + getRandomNumberInTheRange(1, 8) + '.png';
    var location = {
      x: getRandomNumberInTheRange(0, mapWidth),
      y: getRandomNumberInTheRange(MAP_BEGIN_HEIGHT, MAP_END_HEIGHT)
    };
    var address = location.x + ', ' + location.y;

    var ad = {
      author: {
        avatar: avatar,
      },
      
      offer: {
        title: title,
        address: address,
        price: getRandomNumberInTheRange(50, 1000),
        type: flatTypes[getRandomNumberInTheRange(0, flatTypes.length)],
        rooms: getRandomNumberInTheRange(1, maxNumbderOfRooms),
        guests: getRandomNumberInTheRange(1, maxNumberOfGuests),
        checkin: checkins[getRandomNumberInTheRange(0, checkins.length)],
        checkout: checkins[getRandomNumberInTheRange(0, checkins.length)],
        features: getRandomQuantity(featuresArr),
        description: title + ' по адресу: ' + address,
        photos: getRandomQuantity(photos),
      },
      
      location: {
        x: location.x,
        y: location.y,
      }
    }
  ads.push(ad);
  }
  return ads;
};

/**
 * @param {number} min min value
 * @param {number} max max value
 * @return {number}
 */
function getRandomNumberInTheRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

function getRandomQuantity(array) {
  var arr = [];
  for (var i = 0; i < array.length; i++) {
    var isRandomNumber = getRandomNumberInTheRange(0, 2);
    if (isRandomNumber) {
      arr.push(array[i]);
    }
  }
  return arr;
};

var mapStatus = document.querySelector('.map');
mapStatus.classList.remove('map--faded');