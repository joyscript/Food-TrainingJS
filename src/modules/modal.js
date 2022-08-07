export const modal = () => {
  const modal = document.querySelector('.modal');
  const modalForm = modal.querySelector('.modal form');
  const modalContent = modal.querySelector('.modal__content');
  const modalOpenBtns = document.querySelectorAll('[data-modal]');
  const scrollBar = window.innerWidth - document.documentElement.offsetWidth;

  let closeTimerId;
  let thanksModal;

  const openModal = () => {
    modal.classList.add('active');
    document.body.style.cssText = `overflow: hidden; padding-right: ${scrollBar}px`;
    window.removeEventListener('scroll', openModalOnScroll);
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style = '';
    if (modal.classList.contains('thanks')) closeThanksModal();
  };

  const showThanksModal = (message) => {
    if (!modal.classList.contains('active')) openModal();
    modal.classList.add('thanks');
    modalForm.classList.add('hide');

    thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__title');
    thanksModal.textContent = message;
    modalContent.append(thanksModal);

    closeTimerId = setTimeout(() => closeModal(), 3000);
  };

  const closeThanksModal = () => {
    thanksModal.remove();
    modal.classList.remove('thanks');
    modalForm.classList.remove('hide');
    clearTimeout(closeTimerId);
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
};
