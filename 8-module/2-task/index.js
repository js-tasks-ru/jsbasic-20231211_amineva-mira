import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render()
  }

  render(filterArray) {
    this.elem=createElement(`
    <div class="products-grid">
      <div class="products-grid__inner">
      </div>
    </div>`);
    this.renderFilterdCard(this.products)
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.renderFilterdCard();
  }

  renderFilterdCard(filter) {
    let inner = this.elem.querySelector('.products-grid__inner');

    inner.innerHTML = '';

    for (let product of this.products) {
      if (this.filters.noNuts && product.nuts) {continue;}

      if (this.filters.vegeterianOnly && !product.vegeterian) {continue;}

      if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) {
        continue;
      }

      if (this.filters.category && product.category != this.filters.category) {
        continue;
      }
     
      let card = new ProductCard(product);
      inner.append(card.elem);
    }
  }
}
