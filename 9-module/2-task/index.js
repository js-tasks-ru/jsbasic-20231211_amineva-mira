import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    return new Promise(resolve => {
      this.carousel = new Carousel(slides);
      let carouselHolder = document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
      this.ribbonMenu = new RibbonMenu (categories);
      let menuHolder = document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
      this.stepSlider = new StepSlider({steps: 5, value: 0});
      let sliderHolder = document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
      this.cartIcon = new CartIcon();
      let cartHolder = document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);
      this.cart = new Cart(this.cartIcon);
      resolve();

      this.getProduct();
      this.addListnerCustomEvent();
      this.filterProduct();
    });
  }

  async getProduct() {
    let productHolder=document.querySelector('[data-products-grid-holder]')
    let response = await fetch('products.json');
    
    if(response.ok) {
      this.products = await response.json();
      this.productsGrid= new ProductsGrid(this.products);
      productHolder.append(this.productsGrid.elem)
    }
  }

  filterProduct () {
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });
  }

  addListnerCustomEvent () {
    document.body.addEventListener('product-add', event => {
      this.products.map(item => {
        if (event.detail === item.id) {
          this.cart.addProduct(item.id);
        }
      });
    });

    document.querySelector('.slider').addEventListener('slider-change', event => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    document.querySelector("#nuts-checkbox").addEventListener("change", (event) => {
      this.productsGrid.updateFilter({ 
        noNuts: event.target.checked 
      });
    });

    document.querySelector("#vegeterian-checkbox").addEventListener("change", (event) => {
      this.productsGrid.updateFilter({
         vegeterianOnly: event.target.checked 
      });
    });

    document.querySelector('.ribbon').addEventListener('ribbon-select', event => {
      this.productsGrid.updateFilter({
        category: event.detail
      });
    });
  }
}
