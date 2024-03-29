export const timer = (timerEl, deadline, endDay, endMonth) => {
  const timeBoxes = document.querySelectorAll(`${timerEl} span`);

  deadline = new Date(`${deadline}T00:00:00`);

  const updateDeadline = () => {
    if (deadline - Date.now() <= 0) {
      const msecPerWeek = 1000 * 60 * 60 * 24 * 7;
      const passedTime = (Date.now() - deadline) % msecPerWeek; // прошедшее время с начала новой недели
      deadline = new Date(Date.now() - passedTime + msecPerWeek); // дедлайн обновляется каждую неделю на 1 неделю вперед
    }
  };

  const updateDeadlineText = () => {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    document.querySelector(endDay).textContent = deadline.getDate();
    document.querySelector(endMonth).textContent = months[deadline.getMonth()];
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

  const setTimer = () => {
    const timerId = setInterval(updateTimer, 1000);
    updateTimer();

    function updateTimer() {
      const timeRem = getTimeRemaining();
      if (timeRem[4] <= 1000) clearInterval(timerId);

      timeBoxes.forEach((timeBox, i) => {
        timeBox.textContent = normalizeNum(timeRem[i]);
        timeBox.nextSibling.textContent = normalizeWord(timeRem[i])[i];
      });
    }
  };

  updateDeadline();
  updateDeadlineText();
  setTimer();
};
