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
    let filterArray=this.products.filter(item=> {
      if (filters.noNuts && !item.nuts) {
        return item;
      }
      if(filters.vegeterianOnly && item.vegeterian) {
        return item;
      }
      if (filters.maxSpiciness>=item.spiciness) {
        return item;
      }
      if (filters.category===item.category) {
        return item;
      }
    })
    this.renderFilterdCard(filterArray);
  }

  renderFilterdCard(filter) {
    let card=this.elem.querySelector('.products-grid__inner');
    card.innerHTML='';
    let productsCard = filter.map(item => createElement(card.append(new ProductCard(item).elem)));
  }
}
