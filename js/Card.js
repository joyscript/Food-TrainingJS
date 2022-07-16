class MenuCard {
  constructor(src, alt, title, descr, price, parentSelector, classes) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.container = document.querySelector(parentSelector);
    if (classes) this.classes = [...classes];
    this.rate = 70;
    this.changeToRub();
  }

  changeToRub() {
    this.price = this.price * this.rate;
  }

  render() {
    const card = document.createElement('div');

    if (this.classes) {
      card.classList.add(...this.classes);
    } else {
      card.classList.add('menu__item');
    }

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

new MenuCard(
  'img/tabs/vegy.jpg',
  'vegy',
  'Меню "Фитнес"',
  'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  5,
  '.menu .container',
  ['menu__item', 'some', 'else']
).render();

new MenuCard(
  'img/tabs/elite.jpg',
  'elite',
  'Меню "Премиум"',
  'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  10,
  '.menu .container'
).render();

new MenuCard(
  'img/tabs/post.jpg',
  'post',
  'Меню "Постное"',
  'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  3,
  '.menu .container'
).render();
