# 组件化总结

### 组成部分
对象 | 组件
---|---
Porperties | Porperties
Methods | Methods
Inherit | Inherit
/ | Attribute
/ | Config & State
/ | Event
/ | Lifecycle
/ | Children


**Porperty vs Attribute**
* Porperty：强调从属关系
* Attribute：强调描述性

例子
```
// 1.
<div class="cls1 cls2" style="color:blue"></div>
<script>
    var div = document.getElementByTagName("div");
    div.className //cls1 cls2
    div.style //对象
</script>

// 2.
<a href="//m.taobao.com"></a>
<script>
    var a = document.getElementByTagName("a");
    a.href; // "http://m.taobao.com" --> property
    a.getAttribute('href'); // "//m.taobao.com" --> attribute
</script>

// 3.
<input value="cute"/>
<script>
    var input = document.getElementByTagName("input");
    // property没设置则结果是attribute
    input.value; //cute
    input.getAttribute('value'); //cute
    // value属性已设置，attribute不变，property变化
    // 元素上实际的效果是property优先
    input.value="hello";
    input.value; //hello
    input.getAttribute('value'); //cute
</script>
```


**设计组件状态**
Attribute, Porperty, Config, State是否应该设置为统一？

\ | Markup set| JS set | JS change | User Input Change
---|---|---|---|---
Property | F | T | T | ?
Attribute | T | T | T | ?
State | F | F | F | T 
Config | F | T | T | F

用Symbol实现私有化

**Children**
* Content
```
<my-button><img src="{{icon}}"/>{{title}}<my-button>
```
* Template: 根据数据来产生
```
<my-list data="{{data}}">
    <li><img src="{{icon}}" /></li>
</my-list>
```

### 生命周期
created ---> destroyed

## JSX
* npm init
* npm install -g webpack webpack-cli
* webpack --version
* npm install --save-dev webpack babel-loader
* create webpack.config.js
    ```
    module.exports = {
      entry: "./main.js"
    }
    ```

* npm install --save-dev @babel/core @babel/preset-env
```
module.exports = {
  entry: "./main.js",

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  mode: "development"
}
```

* npm install --save-dev @babel/plugin-transform-react-jsx
* npm install webpack-dev-server --save-dev
* npm install --save-dev webpack-cli
* npm install webpack-cli@3.3 -D (webpack-cli是4.\*版本会和webpack-dev-server 3.\* 版本不兼容)


## 动画 Animation

处理**帧**: 人眼能识别动画的一个最高帧率是60帧（16ms）

```
setInterval(() => {}, 16);

let tick=()=>{
    setTimeout(() => {}, 16);
}

let tick=()=>{
    //申请浏览器执行下一帧时执行
    requestAnimationFrame(tick);
}

```

* 时间线
* 三次贝塞尔曲线

## 手势 Guesture
* 生命周期
* UI Events
    * 鼠标: mouseup/mousedown/mousemove
    * 触摸: touchstart/touchend/touchmove/touchcancel


## children机制

### 内容型
children的内容在DOM上显示，有多个少children, DOM上就会出现多少个

main.js
```
let a = <Button>
   Content
</Button>

a.mountTo(document.body)
```
Button.js
```
class Button extends Component {
  constructor() {
    super();
  }
  render() {
    this.childContainer = <span />;
    this.root = (<div>{this.childContainer}</div>).render();
    return this.root;
  }
  appendChild(child) {
    if (!this.childContainer) {
      this.render();
    }
    this.childContainer.appendChild(child);
  }
}
export default Button;
```
### 模板型
children的内容不是真正的children,而是一个模板。DOM显示的内容是根据模板渲染后的结果。

main.js
```
let a = <List data={d}>
  {
    (record) =>
      <div>
        <img src={record.img}></img>
        <a href={record.url}>{record.title}</a>
      </div>
  }
</List>
```
List.js
```
class List extends Component {
  constructor() {
    super();
  }
  render() {
    this.children = this[ATTRIBUTE].data.map(this.template);
    this.root = (<div>{this.children}</div>).render();
    return this.root;
  }
  appendChild(child) {
    this.template = (child);
  }
}

export default List;
```