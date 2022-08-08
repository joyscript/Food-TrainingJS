const scrollBar = window.innerWidth - document.documentElement.offsetWidth;

export class Modal {
  constructor(modal, closeBtn, openBtns) {
    this.modal = document.querySelector(modal);
    this.closeBtn = document.querySelector(closeBtn);
    this.openBtns = document.querySelectorAll(openBtns);
    this.openTimeout;
    this.closeTimeout;
    this.modalHandlers();
  }

  openModal() {
    this.modal.classList.add('active');
    document.body.style.cssText = `overflow: hidden; padding-right: ${scrollBar}px`;
    if (this.closeTimeout) this.closeTimeout();
    if (this.openTimeout) clearTimeout(this.openTimeout);
  }

  closeModal() {
    this.modal.classList.remove('active');
    document.body.style = '';
    if (this.closeTimeout) clearTimeout(this.closeTimeout);
  }

  modalHandlers() {
    this.openBtns.forEach((btn) => btn.addEventListener('click', () => this.openModal()));

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal || e.target === this.closeBtn) this.closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && this.modal.classList.contains('active')) this.closeModal();
    });
  }

  scrollHandler() {
    const openModalOnScroll = () => {
      if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) this.openModal();
    };
    window.addEventListener('scroll', openModalOnScroll, { once: true });
  }
}
