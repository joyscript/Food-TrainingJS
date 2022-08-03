const timeBoxes = document.querySelectorAll('.timer span');
const period = 7;

let deadline = new Date('2022-08-08T00:00:00');

const updateDeadline = () => {
  if (deadline - Date.now() <= 0) {
    deadline = new Date(Date.parse(deadline) + 1000 * 60 * 60 * 24 * period);
    updateDeadline();
  }
};

const updateDeadlineText = () => {
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  document.querySelector('#end-day').textContent = deadline.getDate();
  document.querySelector('#end-month').textContent = months[deadline.getMonth()];
};

const getTimeRemaining = () => {
  const msec = deadline - Date.now();

  const days = Math.floor(msec / (1000 * 60 * 60 * 24));
  const hours = Math.floor((msec / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((msec / (1000 * 60)) % 60);
  const seconds = Math.floor((msec / 1000) % 60);

  return msec > 0 ? [days, hours, minutes, seconds, msec] : [0, 0, 0, 0, 0];
};

const normalizeNum = (num) => (num < 10 ? `0${num}` : num);

const normalizeWord = (num) => {
  if (num % 10 === 1 && num !== 11) {
    return ['день', 'час', 'минута', 'секунда'];
  } else if ((num % 10 === 2 && num !== 12) || (num % 10 === 3 && num !== 13) || (num % 10 === 4 && num !== 14)) {
    return ['дня', 'часа', 'минуты', 'секунды'];
  } else {
    return ['дней', 'часов', 'минут', 'секунд'];
  }
};

function updateTimer() {
  const timeRem = getTimeRemaining();
  const timer = setTimeout(updateTimer, 1000);

  if (timeRem[4] <= 1000) clearInterval(timer);

  timeBoxes.forEach((timeBox, i) => {
    timeBox.textContent = normalizeNum(timeRem[i]);
    timeBox.nextSibling.textContent = normalizeWord(timeRem[i])[i];
  });
}

updateDeadline();
updateDeadlineText();
updateTimer();
