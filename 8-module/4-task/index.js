import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if(product && product!=null) {
      for(let item of this.cartItems) {
        if(item.product==product) {
          item.count++;
          this.onProductUpdate(item);
          return;
        } 
      }
    } else {
      return false;
    }
    this.cartItems.push({ product, count: 1 });
    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    let cartItem;
    for(let item of this.cartItems) {
      if(item.product.id===productId) {
        item.count = item.count+amount;
        cartItem=item;
      }
      if(item.count===0) {
        this.cartItems.splice(this.cartItems.indexOf(item), 1);
      }
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let resultCount=0;
    for (let item of this.cartItems) {
      resultCount+=item.count;
    }
    return resultCount;
  }

  getTotalPrice() {
    let resultPrice=0;
    for (let item of this.cartItems) {
      resultPrice+=(item.count*item.product.price);
    }
    return resultPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");

    let modalCart=createElement(`<div></div>`);
    let modalProduct=this.cartItems.map(item => modalCart.append(this.renderProduct(item.product, item.count)));
    modalCart.append(this.renderOrderForm());
    this.modal.setBody(modalCart);

    this.modal.open();
    
    modalCart.addEventListener('click', event => {
      let changePlus=event.target.closest('.cart-counter__button_plus');
      let changeMinus=event.target.closest('.cart-counter__button_minus');

      if(changePlus) {
       let id = event.target.closest('.cart-product').dataset.productId;
       this.updateProductCount(id, 1);
      }

      if(changeMinus) {
        let id= event.target.closest('.cart-product').dataset.productId;
        this.updateProductCount(id, -1);
       }
    })
    
    modalCart.querySelector('.cart-form').addEventListener('submit', event => this.onSubmit(event));
  }

  onProductUpdate(cartItem) {
    if(document.body.classList.contains('is-modal-open')) {
        let modalBody=document.querySelector('.modal__body');
        let productId=cartItem.product.id;
        let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
        let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
        let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

        productCount.innerHTML=cartItem.count;
        productPrice.innerHTML=`€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
        infoPrice.innerHTML=`€${this.getTotalPrice().toFixed(2)}`;

        if(cartItem.count===0) {
          modalBody.querySelector(`[data-product-id="${productId}"]`).remove()
        }
      }

      if (this.isEmpty()) {
        this.modal.close();
      }

    this.cartIcon.update(this);
  }

  async onSubmit(event) {
      event.preventDefault();

      let modalBody = document.querySelector('.modal__body');
      let formModal = modalBody.querySelector('.cart-form');
      let btn = modalBody.querySelector("[type = 'submit']").classList.add("is-loading");
  
      let formData = new FormData(formModal);
  
      let response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData
      });
      if(response.ok) {
        this.modal.setTitle("Success!");
        this.cartItems.splice(0, this.cartItems.length);
        modalBody.innerHTML=`
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>`;
          this.cartIcon.update(this);
      }
    }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

