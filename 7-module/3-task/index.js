import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps=steps;
    this.render();
  }

  render() {
    console.log('render')
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
      if(i=0) {
        let steps=createElement(`<span class='slider__step-active'></span>`);
        this.elem.querySelector('.slider__steps').append(steps);
      } else {
        let steps=createElement(`<span></span>`);
        this.elem.querySelector('.slider__steps').append(steps);
      }
      
    }

    this.elem.addEventListener('click', (event) => this.sliderClick(event) );
  }

  sliderClick(event) {
    let sliderValue=this.elem.querySelector('.slider__value');
    let sliderSteps=this.elem.querySelector('.slider__steps');
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let approximateValue = Math.round(leftRelative * (this.steps-1));
    sliderValue.textContent=approximateValue;
    
  //  for(let item of sliderSteps.children) {
  //   sliderSteps.children.classList.remove('slider__step-active');
  //  }

    sliderSteps.children[approximateValue].classList.add('slider__step-active');
  
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let leftPercents = approximateValue / (this.steps-1) * 100;

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    console.log(event.target)
  }
}
