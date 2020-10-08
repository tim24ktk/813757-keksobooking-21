'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const TIMEOUT = 1000;
  const StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
  };

  window.load = () => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    const onSuccess = (data) => {
      window.map.createPins(data);
    };

    const onError = (error) => {
      const errorMessage = document.createElement(`div`);
      errorMessage.textContent = error;
      errorMessage.style.width = `400px`;
      errorMessage.style.height = `60px`;
      errorMessage.style.borderWidth = `5px`;
      errorMessage.style.borderStyle = `solid`;
      errorMessage.style.borderRadius = `20px`;
      errorMessage.style.font = `25px`;
      errorMessage.style.color = `red`;
      errorMessage.style.backgroundColor = `white`;
      errorMessage.style.position = `fixed`;
      errorMessage.style.zIndex = `1000`;
      errorMessage.style.display = `flex`;
      errorMessage.style.justifyContent = `space-around`;
      errorMessage.style.alignItems = `center`;
      errorMessage.style.top = `50%`;
      errorMessage.style.left = `50%`;
      errorMessage.style.transform = `translateX(-200px)`;
      document.body.append(errorMessage);
    };

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

    xhr.open(`GET`, URL);
    xhr.send();
  };
})();
