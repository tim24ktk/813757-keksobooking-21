'use strict';

(() => {
  const MESSAGE_REMOVE_TIMEOUT = 500;

  const createErrorMessage = (error) => {
    const errorMessage = document.createElement(`div`);
    const style = errorMessage.style;

    errorMessage.textContent = error;
    style.width = `400px`;
    style.height = `60px`;
    style.borderWidth = `5px`;
    style.borderStyle = `solid`;
    style.borderRadius = `20px`;
    style.font = `25px`;
    style.color = `red`;
    style.backgroundColor = `white`;
    style.position = `fixed`;
    style.zIndex = `1000`;
    style.display = `flex`;
    style.justifyContent = `space-around`;
    style.alignItems = `center`;
    style.top = `50%`;
    style.left = `50%`;
    style.transform = `translateX(-200px)`;
    document.body.appendChild(errorMessage);

    const onSetTimeout = () => errorMessage.remove();

    window.setTimeout(onSetTimeout, MESSAGE_REMOVE_TIMEOUT);
  };

  window.message = {
    showError: createErrorMessage
  };
})();
