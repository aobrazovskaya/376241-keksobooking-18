'use strict';

(function () {

  var fileChooser = document.querySelector('.ad-form-header__upload input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview img');
  preview.style.objectFit = 'cover';

  var uploudingFile = window.keksobooking.uploadFile(fileChooser, loadImg);

  function loadImg(file) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      preview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }

  function makeImgDefault() {
    preview.src = 'img/muffin-grey.svg';
  }

  window.keksobooking.avatarphoto = {
    loadImg: loadImg,
    uploudingFile: uploudingFile,
    makeImgDefault: makeImgDefault
  };

})();
