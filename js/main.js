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
var ESC_KEYCODE = 27;

var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var mapPinsBlock = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapFilteresContainer = map.querySelector('.map__filters-container');
var mapFilteres = map.querySelector('.map__filters');
var formElement = document.querySelector('.ad-form');
var formFieldsets = formElement.querySelectorAll('fieldset');
var pinMain = document.querySelector('.map__pin--main');
var formAddress = formElement.querySelector('#address');
var formCapacity = formElement.querySelector('#capacity');

var ads = createAds();
var pinElements = createDomElements(ads);
var mapFaded = 'map--faded';

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

/**
 * Turn status of the map in active.
 * @param {HTMLElement} element map
 */
function setMapNotFaded() {
  map.classList.remove('map--faded');
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
 */
function setPinAddress(pin) {
  var address = (pin.offsetLeft + PIN_WIDTH / 2) + ', ' + (pin.offsetTop + PIN_HEIGHT);
  formAddress.value = address;
}

/**
 * Remove attributes and modifiers that are disabled in the form.
 */
function makeFormAvailable() {
  makeFormElAvailable(mapFilteres, 'map__filters');
  makeFormElementsAvailable(formFieldsets);
  makeFormElAvailable(formElement, 'ad-form');
}

/**
 * Change value of display property of HTML Element.
 * @param {HTMLElement} element
 * @param {String} displayValue value of display property
 */
function changeElementDisplay(element, displayValue) {
  element.style.display = displayValue;
}

/**
 * Show all elements of capacity list
 * @param {array} elements
 */
function showAllElements(elements) {
  for (var i = 0; i < elements.length; i++) {
    changeElementDisplay(elements[i], 'block');
  }
}

/**
 * Make all pins invisible, excepting main pin.
 * @param {array} elements
 */
function hideAllElements(elements) {
  for (var i = 0; i < elements.length; i++) {
    changeElementDisplay(elements[i], 'none');
  }
}

function createCardElements(adElements) {
  var cardElements = [];
  for (var i = 0; i < adElements.length; i++) {
    cardElements.push(createCardElement(adElements[i]));
  }
  return cardElements;
}

var newCardElements = createCardElements(ads);

/**
 * Show Card of ad.
 */
function showCardElement() {
  mapFilteresContainer.insertAdjacentElement('beforebegin', newCardElements[0]);
}

/**
 * The Number of rooms field is synchronized with the capacity field.
 */
function validateCapacity() {
  var roomsValue = document.querySelector('#room_number').value;
  var guestsValue = document.querySelector('#capacity').value;
  var isCorrectForOneRoom = roomsValue === '1' && guestsValue === '1';
  var isCorrectForTwoRooms = roomsValue === '2' && (guestsValue === '1' || guestsValue === '2');
  var isCorrectForThreeRooms = roomsValue === '3' && (guestsValue === '1' || guestsValue === '2' || guestsValue === '3');
  var isCorrectForManyRooms = roomsValue === '100' && guestsValue === '0';

  if (!isCorrectForOneRoom && !isCorrectForTwoRooms && !isCorrectForThreeRooms && !isCorrectForManyRooms) {
    formCapacity.setCustomValidity('Неправильно выбрано кол-во гостей');
  } else {
    formCapacity.setCustomValidity('');
  }
}

mapPinsBlock.appendChild(pinElements);
map.classList.add(mapFaded);
makeFormElDisabled(mapFilteres, 'map__filters');
makeFormElementsDisabled(formFieldsets);
var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
hideAllElements(mapPins);

pinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    setMapNotFaded();
    makeFormAvailable();
    showAllElements(mapPins);
    setPinAddress(pinMain);
  }
});

pinMain.addEventListener('mousedown', function () {
  setMapNotFaded();
  makeFormAvailable();
  showAllElements(mapPins);
  setPinAddress(pinMain);
});

document.querySelector('.ad-form__submit').addEventListener('click', validateCapacity);


var cardCloseElement = newCardElements[0].querySelector('.popup__close');

function closeCard() {
  changeElementDisplay(newCardElements[0], 'none');
}

function showCard() {
  showCardElement();
  changeElementDisplay(newCardElements[0], 'block');
}

cardCloseElement.addEventListener('click', closeCard);

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeCard();
  }
});

for (var i = 0; i < mapPins.length; i++) {
  mapPins[i].addEventListener('click', showCard);

  mapPins[i].addEventListener('click', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      showCard();
    }
  });
}

var formType = formElement.querySelector('#type');
var formPrice = formElement.querySelector('#price');
setPriceRequirements();
formType.addEventListener('change', setPriceRequirements);

/**
 * Change placeholder and min value of price depending of type value.
 */
function setPriceRequirements() {
  if (formType.value === 'bungalo') {
    formPrice.placeholder = 0;
  } else if (formType.value === 'flat') {
    formPrice.placeholder = 1000;
    formPrice.min = 1000;
  } else if (formType.value === 'house') {
    formPrice.placeholder = 5000;
    formPrice.min = 5000;
  } else if (formType.value === 'palace') {
    formPrice.placeholder = 10000;
    formPrice.min = 10000;
  }
}

var formTimeIn = formElement.querySelector('#timein');
var formTimeOut = formElement.querySelector('#timeout');
formTimeIn.addEventListener('change', synchronizeTime);
formTimeOut.addEventListener('change', synchronizeTime);

function synchronizeTime(evt) {
  if (evt.target === formTimeIn) {
    formTimeOut.value = formTimeIn.value;
  } else {
    formTimeIn.value = formTimeOut.value;
  }
}
