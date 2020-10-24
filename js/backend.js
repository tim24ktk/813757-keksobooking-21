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

  const checkRequest = (method, url, onSuccess, onError, data) => {
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
        case StatusCode.INTERNAL_SERVER_ERROR:
          error = `Внутренняя ошибка сервера`;
          break;
        case StatusCode.SERVICE_UNAVAILABLE:
          error = `Сервис недоступен`;
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

    xhr.open(method, url);

    return method === `GET` ? xhr.send() : xhr.send(data);
  };

  const download = (onSuccess, onError) => {
    checkRequest(`GET`, URL.download, onSuccess, onError);
  };

  const upload = (data, onSuccess, onError) => {
    checkRequest(`POST`, URL.upload, onSuccess, onError, data);
  };

  window.backend = {
    download: download,
    upload: upload
  };
})();
