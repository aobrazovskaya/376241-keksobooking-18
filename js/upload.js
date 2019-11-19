'use strict';
(function () {

  window.keksobooking.uploadFile = function (fileChooser, loadImg) {
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        loadImg(file);
      }
    });
  };

})();
