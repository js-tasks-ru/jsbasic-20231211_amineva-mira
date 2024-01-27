import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps=steps;
    this.value=value;
    this.render();
  }

  render() {
    this.elem=createElement(`
    <div class="slider">
      <div class="slider__thumb">
        <span class="slider__value">0</span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps">
      </div>
    </div>`);
  
    for(let i=0; i<=this.steps-1; i++) {
      if(i===0) {
        let steps=createElement(`<span class='slider__step-active'></span>`);
        this.elem.querySelector('.slider__steps').append(steps);
      } else {
        let steps=createElement(`<span></span>`);
        this.elem.querySelector('.slider__steps').append(steps);
      }
    }

    let thumb = this.elem.querySelector('.slider__thumb');
    
    this.elem.addEventListener('pointerdown', (event) => this.sliderThumbDown(event) );
    this.elem.addEventListener('click', (event) => this.sliderClick(event) );
  }

  sliderThumbDown(event) {
    event.preventDefault();
    let sliderValue=this.elem.querySelector('.slider__value');
    let sliderSteps=this.elem.querySelector('.slider__steps');
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
  
    this.elem.classList.add('slider_dragging');
    thumb.ondragstart = () => false;
      
    let mouseMove = (event) => {
      event.preventDefault();
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
  
      if (leftRelative < 0) {
        leftRelative = 0;
      }
        
      if (leftRelative > 1) {
        leftRelative = 1;
      }

      let leftPercents = leftRelative * 100;
      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

      this.value = Math.round(leftRelative * (this.steps-1));
      sliderValue.textContent=this.value;
      for(let item of sliderSteps.children) {
        item.classList.remove('slider__step-active');
      }
      sliderSteps.children[this.value].classList.add('slider__step-active');
    }
  
    document.addEventListener('pointermove', mouseMove);

    document.onpointerup = (event) => {
      console.log('up')
      document.removeEventListener('pointermove', mouseMove);
      document.onpointerup=null;
      this.elem.dispatchEvent(new CustomEvent('slider-change', { 
        detail: this.value, 
        bubbles: true 
      }));

      this.elem.classList.remove('slider_dragging')
    }
  }

  sliderClick(event) {
    let sliderValue=this.elem.querySelector('.slider__value');
    let sliderSteps=this.elem.querySelector('.slider__steps');
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    this.value = Math.round(leftRelative * (this.steps-1));
    sliderValue.textContent=this.value;
    
   for(let item of sliderSteps.children) {
    item.classList.remove('slider__step-active');
   }

    sliderSteps.children[this.value].classList.add('slider__step-active');
  
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let leftPercents = this.value / (this.steps-1) * 100;

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    this.elem.dispatchEvent(new CustomEvent('slider-change', { 
      detail: this.value, 
      bubbles: true 
    }));

  }
}
