'use strict';

var ADS_COUNT = 8;
var mapElement = document.querySelector('.map');
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var mapWidth = mapElement.offsetWidth - PIN_WIDTH;
var MAP_BEGIN_HEIGHT = 130 - PIN_HEIGHT;
var MAP_END_HEIGHT = 630 - PIN_HEIGHT;
var TITLES = ['Милая квартирка недалеко от метро', 'Квартира недорого', 'Квартира в Токио'];
var FLAT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAX_ROOM_COUNT = 10;
var MAX_GUESTS_COUNT = 20;
var ads = [];

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
var createAds = function () {

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
    ads.push(ad);
  }
  return ads;
};

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
 * Add DOM elements to HTML doc.
 * @param {array} arr array of js elements
 * @return {object} fragment of DOM elements
 */
function createDomElements(arr) {
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

/**
 * 
 * @param {*} user 
 */
function createCardElement(user) {
  var element = cardTemplate.cloneNode(true);

  var cardTitle = element.querySelector('.popup__title');
  cardTitle.textContent = user.offer.title;
  var cardAddress = element.querySelector('.popup__text--address');
  cardAddress.textContent = user.offer.address;
  var cardPrice = element.querySelector('.popup__text--price');
  cardPrice.textContent = user.offer.price + '₽/ночь';
  var cardType = element.querySelector('.popup__type');
  cardType.textContent = determineType(user.offer.type);
  var cardCapacity = element.querySelector('.popup__text--capacity');
  cardCapacity.textContent = user.offer.rooms + ' комнаты для ' + user.offer.guests + ' гостей';
  var cardTime = element.querySelector('.popup__text--time');
  cardTime.textContent = 'Заезд после ' + user.offer.checkin + ', выезд до ' + user.offer.checkout;
  var cardFeatures = element.querySelector('.popup__features');
  cardFeatures.replaceWith(selectFeatures(user.offer.features, cardFeatures));

  var cardDescription = element.querySelector('.popup__description');
  cardDescription.textContent = user.offer.description;
  var cardAvatar = element.querySelector('.popup__avatar');
  cardAvatar.src = user.author.avatar;
  
  return element;
}

function selectFeatures(featuresList, listElement) {
  var currentFeaturesList = listElement.cloneNode(true);
  var featuresListNew = listElement.cloneNode(false);
  for (var i = 0; i < featuresList.length; i++) {
    var currentElement = currentFeaturesList.querySelector('.popup__feature--' + featuresList[i]);
    featuresListNew.appendChild(currentElement); 
  }
  return featuresListNew;
}

/**
 * 
 * @param {*} type 
 */
function determineType(type) {
  switch (type) {
    case 'flat': return 'Квартира';
    case 'bungalo': return 'Бунгало';
    case 'house': return 'Дом';
    case 'palace': return 'Дворец';
    default: return '';
  } 
}

var mapStatus = document.querySelector('.map');
mapStatus.classList.remove('map--faded');

var ads = createAds();
var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var mapPins = document.querySelector('.map__pins');
var pinElements = createDomElements(ads);
mapPins.appendChild(pinElements);

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var cardElement = createCardElement(ads[0]);
