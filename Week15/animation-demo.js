import { Timeline, Animation } from './animation.js'
import { ease, easeIn } from './ease.js';

let t1 = new Timeline();
t1.start();

let el = document.querySelector("#el").style;
//t1.add(new Animation(el, "transform", 0, 500, 2000, 0, null, v => `translateX(${v}px)`));

t1.add(new Animation(el, "transform", 0, 500, 2000, 0, easeIn, v => `translateX(${v}px)`));

document.querySelector("#el2").style.transition = "transform ease-in 2s";
document.querySelector("#el2").style.transform = "translateX(500px)";

document.querySelector("#pause-btn").addEventListener("click", () => t1.pause())
document.querySelector("#resume-btn").addEventListener("click", () => t1.resume())
document.querySelector("#reset-btn").addEventListener("click", () => t1.reset())