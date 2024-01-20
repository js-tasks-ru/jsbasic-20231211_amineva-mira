import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
  }

  render () {
    this.elem=createElement( `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon" />
        </div>
        <div class="carousel__arrow carousel__arrow_left" style='display: none'>
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon" />
        </div>
        <div class="carousel__inner"></div>
      </div>`);

  
    let slides = this.slides.map(item => createElement(`
      <div class="carousel__slide" data-id="${item.id}">
        <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide"/>
        <div class="carousel__caption">
          <span class="carousel__price">€${item.price.toFixed(2)}</span>
          <div class="carousel__title">${item.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon"/>
          </button>
        </div>
      </div>`));

      this.elem.querySelector('.carousel__inner').append(...slides);

      let carouselarrowRight=this.elem.querySelector('.carousel__arrow_right');
      let carouselarrowLeft=this.elem.querySelector('.carousel__arrow_left');
      let slidesCarousel=this.elem.querySelector('.carousel__inner');
      let placing=0;

        
    this.elem.addEventListener('click', (event) => {

      let widthSlide=slidesCarousel.offsetWidth;
      
      let slidesLength=slidesCarousel.children.length-1;
      if (event.target.closest('.carousel__arrow_right')) {
        placing=placing-widthSlide;
        slidesCarousel.style.transform = `translateX(${placing+'px'})`;
          
        placing===(-widthSlide)*slidesLength ? carouselarrowRight.style.display='none' : carouselarrowRight.style.display='';
        carouselarrowLeft.style.display='';
      }
    
      if (event.target.closest('.carousel__arrow_left')) {
        placing=placing+widthSlide;
        slidesCarousel.style.transform =`translateX(${placing+'px'})`;
    
        !(placing===0) ? carouselarrowLeft.style.display='' : carouselarrowLeft.style.display='none';
        carouselarrowRight.style.display='';
      }
    })
   
      
      this.elem.addEventListener('click', (event) => this.addProduct(event) );
  }

  addProduct(event) {
    let button = event.target.closest('.carousel__button');

    if (button) {
     let id = event.target.closest('[data-id]').dataset.id;

     this.elem.dispatchEvent(new CustomEvent('product-add', {
       detail: id,
       bubbles: true
     }));
   }
}
}





