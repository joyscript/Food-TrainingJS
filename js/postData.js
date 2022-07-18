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

    const formData = new FormData(form);
    const dataObj = {};
    formData.forEach((value, name) => (dataObj[name] = value));

    fetch('server.php', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(dataObj),
    })
      .then((data) => data.text())
      .then((data) => {
        console.log(data);
        showThanksModal(message.success);
      })
      .catch(() => {
        showThanksModal(message.failure);
      })
      .finally(() => {
        form.reset();
        spinner.classList.remove('show');
      });
  });
};

forms.forEach((form) => postData(form));
