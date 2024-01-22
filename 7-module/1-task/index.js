import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
  }

  render () {
    this.elem=createElement(`
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner"></nav>
      <button class="ribbon__arrow ribbon__arrow_right ">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>`);

    let categories=this.categories.map(item => createElement(`
    <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`));

    let inner=this.elem.querySelector('.ribbon__inner')
    inner.append(...categories);

    inner.addEventListener('pointover', event => this.choiceCategories(event));
    inner.addEventListener('pointout', event => this.outCategories)

    this.elem.addEventListener('click', event => {
      this.scrollCategories(event);
      this.addCategories(event)
    });
    

  }

  scrollCategories(event) {
    let button = event.target.closest('.ribbon__arrow');

    if(button) {
      let ribbonInner=this.elem.querySelector('.ribbon__inner')
      let arrowRight=this.elem.querySelector('.ribbon__arrow_right');
      let arrowLeft=this.elem.querySelector('.ribbon__arrow_left');

      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;

      let scrollRight = scrollWidth - scrollLeft - clientWidth;
     
      scrollRight<1 ? arrowRight.classList.remove('ribbon__arrow_visible') : arrowRight.classList.add('ribbon__arrow_visible')
      scrollLeft===0 ? arrowLeft.classList.remove('ribbon__arrow_visible') : arrowLeft.classList.add('ribbon__arrow_visible')
      
      if(event.target.closest('.ribbon__arrow_right')) {
        ribbonInner.scrollBy(350, 0);
      }

      if (button.closest('.ribbon__arrow_left')) {
        ribbonInner.scrollBy(-350, 0);
      }
    }
  }

  overCategories (event) {
    if(item) {
      event.target.classList.add('ribbon__item_active');
    }
  }

  outCategories (event) {
    let item=event.target.closest('.ribbon__item');
    if(item) {
      event.target.classList.remove('ribbon__item_active')
    }
  }

  addCategories (event) {
    let item=event.target.closest('.ribbon__item');
    if(item) {
      event.preventDefault();
      let id = event.target.closest('[data-id]').dataset.id;
      this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
        detail: id,
        bubbles: true
      }));
    }
  }
}
