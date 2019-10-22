'use strict';

function closeCard() {
  var mapCard = document.querySelector('.map__card.popup');
  changeElementDisplay(mapCard, 'none');
}


document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeCard();
  }
});

for (var i = 0; i < mapPins.length; i++) {
  mapPins[i].addEventListener('click', showCardElement);

  mapPins[i].addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      showCardElement(evt);
    }
  });
}
