var adsNumbers = 8;
var mapElement = document.querySelector('.map');
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var mapWidth = mapElement.offsetWidth - PIN_WIDTH;
var MAP_BEGIN_HEIGHT = 130 - PIN_HEIGHT;
var MAP_END_HEIGHT = 630 - PIN_HEIGHT;
var titleArray = ['Милая квартирка недалеко от метро', 'Квартира недорого', 'Квартира в Токио'];
var flatTypes = ['palace','flat','house','bungalo'];
var checkins = ['12:00','13:00','14:00'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var maxNumbderOfRooms = 10;
var maxNumberOfGuests = 20;

/**
 * Create array of js objects of ads.
 * @return {array} array of ads objects
 */
var createAds = function () {
  var ads = [];
  
  for (var i = 0; i < adsNumbers; i++) {
    var avatar = 'img/avatars/user0' + (i + 1) + '.png';
    var title = titleArray[getRandomNumberInTheRange(0, titleArray.length)];
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

/**
 * Get random quantity of array elements.
 * @param {array} array array
 * @return {array} array with random elements
 */
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

/**
 * Add DOM elements to HTML doc. 
 * @param {array} arr array of js elements
 * @return {object} fragment of DOM elements
 */
function createDOMElements(arr) {
  var fragment = document.createDocumentFragment();
  
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createPinElement(arr[i]));
  }
  return fragment;
}

/**
 * Set different values for some properties of users' objects.
 * @param {object} user user object
 * @return {object} user object with new values
 */
function createPinElement(user) {
  var element = pinTemplate.cloneNode(true);

  element.style = 'left: ' + (user.location.x + PIN_WIDTH / 2) + 'px; top: ' + (user.location.y + PIN_HEIGHT) + 'px;';
  element.children[0].src = user.author.avatar;
  element.children[0].alt = user.offer.title;
  
  return element;
}

var mapStatus = document.querySelector('.map');
mapStatus.classList.remove('map--faded');

var ads = createAds();
var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var mapPins = document.querySelector('.map__pins');
var pinElements = createDOMElements(ads);
mapPins.appendChild(pinElements);
