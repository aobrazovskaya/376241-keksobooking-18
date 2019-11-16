'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var preview = document.querySelector('.ad-form__photo');
  preview.style.display = 'contents';
  var IMAGE_SIZE = 70;

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        new Image(reader.result).createImageElem();
      });

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  });

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

})();
