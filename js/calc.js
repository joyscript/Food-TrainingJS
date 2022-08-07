const calcField = document.querySelector('.calculating__field');
const inputs = calcField.querySelectorAll('input');
const result = calcField.querySelector('.calculating__result > span');

const ratio = { low: 1.2, small: 1.375, medium: 1.55, high: 1.725 };
const reg = /^[1-9]\d*|\d+\.(\d{1,2})$/;

let user = { gender: 'female', level: 'small' };

const getResult = () => {
  const { gender, height, weight, age, level } = user;

  if (weight && height && age && !calcField.querySelector('.attention')) {
    gender == 'female'
      ? (result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio[level]))
      : (result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio[level]));

    localStorage.setItem('user', JSON.stringify(user));
  }
};

if (localStorage.getItem('user')) {
  user = JSON.parse(localStorage.getItem('user'));
  inputs.forEach((input) => (input.value = user[input.id]));
  getResult();
}

calcField.querySelector(`[data-gender="${user.gender}"]`).classList.add('active');
calcField.querySelector(`[data-level="${user.level}"]`).classList.add('active');

calcField.addEventListener('click', (e) => {
  const btn = e.target;
  if (btn.dataset.gender || btn.dataset.level) {
    btn.dataset.gender ? (user.gender = btn.dataset.gender) : (user.level = btn.dataset.level);
    btn.parentElement.querySelector('.active').classList.remove('active');
    btn.classList.add('active');
    getResult();
  }
});

inputs.forEach((input) => {
  input.addEventListener('input', () => {
    if (input.value.match(reg) && +input.value < 300) {
      input.classList.remove('attention');
      user[input.id] = +input.value;
      getResult();
    } else {
      input.classList.add('attention');
      result.textContent = '____';
    }
  });
});
