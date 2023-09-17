function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const buttonStart = document.querySelector('[data-start]');
buttonStart.addEventListener('click', startTimer);

const buttonStop = document.querySelector('[data-stop]');
buttonStop.addEventListener('click', stopTimer);

let timeOut;

function startTimer() {
  timeOut = setInterval(() => {
    const body = document.querySelector('body');
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  buttonStart.setAttribute('disabled', 'disabled');
  buttonStop.removeAttribute('disabled');
}

function stopTimer() {
  clearInterval(timeOut);
  buttonStop.setAttribute('disabled', 'disabled');
  buttonStart.removeAttribute('disabled');
}
