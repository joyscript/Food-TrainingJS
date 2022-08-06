const slider = document.querySelector('.offer__slider');
const slides = slider.querySelectorAll('.offer__slide');
const btnPrev = slider.querySelector('.offer__slider-prev');
const btnNext = slider.querySelector('.offer__slider-next');
const current = slider.querySelector('#current');
const total = slider.querySelector('#total');

let ind = 0;
let isEnabled = true;

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
  isEnabled = false;
  slides[ind].classList.add(direction);

  slides[ind].addEventListener(
    'animationend',
    function () {
      this.classList.remove('active', direction);
    },
    { once: true }
  );
};

const showSlide = (direction) => {
  slides[ind].classList.add('next', direction);

  slides[ind].addEventListener(
    'animationend',
    function () {
      this.classList.remove('next', direction);
      this.classList.add('active');
      isEnabled = true;
    },
    { once: true }
  );
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

btnPrev.addEventListener('click', () => {
  if (isEnabled) showLeftSlide();
});

btnNext.addEventListener('click', () => {
  if (isEnabled) showRightSlide();
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    if (isEnabled) {
      i < ind ? showLeftSlide(i) : showRightSlide(i);
    }
  });
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
    if (elapsedTime <= maxTime && Math.abs(distX) >= minDistX && Math.abs(distY) <= maxDistY && isEnabled) {
      distX > 0 ? showLeftSlide() : showRightSlide();
    }
  };

  const startActions = (e) => {
    e.preventDefault();
    if (e.type == 'touchstart') e = e.changedTouches[0];
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
  };

  const endActions = (e) => {
    e.preventDefault();
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
