'use strict';

(() => {

  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  const avatarChooser = window.main.adForm.querySelector(`.ad-form-header__input`);
  const avatarPreview = window.main.adForm.querySelector(`.ad-form-header__preview img`);
  const photoChooser = window.main.adForm.querySelector(`.ad-form__input`);
  const advertPhoto = window.main.adForm.querySelector(`.ad-form__photo`);

  const onInputChange = (evt) => {
    const fileChooser = evt.target;
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((expansion) => {
      return fileName.endsWith(expansion);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, function () {
        switch (fileChooser) {
          case avatarChooser:
            avatarPreview.src = reader.result;
            break;
          case photoChooser:
            const advertPreview = document.createElement(`img`);
            advertPreview.src = reader.result;
            advertPreview.style.maxWidth = `70px`;
            advertPreview.style.maxHeight = `70px`;
            advertPhoto.appendChild(advertPreview);
            break;
        }
      });
      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener(`change`, onInputChange);
  photoChooser.addEventListener(`change`, onInputChange);

  window.uploadPhoto = {
    avatar: avatarPreview,
    advertImage: advertPhoto
  };
})();
