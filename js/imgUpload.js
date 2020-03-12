'use strict';

(function () {
  var avatarField = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview');
  var housingPhotoField = document.querySelector('.ad-form__upload input[type=file]');
  var housingPhotoPreview = document.querySelector('.ad-form__photo');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var ImgSize = {
    AVATAR_WIDTH: 40,
    AVATAR_HEIGHT: 44,
    HOUSING_PHOTO_WIDTH: 70,
    HOUSING_PHOTO_HEIGHT: 70
  };

  function avatarChooser() {
    avatarField.addEventListener('change', function () {
      var file = avatarField.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          avatarPreview.querySelector('img').src = reader.result;
          avatarPreview.width = ImgSize.AVATAR_WIDTH;
          avatarPreview.height = ImgSize.AVATAR_HEIGHT;
        });

        reader.readAsDataURL(file);
      }
    });
  }

  function housingPhotoChooser() {
    housingPhotoField.addEventListener('change', function () {
      var file = housingPhotoField.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var housingPhoto = document.createElement('img');
          housingPhoto.src = reader.result;
          housingPhoto.width = ImgSize.HOUSING_PHOTO_WIDTH;
          housingPhoto.height = ImgSize.HOUSING_PHOTO_HEIGHT;
          housingPhotoPreview.appendChild(housingPhoto);
        });

        reader.readAsDataURL(file);
      }
    });
  }

  window.imgUpload = {
    avatarChooser: avatarChooser,
    avatarField: avatarField,
    housingPhotoChooser: housingPhotoChooser,
    housingPhotoField: housingPhotoField
  };
})();
