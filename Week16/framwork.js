export function createElement(type, attributes, ...children) {
  //let element = document.createElement(type);
  let element;
  if (typeof type === "string") {
    //element = document.createElement(type);
    element = new ElementWrapper(type)
  } else {
    element = new type;
  }
  for (let name in attributes) {
    element.setAttribute(name, attributes[name]);
  }
  let processChildren = (children) => {
    for (let child of children) {
      if (typeof child === "object" && (child instanceof Array)) {
        processChildren(child);
        continue;
      }
      if (typeof child === "string") {
        // child = document.createTextNode(child);
        child = new TextWrapper(child);
      }
      element.appendChild(child);
    }
  }
  processChildren(children);
  return element;
}

export let STATE = Symbol("state");
export let ATTRIBUTE = Symbol("attributes");

export class Component {
  constructor(type) {
    this[ATTRIBUTE] = Object.create(null);
    this[STATE] = Object.create(null);
  }

  render() {
    return this.root;
  }

  setAttribute(name, value) {
    this[ATTRIBUTE][name] = value;
  }

  appendChild(child) {
    child.mountTo(this.root)
  }
  mountTo(parent) {
    if (!this.root) {
      this.render();
    }
    parent.appendChild(this.root);
  }
  triggerEvent(type, args) {
    //type.replace(/^[\s\S]/, s => s.toUpperCase());
    this[ATTRIBUTE]["on" + type.replace(/^[\s\S]/, s => s.toUpperCase())](new CustomEvent(type, { detail: args }))
  }
}


class ElementWrapper extends Component {
  constructor(type) {
    super();
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
}

class TextWrapper extends Component {
  constructor(content) {
    super();
    this.root = document.createTextNode(content);
  }
}

// class Div {

//   constructor() {
//     this.root = document.createElement("div");
//   }

//   setAttribute(name, value) {
//     this.root.setAttribute(name, value);
//   }

//   appendChild(child) {
//     child.mountTo(child)
//   }

//   mountTo(parent) {

//     parent.appendChild(this.root);
//   }
// }


// let a = <Div id="a">
//   Hello world!
//   <span>a</span>
//   <span>b</span>
//   <span>c</span>
// </Div>

//document.body.appendChild(a);
// a.mountTo(document.body)
