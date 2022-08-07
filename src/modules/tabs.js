export const tabs = () => {
  const tabcontents = document.querySelectorAll('.tabcontent');
  const tabsList = document.querySelector('.tabheader__items');
  const tabs = tabsList.querySelectorAll('.tabheader__item');

  const hideContent = () => {
    tabcontents.forEach((content) => {
      content.classList.remove('show', 'fade');
      content.classList.add('hide');
    });

    tabs.forEach((tab) => tab.classList.remove('tabheader__item_active'));
  };

  const showContent = (i) => {
    tabcontents[i].classList.remove('hide');
    tabcontents[i].classList.add('show', 'fade');

    tabs[i].classList.add('tabheader__item_active');
  };

  hideContent();
  showContent(0);

  tabsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('tabheader__item')) {
      tabs.forEach((tab, i) => {
        if (tab == e.target) {
          hideContent();
          showContent(i);
        }
      });
    }
  });
};
