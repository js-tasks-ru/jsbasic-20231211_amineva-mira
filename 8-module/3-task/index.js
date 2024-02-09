export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}


