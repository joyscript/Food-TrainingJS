const modal = document.querySelector('.modal');
const modalOpenBtns = document.querySelectorAll('[data-modal]');
const scrollBar = window.innerWidth - document.documentElement.offsetWidth;

const openModal = () => {
  modal.classList.add('active');
  document.body.style.cssText = `overflow: hidden; padding-right: ${scrollBar}px`;

  window.removeEventListener('scroll', openModalOnScroll);
  // clearInterval(modalTimer);
};

const closeModal = () => {
  modal.classList.remove('active');
  document.body.style = '';
};

const openModalOnScroll = () => {
  if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) openModal();
};

modalOpenBtns.forEach((btn) => btn.addEventListener('click', openModal));

modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.classList.contains('modal__close')) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && modal.classList.contains('active')) closeModal();
});

window.addEventListener('scroll', openModalOnScroll);

// const modalTimer = setTimeout(openModal, 5000); 
