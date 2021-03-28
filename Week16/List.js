import { Component, STATE, ATTRIBUTE, createElement } from "./framwork.js";
import { enableGuesture } from './guesture2.js';
import { Timeline, Animation } from './animation.js';

export { STATE, ATTRIBUTE } from "./framwork.js";

class List extends Component {
  constructor() {
    super();
  }

  render() {
    this.children = this[ATTRIBUTE].data.map(this.template);
    this.root = (<div>{this.children}</div>).render();
    return this.root;
  }
  //重载
  appendChild(child) {
    this.template = (child);
  }
}

export default List;