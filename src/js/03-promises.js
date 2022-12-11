import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.js';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(evt) {
  evt.preventDefault();

  const amount = parseInt(evt.currentTarget.amount.value);
  const step = parseInt(evt.currentTarget.step.value);
  let delay = parseInt(evt.currentTarget.delay.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise({ position, delay })
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}

function createPromise({ position, delay }) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
