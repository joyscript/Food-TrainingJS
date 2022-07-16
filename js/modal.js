const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('.modal__close');
const modalOpenBtns = document.querySelectorAll('[data-modal]');
const scrollBar = window.innerWidth - document.documentElement.offsetWidth;

const openModal = () => {
  modal.classList.toggle('show');
  document.body.style.cssText = `overflow: hidden; padding-right: ${scrollBar}px`;

  clearInterval(modalTimer);
  window.removeEventListener('scroll', openModalOnScroll);
};

const closeModal = () => {
  modal.classList.toggle('show');
  document.body.style.cssText = `overflow: auto; padding-right: 0`;
};

const openModalOnScroll = () => {
  if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) openModal();
};

const modalTimer = setTimeout(openModal, 5000);

modalOpenBtns.forEach((btn) => btn.addEventListener('click', openModal));

modalCloseBtn.addEventListener('click', closeModal);

document.addEventListener('click', (e) => {
  if (e.target === modal && modal.classList.contains('show')) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && modal.classList.contains('show')) closeModal();
});

window.addEventListener('scroll', openModalOnScroll);
