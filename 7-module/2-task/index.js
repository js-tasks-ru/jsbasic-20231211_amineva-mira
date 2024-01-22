import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
  }

  render(){
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);
    
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
    this.elem.addEventListener('click', event=>this.closeClick(event));
    document.addEventListener('keydown', event => this.closeKeyDown(event));
  }

  setTitle(modalTitle) {
    this.elem.querySelector('.modal__title').textContent=modalTitle;
  }

  setBody(node) {
    document.querySelector('.container').style.display='none';
    this.elem.querySelector('.modal__body').append(node);
  }

  closeClick(event) {
    if(event.target.closest('.modal__close')) {
      this.close();
    }
  }

  closeKeyDown(event) {
    if (event.code === 'Escape') {
      event.preventDefault()
      this.close();
      this.elem.removeEventListener('keydown', this.closeKeyDown);
    }
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
    document.querySelector('.container').style.display='';
  }
}
