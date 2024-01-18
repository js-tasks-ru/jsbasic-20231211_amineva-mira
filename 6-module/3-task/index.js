import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem=document.createElement('div');
    this.elem.dataset.id=`${slides.id}`;

    this.elem.innerHTML=`
    <img src="/assets/images/carousel/${slides.image}" class="carousel__img" alt="slide">
    <div class="carousel__caption">
      <span class="carousel__price">€${slides.price}</span>
      <div class="carousel__title">${slides.name}</div>
      <button type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>`
  }
}

  // initCarousel() {
  //   let carousel=document.querySelector('.carousel');
  
  //   let carouselarrowRight=document.querySelector('.carousel__arrow_right');
  //   let carouselarrowLeft=document.querySelector('.carousel__arrow_left');
  //   let slides=document.querySelector('.carousel__inner');
  //   let placing=0;
    
  //   carouselarrowLeft.style.display='none';
    
  
  //     carousel.addEventListener('click', function (event) {
  //       let arrowRight=event.target.closest('.carousel__arrow_right');
  //       let arrowLeft=event.target.closest('.carousel__arrow_left');
  
  //       let widthSlide=slides.offsetWidth;
  //       let slidesLength=slides.children.length-1;
        
  //       if (arrowRight) {
  //         placing=placing-widthSlide;
  //         slides.style.transform = `translateX(${placing+'px'})`;
        
  //         placing===(-widthSlide)*slidesLength ? carouselarrowRight.style.display='none' : carouselarrowRight.style.display='';
  
  //         carouselarrowLeft.style.display='';
  
  //       }
  
  //       if (arrowLeft) {
  //         placing=placing+widthSlide;
  //         slides.style.transform =`translateX(${placing+'px'})`;
  
  //         !(placing===0) ? carouselarrowLeft.style.display='' : carouselarrowLeft.style.display='none';
         
  //         carouselarrowRight.style.display='';
  //       }
  //     })
// }
