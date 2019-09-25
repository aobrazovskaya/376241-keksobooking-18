var adsNumbers = 8;

var createads = function () {
  var ads = [];
  for (var i = 0; i < adsNumbers; i++) 
  
  var ad = {
    author: {
      avatar: 'img/avatars/user' + imageNumber+ '.png',
    },
    
    // offer: {
    //   title: строка, заголовок предложения
    //   address: строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
    //   price: число, стоимость
    //   type: строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
    //   rooms: число, количество комнат
    //   guests: число, количество гостей, которое можно разместить
    //   checkin: строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
    //   checkout: строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
    //   features: массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
    //   description: строка с описанием,
    //   photos: массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    // },
    
    // location: {
    //   x: случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
    //   y: случайное число, координата y метки на карте от 130 до 630.
    // }
  }
};

var setAvatar = function () {
  for (var i = o; i < adsNumbers; i++) {
    var imageNumber = '0' + i;
    avatar = document.querySelector('.popup__avatar');
    avatar.src = 'img/avatars/user' + imageNumber+ '.png';
  }
};