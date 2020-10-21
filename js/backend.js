'use strict';

(() => {
  const URL = {
    download: `https://21.javascript.pages.academy/keksobooking/data`,
    upload: `https://21.javascript.pages.academy/keksobooking`
  };

  const TIMEOUT = 10000;
  const StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
  };

  const download = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      let error;
      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
          break;
        case StatusCode.BAD_REQUEST:
          error = `Неверный запрос`;
          break;
        case StatusCode.NOT_FOUND:
          error = `Ничего не найдено`;
          break;
        default:
          error = `Cтатус ответа: : ${xhr.status} ${xhr.statusText}`;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения с сервером`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT;

    xhr.open(`GET`, URL.download);
    xhr.send();
  };

  const upload = (data, onUploadSucces, onUploadError) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData(data);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onUploadSucces(data);
      } else {
        onUploadError(xhr.status);
      }
    });

    xhr.addEventListener(`error`, () => {
      onUploadError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onUploadError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT;

    xhr.open(`POST`, URL.upload);
    xhr.send(formData);
  };

  window.backend = {
    download: download,
    upload: upload
  };
})();
