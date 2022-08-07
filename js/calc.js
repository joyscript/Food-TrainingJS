const result = document.querySelector('.calculating__result > span');
const clickFields = [document.querySelector('#gender'), document.querySelector('#level')];
const inputField = document.querySelector('.calculating__choose_medium');
const inputs = inputField.querySelectorAll('input');

const ratio = { low: 1.2, small: 1.375, medium: 1.55, high: 1.725 };
const reg = /^[1-9]\d*|\d+\.(\d{1,2})$/;

let user = { gender: 'female', level: 'small' };

const activateElem = (field) => {
  field.querySelectorAll('div').forEach((elem) => {
    elem.classList.remove('calculating__choose-item_active');
    if (elem.id == user[field.id]) elem.classList.add('calculating__choose-item_active');
  });
};

const addClickHandlers = (field) => {
  field.querySelectorAll('div').forEach((elem) => {
    elem.addEventListener('click', () => {
      user[field.id] = elem.id;
      activateElem(field);
      getResult();
    });
  });
};

const getResult = () => {
  const { gender, height, weight, age, level } = user;

  if (weight && height && age && !inputField.querySelector('.attention')) {
    gender == 'female'
      ? (result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio[level]))
      : (result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio[level]));

    localStorage.setItem('user', JSON.stringify(user));
  }
};

// --------------------------------

if (localStorage.getItem('user')) {
  user = JSON.parse(localStorage.getItem('user'));
  inputs.forEach((input) => (input.value = user[input.id]));
  getResult();
}

clickFields.forEach((field) => {
  activateElem(field);
  addClickHandlers(field);
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
