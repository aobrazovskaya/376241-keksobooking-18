'use strict';

(function () {

  window.keksobooking.form = {
    makeFormAvailable: makeFormAvailable,
    setPinAddress: setPinAddress,
    formModule: formModule
  };

  function formModule() {
    makeFormElDisabled(window.keksobooking.map.mapFilteres, 'map__filters');
    makeFormElementsDisabled(formFieldsets);
    setPriceRequirements();
    formElement.querySelector('.ad-form__submit').addEventListener('click', validateCapacity);
    formElement.addEventListener('submit', submitForm);
    formType.addEventListener('change', setPriceRequirements);
    formTimeIn.addEventListener('change', synchronizeTime);
    formTimeOut.addEventListener('change', synchronizeTime);
  }

  var formElement = document.querySelector('.ad-form');
  var formFieldsets = formElement.querySelectorAll('fieldset');
  var formAddress = formElement.querySelector('#address');
  var formCapacity = formElement.querySelector('#capacity');
  var formType = formElement.querySelector('#type');
  var formPrice = formElement.querySelector('#price');
  var formTimeIn = formElement.querySelector('#timein');
  var formTimeOut = formElement.querySelector('#timeout');
  var successTemplate = document.querySelector('#success');
  var successElement = successTemplate.cloneNode(true).content.querySelector('.success');


  function submitForm(evt) {
    evt.preventDefault();

    var formData = new FormData(formElement);
    var requestInfo = {
      method: 'POST',
      url: 'https://js.dump.academy/keksobooking',
      data: formData
    };
    window.keksobooking.upload(requestInfo, onSuccess, onError);
  }

  function hideSuccessPopup() {
    window.keksobooking.utils.changeElementDisplay(successElement, 'none');
  }

  var onError = function () {
    // var errorElement = document.querySelector('#error');
    // document.querySelector('main').appendChild(errorElement.content);
  };

  function onSuccess() {
    var pins = window.keksobooking.map.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.keksobooking.map.mapModule();
    makeFormElDisabled(window.keksobooking.map.mapFilteres, 'map__filters');
    makeFormElementsDisabled(formFieldsets);
    window.keksobooking.pin.deletePins(pins);

    if (!document.querySelector('.success')) {
      document.querySelector('main').appendChild(successElement);
    } else {
      window.keksobooking.utils.changeElementDisplay(successElement, 'block');
    }

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.keksobooking.utils.ESC_KEYCODE) {
        hideSuccessPopup();
      }
    });

    document.addEventListener('click', hideSuccessPopup);
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
    makeFormElAvailable(window.keksobooking.map.mapFilteres, 'map__filters');
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
