import { fetchData } from './services';

class MenuCard {
  constructor(src, alt, title, descr, price, parentSelector, ...classes) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.container = document.querySelector(parentSelector);
    this.classes = classes;
    this.rate = 70;
    this.changeToRub();
  }

  changeToRub() {
    this.price = +this.price * this.rate;
  }

  render() {
    const card = document.createElement('div');

    this.classes.length ? card.classList.add(...this.classes) : card.classList.add('menu__item');

    card.innerHTML = `
      <img src=${this.src} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
        </div>
    `;

    this.container.append(card);
  }
}

export const cards = () => {
  fetchData('./db.json')
    .then((data) => {
      data.menu.forEach(({ img, altimg, title, descr, price }) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
    })
    .catch((err) => console.error(err.message));
};
