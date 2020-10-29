'use strict';

const UPLOAD = `https://21.javascript.pages.academy/keksobooking`;

const HttpMethod = {
  POST: `POST`
};

window.upload = (data, onSuccess, onError) => {
  window.backend.handleRequest(HttpMethod.POST, UPLOAD, onSuccess, onError, data);
};
