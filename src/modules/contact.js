import { Modal } from './Modal';
import { fetchData } from './services';

export const contact = () => {
  const modal = new Modal('.modal', '.modal__close', '[data-modal]');
  // modal.openTimeout = setTimeout(() => modal.openModal(), 3000);
  modal.scrollHandler();

  const thanksModal = new Modal('.thanks-modal', '.modal__close');
  thanksModal.closeTimeout = () => setTimeout(() => thanksModal.closeModal(), 3000);

  const forms = document.querySelectorAll('form');

  const message = {
    success: 'Спасибо! Мы скоро с вами свяжемся',
    failure: 'Что-то пошло не так...',
  };

  const showThanksModal = (message) => {
    modal.closeModal();
    thanksModal.modal.querySelector('.modal__title').textContent = message;
    thanksModal.openModal();
  };

  const postData = (form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

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
    });
  };

  forms.forEach((form) => postData(form));
};
