'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500; // ms

  /**
   * @param {HTMLElement} element
   */
  function show(element) {
    element.classList.remove('hidden');
  }

  /**
   * @param {HTMLElement} element
   */
  function hide(element) {
    element.classList.add('hidden');
  }

  /**
   * The debounce function allows you to make sure that
   * when switching the filter, the list of items matching
   * the filters is updated no more than once every half a second.
   * @param {function} cb
   * @return {function}
   */
  function debounce(cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }

  function uploadFile(fileChooser, loadImg) {
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
  }

  window.keksobooking = {};

  window.keksobooking.utils = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    show: show,
    hide: hide,
    debounce: debounce,
    uploadFile: uploadFile
  };

})();
