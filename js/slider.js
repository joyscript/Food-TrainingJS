const slider = document.querySelector('.offer__slider');
const slides = slider.querySelectorAll('.offer__slide');
const btnPrev = slider.querySelector('.offer__slider-prev');
const btnNext = slider.querySelector('.offer__slider-next');
const current = slider.querySelector('#current');
const total = slider.querySelector('#total');

let i = 0;

const showSlide = (ind) => {
  i = (ind + slides.length) % slides.length;
  slider.querySelector('.offer__slide.show').classList.remove('show');
  slides[i].classList.add('show');
  current.textContent = normalizeNum(i + 1);
};

total.textContent = normalizeNum(slides.length);
slides[i].classList.add('show');
showSlide(i);

btnPrev.addEventListener('click', () => showSlide(--i));
btnNext.addEventListener('click', () => showSlide(++i));
