'use strict';

(function () {

  window.keksobooking.form = {
    makeAvailable: makeFormAvailable,
    setPinAddress: setPinAddress,
    runModule: runModule
  };

  function runModule() {
    setFormInitialPropertiesAndEvents();
    makeSuccessPopup();
    makeErrorPopup();
    document.querySelector('.ad-form__reset').addEventListener('click', function () {
      makeAllPageInactive();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.keksobooking.utils.ESC_KEYCODE) {
        hideSuccessPopup();
        hideErrorPopup();
      }
    });
  }

  var formElement = document.querySelector('.ad-form');
  var formFieldsets = formElement.querySelectorAll('fieldset');
  var formAddress = formElement.querySelector('#address');
  var formCapacity = formElement.querySelector('#capacity');
  var formType = formElement.querySelector('#type');
  var formPrice = formElement.querySelector('#price');
  var formTimeIn = formElement.querySelector('#timein');
  var formTimeOut = formElement.querySelector('#timeout');
  var mainBlock = document.querySelector('main');
  var successTemplate = document.querySelector('#success');
  var successElement = successTemplate.cloneNode(true).content.querySelector('.success');
  var errorTemplate = document.querySelector('#error');
  var errorElement = errorTemplate.cloneNode(true).content.querySelector('.error');

  function submitForm(evt) {
    evt.preventDefault();

    var formData = new FormData(formElement);
    var requestInfo = {
      method: 'POST',
      url: 'https://js.dump.academy/keksobooking',
      data: formData
    };
    window.keksobooking.makehttprequest(requestInfo, onSuccess, onError);
  }

  function setFormInitialPropertiesAndEvents() {
    makeFormElDisabled(window.keksobooking.map.Filteres, 'map__filters');
    makeFormElementsDisabled(formFieldsets);
    setPriceRequirements();
    window.keksobooking.map.setFilteresDisabled(true);
    formElement.querySelector('.ad-form__submit').addEventListener('click', validateCapacity);
    formElement.addEventListener('submit', submitForm);
    formType.addEventListener('change', setPriceRequirements);
    formTimeIn.addEventListener('change', synchronizeTime);
    formTimeOut.addEventListener('change', synchronizeTime);
  }

  function makeSuccessPopup() {
    mainBlock.appendChild(successElement);
    hideSuccessPopup();
    successElement.addEventListener('click', hideSuccessPopup);
  }

  function makeErrorPopup() {
    mainBlock.appendChild(errorElement);
    hideErrorPopup();
    errorElement.addEventListener('click', hideErrorPopup);
  }


  function hideSuccessPopup() {
    window.keksobooking.utils.changeElementDisplay(successElement, 'none');
  }

  function hideErrorPopup() {
    window.keksobooking.utils.changeElementDisplay(errorElement, 'none');
  }

  var onError = function () {
    window.keksobooking.utils.changeElementDisplay(errorElement, 'block');
  };

  function onSuccess() {
    makeAllPageInactive();
    window.keksobooking.utils.changeElementDisplay(successElement, 'block');
    formElement.reset();
  }

  function makeAllPageInactive() {
    var pins = window.keksobooking.map.mapBlock.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.keksobooking.map.setMapFaded();
    window.keksobooking.map.setFilteresDisabled(true);
    makeFormElDisabled(window.keksobooking.map.Filteres, 'map__filters');
    makeFormElDisabled(formElement, 'ad-form');
    makeFormElementsDisabled(formFieldsets);
    window.keksobooking.pin.deletePins(pins);
    window.keksobooking.pin.setMainCoords();
    setPinAddress(window.keksobooking.pin.Main);
    var cardElement = document.querySelector('.map__card.popup');
    if (cardElement) {
      cardElement.remove();
    }
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

  function synchronizeTime(evt) {
    if (evt.target === formTimeIn) {
      formTimeOut.value = formTimeIn.value;
    } else {
      formTimeIn.value = formTimeOut.value;
    }
  }

  /**
   * Remove attributes and modifiers that are disabled in the form.
   */
  function makeFormAvailable() {
    makeFormElAvailable(window.keksobooking.map.Filteres, 'map__filters');
    makeFormElementsAvailable(formFieldsets);
    makeFormElAvailable(formElement, 'ad-form');
  }

  /**
    * @param {HTMLElement} pin template clone of pin
    */
  function setPinAddress(pin) {
    var address = (pin.offsetLeft + window.keksobooking.pin.MAIN_PIN_WIDTH / 2) + ', ' + (pin.offsetTop + window.keksobooking.pin.MAIN_PIN_HEIGHT);
    formAddress.value = address;
  }

})();
