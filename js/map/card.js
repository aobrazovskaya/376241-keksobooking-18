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
    cardCapacity.textContent = currentCard.offer.rooms + ' комнаты для ' + currentCard.offer.guests + ' гостей';
    var cardTime = newCard.querySelector('.popup__text--time');
    cardTime.textContent = 'Заезд после ' + currentCard.offer.checkin + ', выезд до ' + currentCard.offer.checkout;
    var cardFeatures = newCard.querySelector('.popup__features');
    cardFeatures.replaceWith(window.selectFeatures(currentCard.offer.features, cardFeatures));
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

  window.showCardElement = function (evt) {
    var targetImg = evt.target.querySelector('img') || evt.target;
    var currentPin = targetImg.getAttribute('src');
    for (var i = 0; i < window.ads.length; i++) {
      if (currentPin === window.ads[i].author.avatar) {
        var mapCard = document.querySelector('.map__card.popup');
        if (mapCard !== null) {
          mapCard.replaceWith(createCardElement(window.ads[i]));
        } else {
          window.mapFilteresContainer.insertAdjacentElement('beforebegin', createCardElement(window.ads[i]));
        }
        var cardCloseElement = document.querySelector('.popup__close');
        cardCloseElement.addEventListener('click', closeCard);
        break;
      }
    }
  };

  function closeCard() {
    var mapCard = document.querySelector('.map__card.popup');
    window.changeElementDisplay(mapCard, 'none');
  }

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      closeCard();
    }
  });
})();
