export const postData = () => {
  const forms = document.querySelectorAll('form');

  const message = {
    success: 'Спасибо! Мы скоро с вами свяжемся',
    failure: 'Что-то пошло не так...',
  };

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: data,
    });

    if (!res.ok) throw new Error(`Ошибка запроса по адресу ${url}, статус: ${res.status}`);

    return await res.json();
  };

  const postFormData = (form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const spinner = form.querySelector('.spinner');
      spinner.classList.add('show');

      const formData = new FormData(form);
      const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('https://jsonplaceholder.typicode.com/posts', jsonData)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
        })
        .catch((err) => {
          console.error(err.message);
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
          spinner.classList.remove('show');
        });
    });
  };

  forms.forEach((form) => postFormData(form));
};
