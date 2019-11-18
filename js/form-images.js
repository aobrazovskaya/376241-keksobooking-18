'use strict';

(function () {

  var fileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var preview = document.querySelector('.ad-form__photo');
  preview.style.display = 'contents';
  var IMAGE_SIZE = 70;

  var uploudingFile = window.keksobooking.utils.uploadFile(fileChooser, loadImg);

  function loadImg(file) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      new Image(reader.result).createImageElem();
    });
    reader.readAsDataURL(file);
  }

  function Image(image) {
    this.image = image;

    this.createImageElem = function () {
      var img = document.createElement('img');
      img.setAttribute('width', 'auto');
      img.setAttribute('height', IMAGE_SIZE);
      preview.appendChild(img);
      img.src = this.image;

      return img;
    };
  }

  window.keksobooking.formImages = {
    loadImg: loadImg,
    uploudingFile: uploudingFile
  };

})();
