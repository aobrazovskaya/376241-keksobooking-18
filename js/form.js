'use strict';

(function () {

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
    window.keksobooking.makeHttpRequest(requestInfo, onSuccess, onError);
  }

  function setFormInitialPropertiesAndEvents() {
    makeFormElDisabled(window.keksobooking.map.filteres, 'map__filters');
    window.keksobooking.map.setFilteresDisabledStatus(true);
    setPriceRequirements();
    formElement.querySelector('.ad-form__submit').addEventListener('click', validateCapacity);
    formElement.addEventListener('submit', submitForm);
    formType.addEventListener('change', setPriceRequirements);
    formTimeIn.addEventListener('change', synchronizeTime);
    formTimeOut.addEventListener('change', synchronizeTime);
  }

  function hidePopup(element, cb) {
    window.keksobooking.utils.hide(element);
    element.removeEventListener('click', cb);
  }

  function hideSuccessPopup() {
    hidePopup(successElement, hideSuccessPopup);
  }

  function hideErrorPopup() {
    hidePopup(errorElement, hideErrorPopup);
  }

  function onError() {
    mainBlock.appendChild(errorElement);
    window.keksobooking.utils.show(errorElement);
    errorElement.addEventListener('click', hideErrorPopup);
  }

  function onSuccess() {
    mainBlock.appendChild(successElement);
    makeAllPageInactive();
    window.keksobooking.utils.show(successElement);
    successElement.addEventListener('click', hideSuccessPopup);
  }

  function makeAllPageInactive() {
    window.keksobooking.map.setMapDisabled();
    setFiltersDisabled();
    setFormDisabled();
  }

  function setFormDisabled() {
    formElement.reset();
    formElement.classList.add('ad-form--disabled');
    window.keksobooking.avatarphoto.makeImgDefault();
    window.keksobooking.formImages.removeImages();
  }

  function setFiltersDisabled() {
    window.keksobooking.map.filteres.reset();
    window.keksobooking.map.filteres.classList.add('map__filters--disabled');
    window.keksobooking.map.setFilteresDisabledStatus(true);
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
      formPrice.min = 0;
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
    makeFormElAvailable(window.keksobooking.map.filteres, 'map__filters');
    makeFormElAvailable(formElement, 'ad-form');
  }

  /**
    * @param {HTMLElement} pin template clone of pin
    */
  function setPinAddress(pin) {
    var x = pin.offsetLeft + window.keksobooking.pin.MAIN_PIN_WIDTH / 2;
    var y = pin.offsetTop + window.keksobooking.pin.MAIN_PIN_HEIGHT;
    formAddress.value = x + ', ' + y;
  }

  /**
    * @param {HTMLElement} pin template clone of pin
    */
  function setInitPinAddress() {
    var MAIN_PIN_HEIGHT = window.keksobooking.pin.MAIN_PIN_WIDTH;
    var x = window.keksobooking.pin.main.offsetLeft + window.keksobooking.pin.MAIN_PIN_WIDTH / 2;
    var y = window.keksobooking.pin.main.offsetTop + MAIN_PIN_HEIGHT / 2;
    formAddress.value = x + ', ' + y;
  }

  function runModule() {
    setInitPinAddress();
    setFormInitialPropertiesAndEvents();

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

  window.keksobooking.form = {
    makeAvailable: makeFormAvailable,
    makeAllPageInactive: makeAllPageInactive,
    setPinAddress: setPinAddress,
    fieldsets: formFieldsets,
    onError: onError,
    setInitPinAddress: setInitPinAddress,
    runModule: runModule
  };

})();
