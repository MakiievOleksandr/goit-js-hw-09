import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.js';

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),

  secEl: document.querySelector('[data-seconds]'),
  minEl: document.querySelector('[data-minutes]'),
  hourEl: document.querySelector('[data-hours]'),
  dayEl: document.querySelector('[data-days]'),
};

class Timer {
  constructor() {
    this.intervalId = null;
    this.isActive = false;
    refs.startBtn.setAttribute('disabled', true);
  }

  start() {
    if (this.isActive) {
      return;
    }

    const startTime = Date.now();
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const actualTime = Date.now();
      const deltaTime = actualTime - startTime;

      const timeValue = localStorage.getItem('dateInFuture');

      const redusingTimeValue = timeValue - deltaTime;

      const convertDateComponents = this.convertMs(redusingTimeValue);

      this.updateTimerFace(convertDateComponents);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    console.log('STOP!!!');
    refs.startBtn.removeAttribute('disabled');
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    // Remaining seconds
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  updateTimerFace({ days, hours, minutes, seconds }) {
    refs.startBtn.setAttribute('disabled', true);

    refs.dayEl.textContent = days;
    refs.hourEl.textContent = hours;
    refs.minEl.textContent = minutes;
    refs.secEl.textContent = seconds;
    if (
      refs.dayEl.textContent === '00' &&
      refs.hourEl.textContent === '00' &&
      refs.minEl.textContent === '00' &&
      refs.secEl.textContent === '00'
    ) {
      this.stop();
    }
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();

    if (selectedDates[0] > currentDate) {
      refs.startBtn.removeAttribute('disabled');
      localStorage.setItem('dateInFuture', selectedDates[0] - currentDate);
    } else {
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 3000,
        clickToClose: true,
      });
      refs.startBtn.setAttribute('disabled', true);
    }
  },
};

flatpickr(refs.inputDate, options);

const countdownTimer = new Timer();

refs.startBtn.addEventListener(
  'click',
  countdownTimer.start.bind(countdownTimer)
);
