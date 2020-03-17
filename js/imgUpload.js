'use strict';

(function () {

  var FILE_TYPES = ['image/gif', 'image/jpg', 'image/jpeg', 'image/png'];

  var avatarField = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreviewElement = document.querySelector('.ad-form-header__preview');
  var housingPhotoField = document.querySelector('.ad-form__upload input[type=file]');
  var housingPhotoPreviewElement = document.querySelector('.ad-form__photo');

  var ImgSize = {
    AVATAR_WIDTH: 40,
    AVATAR_HEIGHT: 44,
    HOUSING_PHOTO_WIDTH: 70,
    HOUSING_PHOTO_HEIGHT: 70
  };

  function validFileType(file) {
    return FILE_TYPES.includes(file.type);
  }

  function avatarChooser(event) {
    avatarField = event.target;
    var file = avatarField.files[0];
    if (!file) {
      return;
    }

    var matches = validFileType(file);
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreviewElement.querySelector('img').src = reader.result;
        avatarPreviewElement.width = ImgSize.AVATAR_WIDTH;
        avatarPreviewElement.height = ImgSize.AVATAR_HEIGHT;
      });

      reader.readAsDataURL(file);
    }
  }

  function housingPhotoChooser(event) {
    housingPhotoField = event.target;
    var file = housingPhotoField.files[0];

    var matches = validFileType(file);
    if (!file) {
      return;
    }
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var housingPhoto = document.createElement('img');
        housingPhoto.src = reader.result;
        housingPhoto.width = ImgSize.HOUSING_PHOTO_WIDTH;
        housingPhoto.height = ImgSize.HOUSING_PHOTO_HEIGHT;
        housingPhotoPreviewElement.appendChild(housingPhoto);
      });

      reader.readAsDataURL(file);
    }
  }

  function removeUploadedImg() {
    avatarPreviewElement.querySelector('img').src = 'img/muffin-grey.svg';
    housingPhotoPreviewElement.innerHTML = '';
  }

  window.imgUpload = {
    avatarChooser: avatarChooser,
    avatarField: avatarField,
    housingPhotoChooser: housingPhotoChooser,
    housingPhotoField: housingPhotoField,
    removeUploadedImg: removeUploadedImg
  };
})();
