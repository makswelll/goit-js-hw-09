import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTimePickerEl = document.getElementById('datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const resetTimerBtn = document.createElement('button');
resetTimerBtn.textContent = 'Reset Timer';
resetTimerBtn.id = 'resetTimerBtn';
resetTimerBtn.dataset.reset = true;
document.body.appendChild(resetTimerBtn);

resetTimerBtn.addEventListener('click', () => {
  clearInterval(countdownInterval);
  resetTimerDisplay();
  startBtnEl.disabled = true;
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      resetTimerDisplay();
      startBtnEl.disabled = true;
    } else {
      Notiflix.Notify.success('You selected a valid future date');
      startBtnEl.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);

startBtnEl.disabled = true;

let countdownInterval;

function updateTimer() {
  const currentDate = new Date();
  const targetDate = new Date(dateTimePickerEl.value);
  const timeDifference = targetDate - currentDate;
  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    resetTimerDisplay();
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

startBtnEl.addEventListener('click', () => {
  clearInterval(countdownInterval);
  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
});

function resetTimerDisplay() {
  daysEl.textContent = '00';
  hoursEl.textContent = '00';
  minutesEl.textContent = '00';
  secondsEl.textContent = '00';
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
