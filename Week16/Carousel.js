import { Component, STATE, ATTRIBUTE } from "./framwork.js"
import { enableGuesture } from './guesture2.js'
import { Timeline, Animation } from './animation.js'
import { ease } from './ease.js'

export { STATE, ATTRIBUTE } from "./framwork.js";
console.log("STATE:", STATE);

class Carousel extends Component {
  constructor() {
    super();

  }

  render() {
    //console.log(this.attributes.src);
    this.root = document.createElement("div");
    this.root.classList.add('carousel')
    for (let record of this[ATTRIBUTE].src) {
      let child = document.createElement("div");
      child.style.backgroundImage = `url('${record.img}')`
      this.root.appendChild(child);
    }

    enableGuesture(this.root);

    let timeline = new Timeline;
    timeline.start();

    let children = this.root.children;
    //let position = 0;
    this[STATE].position = 0;
    let handler = null;
    let t = 0;
    // 动画造成的x的位移
    let ax = 0;

    // 点击拖拽时暂停timeline
    this.root.addEventListener("start", event => {
      timeline.pause();
      clearInterval(handler);
      //　计算动画位移
      let progress = (Date.now() - t) / 1500;
      ax = ease(progress) * 500 - 500;
    })

    this.root.addEventListener("tap", event => {
      this.triggerEvent("click", {
        data: this[ATTRIBUTE].src[this[STATE].position],
        position: this[STATE].position
      })
    })

    this.root.addEventListener("pan", event => {
      let x = event.clientX - event.startX - ax;
      let current = this[STATE].position - ((x - x % 500) / 500);

      for (let offset of [-1, 0, 1]) {
        let pos = current + offset;
        //　保证非负数
        pos = (pos % children.length + children.length) % children.length;
        children[pos].style.transition = "none";
        children[pos].style.transform = `translateX(${-pos * 500 + offset * 500 + x % 500}px)`;
      }
    })

    this.root.addEventListener("end", event => {
      //　重新开始timeline
      timeline.reset();
      timeline.start();
      handler = setInterval(nextPicture, 3000);

      let x = event.clientX - event.startX - ax;
      let current = this[STATE].position - ((x - x % 500) / 500);
      let direction = Math.round((x % 500) / 500); // -1 0 1

      if (event.isFlick) {
        console.log("Flick", event.velocity);
        if (event.velocity < 0) {
          direction = Math.ceil(x % 500 / 500);
        } else {
          direction = Math.floor(x % 500 / 500);
        }
      }

      for (let offset of [-1, 0, 1]) {
        let pos = current + offset;
        //　保证非负数
        pos = (pos % children.length + children.length) % children.length;

        children[pos].style.transition = "none";
        //children[pos].style.transform = `translateX(${-pos * 500 + offset * 500 + x % 500}px)`;

        timeline.add(new Animation(children[pos].style, "transform",
          -pos * 500 + offset * 500 + x % 500,
          -pos * 500 + offset * 500 + direction * 500,
          500, 0, ease, v => `translateX(${v}px)`));
      }

      this[STATE].position = this[STATE].position - (x - x % 500) / 500 - direction;
      this[STATE].position = (this[STATE].position % children.length + children.length) % children.length;

      this.triggerEvent("Change", { position: this[STATE].position });
    })

    let nextPicture = () => {
      let children = this.root.children;
      let nextIndex = (this[STATE].position + 1) % children.length;

      let current = children[this[STATE].position];
      let next = children[nextIndex];

      t = Date.now();

      // next.style.transition = "none";
      // next.style.transform = `translateX(${500 - nextIndex * 500}px)`;

      timeline.add(new Animation(current.style, "transform",
        -this[STATE].position * 500, -500 - this[STATE].position * 500, 500, 0, ease,
        v => `translateX(${v}px)`));

      timeline.add(new Animation(next.style, "transform",
        500 - nextIndex * 500, - nextIndex * 500, 500, 0, ease,
        v => `translateX(${v}px)`));
      this[STATE].position = nextIndex;
      this.triggerEvent("change", { position: this[STATE].position });

    }

    handler = setInterval(nextPicture, 3000);

    return this.root;
  }

}

export default Carousel;