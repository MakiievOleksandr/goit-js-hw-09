const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

let inervalId = null;

startBtnEl.addEventListener('click', onStartBtnClick);
stopBtnEl.addEventListener('click', onStopBtnClick);

function onStartBtnClick(evt) {
  inervalId = setInterval(setBodyColor, 1000);
  startBtnEl.setAttribute('disabled', true);
}

function onStopBtnClick(evt) {
  clearInterval(inervalId);
  startBtnEl.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setBodyColor() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}
