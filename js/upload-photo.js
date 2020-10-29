'use strict';

(() => {

  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  const SIZE = `70`;

  const avatarChooser = window.main.adForm.querySelector(`.ad-form-header__input`);
  const avatarPreview = window.main.adForm.querySelector(`.ad-form-header__preview img`);
  const photoChooser = window.main.adForm.querySelector(`.ad-form__input`);
  const advertPhoto = window.main.adForm.querySelector(`.ad-form__photo`);

  const reset = () => {
    avatarPreview.src = `img/muffin-grey.svg`;
    advertPhoto.innerHTML = ``;
  };

  const onInputChange = (evt) => {
    const fileChooser = evt.target;
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((expansion) => {
      return fileName.endsWith(expansion);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        switch (fileChooser) {
          case avatarChooser:
            avatarPreview.src = reader.result;
            break;
          case photoChooser:
            const advertPreview = document.createElement(`img`);
            advertPreview.src = reader.result;
            advertPreview.style.maxWidth = `${SIZE}px`;
            advertPreview.style.maxHeight = `${SIZE}px`;
            advertPhoto.appendChild(advertPreview);
            break;
        }
      });
      reader.readAsDataURL(file);
    }
  };

  const onAvatarChooserChange = (evt) => {
    onInputChange(evt);
  };

  const onPhotoChooserChange = (evt) => {
    onInputChange(evt);
  };


  avatarChooser.addEventListener(`change`, onAvatarChooserChange);
  photoChooser.addEventListener(`change`, onPhotoChooserChange);

  window.uploadPhoto = {
    reset: reset
  };
})();
