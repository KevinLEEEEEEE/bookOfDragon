// @ ts-check

import capital from './utils/capital';

export default class LittlePrinceComponent {
  mixer;
  planet;
  prince;
  component;
  isPrinceWalking = false;

  constructor(mixer, node) {
    this.mixer = mixer;

    this.component = node;

    this.initNode();

    this.addEvents();

    this.mixer.register(this);

    this.update();
  }

  initNode() {
    this.prince = this.component.querySelector('simple-prince');

    this.planet = this.component.querySelector('simple-planet');
  }

  addEvents() {
    this.component.addEventListener('squeeze', this.addColor, false);

    this.component.addEventListener('useup', this.useup, false);

    this.prince.addEventListener('click', this.clickPrince, false);
  }

  addColor = (e) => {
    let { color, quantity } = e.detail;

    e.stopPropagation();

    console.log('little prince event, color squeeze');

    try {
      if (color === '#ff007f') {
        color = 'purplishRed';
      }

      this.mixer[`add${capital(color)}`](quantity);
    } catch (err) {
      console.log(err);
    }
  }

  useup = (e) => {
    e.stopPropagation();

    console.log('little prince event, color useup');

    console.log(e.target);

    e.target.setAttribute('surplus', 5);
  }

  clickPrince = () => {
    this.isPrinceWalking = !this.isPrinceWalking;

    this.updateAnimation();
  }

  updateAnimation() {
    if (this.isPrinceWalking === true) {
      this.prince.setAttribute('state', 'walk');

      this.planet.setAttribute('autorotation', '8');
    } else {
      this.prince.setAttribute('state', 'stand');

      this.planet.setAttribute('autorotation', '0');
    }
  }

  update() {
    this.updatePlanetPointerAngle();
  }

  updatePlanetPointerAngle() {
    const { h } = this.mixer.getHsv();

    this.planet.setAttribute('pointerangle', h);
  }
}