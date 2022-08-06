const slider = document.querySelector('.offer__slider');
const slides = slider.querySelectorAll('.offer__slide');
const btnPrev = slider.querySelector('.offer__slider-prev');
const btnNext = slider.querySelector('.offer__slider-next');
const current = slider.querySelector('#current');
const total = slider.querySelector('#total');

let ind = 0;

total.textContent = normalizeNum(slides.length);
current.textContent = normalizeNum(ind + 1);

const controls = document.createElement('div');
controls.classList.add('slider-controls');
slider.append(controls);

for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement('div');
  dot.classList.add('slider-dot');
  if (i == ind) dot.classList.add('active');
  controls.append(dot);
}

const dots = controls.querySelectorAll('.slider-dot');

const changeSlide = () => {
  current.textContent = normalizeNum(ind + 1);
  controls.querySelector('.slider-dot.active').classList.remove('active');
  dots[ind].classList.add('active');
};

const hideSlide = (direction) => {
  slider.classList.add('lock');
  slides[ind].classList.add(direction);

  const deactivateSlide = (e) => e.target.classList.remove('active', direction);
  slides[ind].addEventListener('animationend', (e) => deactivateSlide(e), { once: true });
};

const showSlide = (direction) => {
  slides[ind].classList.add('next', direction);

  const activateSlide = (e) => {
    e.target.classList.remove('next', direction);
    e.target.classList.add('active');
    slider.classList.remove('lock');
  };

  slides[ind].addEventListener('animationend', (e) => activateSlide(e), { once: true });
};

const showLeftSlide = (i) => {
  hideSlide('to-right');
  i || i == 0 ? (ind = i) : (ind = (ind - 1 + slides.length) % slides.length);
  changeSlide();
  showSlide('from-left');
};

const showRightSlide = (i) => {
  hideSlide('to-left');
  i || i == 0 ? (ind = i) : (ind = (ind + 1) % slides.length);
  changeSlide();
  showSlide('from-right');
};

let sliderTimerId = setInterval(() => showRightSlide(), 2000);

btnPrev.addEventListener('click', () => showLeftSlide());
btnNext.addEventListener('click', () => showRightSlide());

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    i < ind ? showLeftSlide(i) : showRightSlide(i);
  });
});

slider.addEventListener('pointerover', () => clearInterval(sliderTimerId));
slider.addEventListener('pointerout', () => {
  sliderTimerId = setInterval(() => showRightSlide(), 2000);
});

// ----------------------------------------------------

const swipeSlides = () => {
  const surface = slider.querySelector('.offer__slider-wrapper');

  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
  let startTime = 0;
  let elapsedTime = 0;

  const minDistX = 50;
  const maxDistY = 100;
  const maxTime = 300;

  const changeSwipeSlide = () => {
    if (elapsedTime <= maxTime && Math.abs(distX) >= minDistX && Math.abs(distY) <= maxDistY) {
      distX > 0 ? showLeftSlide() : showRightSlide();
    }
  };

  const startActions = (e) => {
    if (e.type == 'mousedown') e.preventDefault();
    if (e.type == 'touchstart') e = e.changedTouches[0];

    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
  };

  const endActions = (e) => {
    if (e.type == 'mouseup') e.preventDefault();
    if (e.type == 'touchend') e = e.changedTouches[0];

    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    changeSwipeSlide();
  };

  surface.addEventListener('mousedown', (e) => startActions(e));
  surface.addEventListener('mouseup', (e) => endActions(e));

  surface.addEventListener('touchstart', (e) => startActions(e));
  surface.addEventListener('touchend', (e) => endActions(e));
};

swipeSlides();
