'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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
    setCappacity(currentCard, cardCapacity);
    var cardTime = newCard.querySelector('.popup__text--time');
    setTime(currentCard, cardTime);
    var cardFeatures = newCard.querySelector('.popup__features');
    setFeatures(currentCard, cardFeatures);
    var cardDescription = newCard.querySelector('.popup__description');
    setDescription(currentCard, cardDescription);
    var cardPhotos = newCard.querySelector('.popup__photos');
    setPhotos(currentCard, cardPhotos);
    var cardAvatar = newCard.querySelector('.popup__avatar');
    cardAvatar.src = currentCard.author.avatar;
    return newCard;
  }

  function setCappacity(currentCard, cardCapacity) {
    if (!!currentCard.offer.rooms || !!currentCard.offer.guests) {
      cardCapacity.textContent = currentCard.offer.rooms + ' комнаты для ' + currentCard.offer.guests + ' гостей';
    } else {
      cardCapacity.textContent = '';
    }
  }

  function setDescription(currentCard, cardDescription) {
    if (currentCard.offer.description) {
      cardDescription.textContent = currentCard.offer.description;
    } else {
      cardDescription.textContent = '';
    }
  }

  function setTime(currentCard, cardTime) {
    if (currentCard.offer.checkin === '0:00' || currentCard.offer.checkout === '0:00') {
      cardTime.textContent = '';
    } else {
      cardTime.textContent = 'Заезд после ' + currentCard.offer.checkin + ', выезд до ' + currentCard.offer.checkout;
    }
  }

  function setFeatures(currentCard, cardFeatures) {
    if (Array.isArray(currentCard.offer.features) && currentCard.offer.features.length > 0) {
      cardFeatures.replaceWith(selectFeatures(currentCard.offer.features, cardFeatures));
    } else {
      window.keksobooking.utils.hide(cardFeatures);
    }
  }

  function setPhotos(currentCard, cardPhotos) {
    if (Array.isArray(currentCard.offer.photos) && currentCard.offer.photos.length > 0) {
      cardPhotos.replaceWith(getPhotosOfAd(currentCard.offer.photos, cardPhotos));
    } else {
      window.keksobooking.utils.hide(cardPhotos);
    }
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
    var featuresListNew = listElement.cloneNode(false);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      var currentElement = listElement.querySelector('.popup__feature--' + features[i]);
      fragment.appendChild(currentElement);
    }
    featuresListNew.appendChild(fragment);
    return featuresListNew;
  }

  function closeCard() {
    var mapCard = document.querySelector('.map__card.popup');
    inactivatePin();
    if (mapCard) {
      window.keksobooking.utils.hide(mapCard);
      mapCard.querySelector('.popup__close').removeEventListener('click', closeCard);
    }
  }

  function showCardElement(evt) {
    var ads = window.keksobooking.data.ads;
    var targetImg = evt.target.querySelector('img') || evt.target;
    var currentPin = targetImg.alt;
    inactivatePin();
    for (var i = 0; i < ads.length; i++) {
      if (currentPin === ads[i].offer.title) {
        var mapCard = document.querySelector('.map__card.popup');
        if (mapCard !== null) {
          mapCard.replaceWith(createCardElement(ads[i]));
        } else {
          window.keksobooking.map.filteresContainer.insertAdjacentElement('beforebegin', createCardElement(ads[i]));
        }
        var cardCloseElement = document.querySelector('.popup__close');
        cardCloseElement.addEventListener('click', closeCard);
        break;
      }
    }

    targetImg.parentElement.classList.add('map__pin--active');
  }

  function inactivatePin() {
    var activePin = window.keksobooking.map.mapElement.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  }

  /**
   * Initialize event listeners for card closing.
   */
  function runModule() {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.keksobooking.utils.ESC_KEYCODE) {
        closeCard();
      }
    });
  }

  window.keksobooking.card = {
    showElement: showCardElement,
    closeCard: closeCard,
    runModule: runModule
  };

})();
