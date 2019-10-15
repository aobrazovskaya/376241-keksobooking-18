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
var ENTER_KEYCODE = 13;

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
  var ads = [];

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
 * Set different values for some properties of pin.
 * @param {object} adCard object
 * @return {object} user object with new values
 */
function createPinElement(adCard) {
  var newAdCard = pinTemplate.cloneNode(true);

  newAdCard.style = 'left: ' + (adCard.location.x + PIN_WIDTH / 2) + 'px; top: ' + (adCard.location.y + PIN_HEIGHT) + 'px;';
  newAdCard.children[0].src = adCard.author.avatar;
  newAdCard.children[0].alt = adCard.offer.title;
  return newAdCard;
}

/**
 * Create card of ad's property.
 * @param {ad} currentCard
 * @return {HTMLElement} ad with new properties
 */
function createCardElement(currentCard) {
  var newCard = cardTemplate.cloneNode(true);

  var cardTitle = newCard.querySelector('.popup__title');
  cardTitle.textContent = currentCard.offer.title;
  var cardAddress = newCard.querySelector('.popup__text--address');
  cardAddress.textContent = currentCard.offer.address;
  var cardPrice = newCard.querySelector('.popup__text--price');
  cardPrice.textContent = currentCard.offer.price + '₽/ночь';
  var cardType = newCard.querySelector('.popup__type');
  cardType.textContent = determineType(currentCard.offer.type);
  var cardCapacity = newCard.querySelector('.popup__text--capacity');
  cardCapacity.textContent = currentCard.offer.rooms + ' комнаты для ' + currentCard.offer.guests + ' гостей';
  var cardTime = newCard.querySelector('.popup__text--time');
  cardTime.textContent = 'Заезд после ' + currentCard.offer.checkin + ', выезд до ' + currentCard.offer.checkout;
  var cardFeatures = newCard.querySelector('.popup__features');
  cardFeatures.replaceWith(selectFeatures(currentCard.offer.features, cardFeatures));
  var cardDescription = newCard.querySelector('.popup__description');
  cardDescription.textContent = currentCard.offer.description;
  var cardPhotos = newCard.querySelector('.popup__photos');
  cardPhotos.replaceWith(getPhotosOfAd(currentCard.offer.PHOTOS, cardPhotos));
  var cardAvatar = newCard.querySelector('.popup__avatar');
  cardAvatar.src = currentCard.author.avatar;
  return newCard;
}

/**
 * Create img elements of user's photos.
 * @param {array} photos user's photos
 * @param {HTMLElement} photoListElement HTML element with template of photos
 * @return {HTMLElement} HTML element with new photos
 */
function getPhotosOfAd(photos, photoListElement) {
  var photoListElementNew = photoListElement.cloneNode(false);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var photoElement = photoListElement.children[0].cloneNode(false);
    photoElement.src = photos[i];
    fragment.appendChild(photoElement);
  }
  photoListElementNew.appendChild(fragment);
  return photoListElementNew;
}

/**
 * Chooes correct translation of property of house type.
 * @param {string} type of house
 * @return {string} translation
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

/**
 * Create a new ul list of available features.
 * @param {array} features of current ad
 * @param {HTMLElement} listElement html element of features list
 * @return {HTMLElement} new list
 */
function selectFeatures(features, listElement) {
  var currentFeaturesList = listElement.cloneNode(true);
  var featuresListNew = listElement.cloneNode(false);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var currentElement = currentFeaturesList.querySelector('.popup__feature--' + features[i]);
    fragment.appendChild(currentElement);
  }
  featuresListNew.appendChild(fragment);
  return featuresListNew;
}

var mapStatus = document.querySelector('.map');
setMapStatusNotFaded(mapStatus);

var ads = createAds();
var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var mapPins = document.querySelector('.map__pins');
var pinElements = createDomElements(ads);
mapPins.appendChild(pinElements);

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var cardElement = createCardElement(ads[0]);
var mapFilteresContainer = mapStatus.querySelector('.map__filters-container');
mapFilteresContainer.insertAdjacentElement('beforebegin', cardElement);

var mapFaded = 'map--faded';
mapStatus.classList.add(mapFaded);

var mapFilteres = mapStatus.querySelector('.map__filters');
makeFormElDisabled(mapFilteres, 'map__filters');

var formElement = document.querySelector('.ad-form');
var formFieldsets = formElement.querySelectorAll('fieldset');
var pinMain = document.querySelector('.map__pin--main');
var formAddress = formElement.querySelector('#address');

makeFormElementsDisabled(formFieldsets);
setPinAddress(pinMain);

/**
 * Turn status of the map in active.
 * @param {HTMLElement} element map
 */
function setMapStatusNotFaded(element) {
  element.classList.remove('map--faded');
}

/**
 * @param {HTMLElement} element
 * @param {String} classOfElement
 */
function makeFormElDisabled(element, classOfElement) {
  element.classList.add(classOfElement + '--disabled');
}

/**
 * @param {HTMLElement} element
 * @param {String} classOfElement
 */
function makeFormElAvailable(element, classOfElement) {
  element.classList.remove(classOfElement + '--disabled');
}

/**
 * @param {array} elements
 */
function makeFormElementsDisabled(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = true;
  }
}

/**
 * @param {array} elements
 */
function makeFormElementsAvailable(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = false;
  }
}

/**
 * @param {HTMLElement} pin template clone of pin
 * @param {*} x coordinate of pin
 * @param {*} y coordinate of pin
 */
function setPinAddress(pin) {
  var address = 'left: ' + (pin.offsetLeft + PIN_WIDTH / 2) + 'px; top: ' + (pin.offsetTop + PIN_HEIGHT) + 'px;';
  formAddress.value = address;
}

/**
 * Remove attributes and modifiers that are disabled in the form.
 */
var makeFormAvailable = function () {
  makeFormElAvailable(mapFilteres, 'map__filters');
  makeFormElementsAvailable(formFieldsets);
};

pinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    setMapStatusNotFaded(mapStatus);
  }
});

pinMain.addEventListener('click', function () {
  setMapStatusNotFaded(mapStatus);
});

pinMain.addEventListener('mousedown', function () {
  makeFormAvailable();
  setPinAddress(pinMain);
});

var formRoomsNumber = formElement.querySelector('#room_number');
var formCapacity = formElement.querySelector('#capacity');

