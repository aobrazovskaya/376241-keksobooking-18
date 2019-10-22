'use strict';

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

document.querySelector('.ad-form__submit').addEventListener('click', validateCapacity);

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
