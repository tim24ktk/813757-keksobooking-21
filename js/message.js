'use strict';

(() => {
  const createErrorMessage = (error) => {
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
    document.body.appendChild(errorMessage);

    const onSetTimeout = () => errorMessage.remove();

    window.setTimeout(onSetTimeout, 500);
  };

  window.message = {
    showError: createErrorMessage
  };
})();
