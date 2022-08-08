export const tabs = (content, tab) => {
  const tabcontents = document.querySelectorAll(content);
  const tabs = document.querySelectorAll(tab);

  const hideContent = () => {
    tabcontents.forEach((content) => content.classList.remove('active', 'fade'));
    tabs.forEach((tab) => tab.classList.remove('active'));
  };

  const showContent = (i) => {
    tabcontents[i].classList.add('active', 'fade');
    tabs[i].classList.add('active');
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      hideContent();
      showContent(i);
    });
  });
};
