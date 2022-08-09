import { Modal } from './Modal';
import { fetchData } from './services';

export const contact = () => {
  const modal = new Modal('.modal', '.modal__close', '[data-modal]');
  modal.openTimeout = setTimeout(() => modal.openModal(), 5000);
  modal.scrollHandler();

  const thanksModal = new Modal('.thanks-modal', '.modal__close');
  thanksModal.closeTimeout = () => setTimeout(() => thanksModal.closeModal(), 3000);

  const forms = document.querySelectorAll('form');

  const message = {
    success: 'Спасибо! Мы скоро с вами свяжемся',
    failure: 'Что-то пошло не так...',
  };

  const checkData = (form) => {
    const checkInput = (input, reg) => {
      input.value.match(reg) ? input.classList.remove('attention') : input.classList.add('attention');
    };

    form.addEventListener('input', (e) => {
      if (e.target.getAttribute('name') == 'name') checkInput(e.target, /^([A-Za-zА-Яа-я]+\s?)[A-Za-zА-Яа-я]*$/);
      if (e.target.getAttribute('name') == 'phone') checkInput(e.target, /^[\d-]+$/);
    });
  };

  const showThanksModal = (message) => {
    modal.closeModal();
    thanksModal.modal.querySelector('.modal__title').textContent = message;
    thanksModal.openModal();
  };

  const postData = (form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.querySelector('.attention')) {
        const spinner = form.querySelector('.spinner');
        spinner.classList.add('active');

        const formData = new FormData(form);
        const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

        fetchData('https://jsonplaceholder.typicode.com/posts', 'POST', jsonData)
          .then((data) => {
            console.log(data);
            showThanksModal(message.success);
          })
          .catch((err) => {
            console.log(err.message);
            showThanksModal(message.failure);
          })
          .finally(() => {
            form.reset();
            spinner.classList.remove('active');
          });
      }
    });
  };

  forms.forEach((form) => {
    checkData(form);
    postData(form);
  });
};
