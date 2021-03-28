import { Component, STATE, ATTRIBUTE, createElement } from "./framwork.js";
import { enableGuesture } from './guesture2.js';
import { Timeline, Animation } from './animation.js';

export { STATE, ATTRIBUTE } from "./framwork.js";

class Button extends Component {
  constructor() {
    super();
  }

  render() {
    // this.root = (<div>content</div>).root;
    this.childContainer = <span />;
    this.root = (<div>{this.childContainer}</div>).render();
    return this.root;
  }
  //重载
  appendChild(child) {
    if (!this.childContainer) {
      this.render();
    }
    this.childContainer.appendChild(child);
  }
}

export default Button;