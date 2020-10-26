'use strict';

(() => {
  const DOWNLOAD = `https://21.javascript.pages.academy/keksobooking/data`;

  const HttpMethod = {
    GET: `GET`
  };

  window.download = (onSuccess, onError) => {
    window.backend.handleRequest(HttpMethod.GET, DOWNLOAD, onSuccess, onError);
  };
})();
