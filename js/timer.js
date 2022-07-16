const deadline = '2022-08-01T00:00:00';

const getTimeRemaining = (endtime) => {
  const msec = Date.parse(endtime) - Date.now();

  const days = Math.floor(msec / (1000 * 60 * 60 * 24));
  const hours = Math.floor((msec / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((msec / (1000 * 60)) % 60);
  const seconds = Math.floor((msec / 1000) % 60);

  return [days, hours, minutes, seconds, msec];
};

const normalizeNum = (num) => (num >= 0 && num < 10 ? `0${num}` : num);

const normalizeWord = (num) => {
  if (num % 10 === 1 && num !== 11) {
    return ['день', 'час', 'минута', 'секунда'];
  } else if ((num % 10 === 2 && num !== 12) || (num % 10 === 3 && num !== 13) || (num % 10 === 4 && num !== 14)) {
    return ['дня', 'часа', 'минуты', 'секунды'];
  } else {
    return ['дней', 'часов', 'минут', 'секунд'];
  }
};

const setTimer = (endtime) => {
  const timeBoxes = document.querySelectorAll('.timer span');

  const updateTimer = () => {
    const timeRem = getTimeRemaining(endtime);

    timeBoxes.forEach((timeBox, i) => {
      timeBox.textContent = normalizeNum(timeRem[i]);
      timeBox.nextSibling.textContent = normalizeWord(timeRem[i])[i];
    });

    if (timeRem.msec <= 1000) clearInterval(timeIterval);
  };

  updateTimer();
  const timeIterval = setInterval(updateTimer, 1000);
};

setTimer(deadline);
