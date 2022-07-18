const forms = document.querySelectorAll('form');

const message = {
  success: 'Спасибо! Мы скоро с вами свяжемся',
  failure: 'Что-то пошло не так...',
};

const showThanksModal = (message) => {
  const modalContent = document.querySelector('.modal__content');
  const modalForm = document.querySelector('.modal form');
  modalForm.classList.add('hide');

  if (!modal.classList.contains('active')) openModal();

  const thanksModal = document.createElement('div');
  thanksModal.classList.add('modal__title');
  thanksModal.textContent = message;

  modalContent.append(thanksModal);

  const closeThanksModal = () => {
    thanksModal.remove();
    modalForm.classList.remove('hide');
    closeModal();
  };

  setTimeout(closeThanksModal, 3000);
};

const postData = (form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const spinner = form.querySelector('.spinner');
    spinner.classList.add('show');

    const request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader('Content-type', 'application/json');

    const formData = new FormData(form);
    const obj = {};
    formData.forEach((value, name) => (obj[name] = value));
    const json = JSON.stringify(obj);

    request.send(json);

    request.addEventListener('load', () => {
      if (request.status === 200) {
        console.log(request.response);
        showThanksModal(message.success);
      } else {
        showThanksModal(message.failure);
      }

      form.reset();
      spinner.classList.remove('show');
    });
  });
};

forms.forEach((form) => postData(form));
