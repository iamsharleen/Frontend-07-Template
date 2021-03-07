# HTML

## XML & SGML

DTD
XML namespace

## HTML标签语义

strong
em

ol

## HTML语法
* 合法元素
    * Element:<tagname>...</tagname>
    * Text: text
    * Comment: <!-- comments -->
    * DocumentType: <!Doctype html>
    * ProcessingInstructor: <?a 1?>
    * CDATA:<![CDATA[ ]]> 文本节点，不用考虑转义
* 字符引用
    * &#161; ASCII为161
    * &amp;
    * &lt;
    * &quot;

# 浏览器API

## DOM API
* 节点Node
* 事件
* Range

### 操作
1. 导航
    * Node
        * parentNode
        * childNodes
        * firstNode
        * lastNode
        * nextSibling
        * previousSibling
    * Element
        * parentElement
        * children
        * firstElementChild
        * lastElementChild
        * nextElementSibling
        * previousElementSibling
2. 修改
    * appendChild
    * insertBefore
    * removeChild
    * replaceChild
3. 高级
    * compareDocumentPosition
    * contains
    * isEqualNode　是否相同
    * isSameNode　是否同一节点(等同js的"===")
    * cloneNode　复制节点（深克隆）
   
## 事件API

* 冒泡：首先执行当前节点绑定的方法，完毕后冒泡至父节点，直至DOM根节点
* 捕获：先执行根节点绑定的方法，完成后下降至子节点，直至当前节点

**target.addEventListener(type, listener, options);**
* options：
    * capture: 表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发
        * true: 在捕获阶段触发
        * false: 在冒泡阶段触发
    * once: 在添加之后最多只调用一次
    * passive: 设置为true时，表示 listener 永远不会调用 preventDefault()
```
  a.addEventListener("click", () => { console.log("a") });
  b.addEventListener("click", () => { console.log("b") });
  a.addEventListener("click", () => { console.log("a1") }, true);
  b.addEventListener("click", () => { console.log("b1") }, true);
  b.addEventListener("click", () => { console.log("b2") });
  
  //Result: click b => a1 b b1 b2 a
  
```
阻止冒泡
```
  a.addEventListener("click", () => { console.log("a3") });
  b.addEventListener("click", (e) => {
    console.log("b3");
    e.stopPropagation();
  });
```


## Range API
 
```
var range = new Range();
range.setStart(element, 9);
range.setEnd(element, 4);
var range = document.getSelection().getRangeAt(0);

range.setStartBefore
range.setEndBefore
range.setStartAfter
range.setEndAfter
range.selectNode
range.selectNodeContents


var frament = range.extracContents()
range.insertNode(document.createTextNode("aaaa"));

```


## CSSOM
对CSS文档的抽象

**使用CSS**
```
<style title="Hello">
    a::before {
      color: red;
      content: "Hello";
    }
  </style>
  <link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blue%7D">

```
**document.styleSheets**
通过document.styleSheets访问Rule
* document.styleSheets[0].cssRules
* document.styleSheets[0].insertRule("p {color:pink}",0)
* document.styleSheets[0].removeRule(0)
```
document.styleSheets[0].cssRules[0].style.color="yellow";
```

**Rule**
* CSSStyleRule
    * selectorText String
    * style K-V结构

window.getComputedStyle(elt, pseudoElt);
    * elt想要获取的元素
    * pseudoElt 可选，伪元素
```
getComputedStyle(document.querySelector("a"));
getComputedStyle(document.querySelector("a"),"::before");
getComputedStyle(document.querySelector("a"),"::before").color;
```

## CSSOM View

### window
* window.innerHeight, window.innerWidth（HTML内容实际渲染所用的区域）
* window.outerWidth, window.outerHeight（浏览器窗口总共占用的部分）
* window.devicePixelRatio（屏幕物理象素：代码的逻辑象素px）
* window.screen（实际屏幕）
    * window.screen.width
    * window.screen.height
    * window.screen.availWidth
    * window.screen.availHeigth
* window.open("about:blank", "_blank", "width=100,height=100,left=100,right=100")
* moveTo(x,y)
* moveBy(x,y)
* resizeTo(x,y)
* resizeBy(x,y)
```
<button id="open"
  onclick="window.w = window.open('about:blank','_blank','width=100,height=100,left=100,right=100')">open</button>
<button onclick="w.resizeBy(30,30)">resize</button>
<button onclick="w.moveBy(30,30)">move</button>
```

### scroll
有滚动条的时候才生效
* scrollTop
* scrollLeft
* scrollWidth
* scrollHeigth
* scroll(x,y)
* scrollBy(x,y)
* scrollIntoView

* window.scrollX
* window.scrollY
* window.scroll(x,y)
* window.scrollBy(x,y)


### layout
* getClientRects() 所有的盒
* getBoundingClientRect()　圈住所有的盒
```

<style>
  .x::before {
    content: "额外　额外　额外　额外　";
    background-color: pink;
  }
</style>

<div style="width: 100px;height:400px; overflow: scroll;">
  文字　<span class="x" style="background: lightblue;">文字　文字　文字　文字　文字</span>
</div>

<script>
  let x = document.getElementsByClassName("x")[0]
  x.getClientRects();
　x.getBoundingClientRect();
</script>

```

## 其它

* W3C: webaudio, CF/WG
* ECMA: ECMAScript
* khronos: WebGL
* WHATWG: HTML


## 作业
对全部的 API 进行分类和整理，剩余133个