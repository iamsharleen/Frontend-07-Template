# 学习笔记

## 排版
### 盒Box

* 标签Tag：源代码
* 元素Element：节点的一种
* 盒Box：排版和渲染的基本单位

#### 盒模型
* box-sizing
    * content-box
    * border-box: content-box + padding


### 正常流
* 收集盒和文字进行
* 计算盒和文字在行中的排布
* 计算行的排布

1. 行级排布 IFC line-box
* 基线baseline
* line-top
* text-top
* text-bottom
* line-bottom 

2. 块级排布 BFC block-level-box

* 两个特殊机制
    * float: 会造成堆叠、重排
    * clear：强制换行
    ```
      <div style="margin:10px;float: right;width: 100px;height: 100px;background-color: blue;">3</div>
      <div style="clear:right;margin:10px;float: right;width: 100px;height: 100px;background-color: blue;">4</div>
    ```
    * margin collapse: 只会发生在BFC


#### BFC合并
* Block
    * Block Container: 里面有BFC
        * block
        * inline-block
        * table-cell
        * flex item
        * grid cell
        * table-caption
    * Block-level Box：外面有BFC
        * display:block
        * display:flex
        * display:table
        * display:grid
        * display:inline-block
        * display:inline-flex
        * display:inline-table
        * display:inline-grid
        * display:run-in
    * Block Box：里外都有BFC

* 设立BFC: 能容纳正常流的盒，都认为它会创建BFC(例外：block box && overflow:visible)
    a. floats
    b. absolutely positioned elements
    c. block containers(inline-blocks, table-cells and table-captions) are not block boxes
    d. block boxes with 'overflow' other than 'visible'

* BFC合并
    * block box && overflow:visible
        a. BFC合并与float
        b. BFC合并与边距折叠
    ```
    <div style="float: right; width: 100px; height: 100px; background-color: aqua; margin:20px"></div>

    <div style="background-color: pink; overflow: visible; margin:30px">
    ...
    </div>
    ```

### Flex排版
* 收集盒进行
* 计算盒在主轴方向的排布(Main Axis)
* 计算盒在交叉轴方向的排布(Cross Axis)

* 分行
    * 根据主轴尺寸，把元素分进行 
    * 设置了no-wrap,则强行分配进第一行
* 计算主轴方向
    * 找出所有flex元素
    * 把主轴方向剩余尺寸按比例分配
    * 剩余空间为负数，flex元素为0，等比压缩剩余元素

* 计算交叉轴方向
    * 根据每一行中最大元素尺寸计算行高
    * 根据行高flex-align和item-align确定元素具体位置




    
## 动画与绘制
### 动画 Animation
* @keyframs
* animation
    * animation-name 曲线
    * animation-duration　时长
    * animation-timing-funcion　时间曲线
    * animation-delay　开始前的延迟
    * animation-iteration-count　播放次数
    * animation-direction 方向
```
@keyframes mykf {
    // 用from to 或百分比
    from {
      background-color: red;
    }

    to {
      background-color: yellow;
    }
  }

  div {
    animation: mykf 5s infinite;
  }
 
    
```
* Transition
    * transition-property
    * transition-duration
    * transition-timing-function
    * transition-delay
    * cubic-bezier 贝塞尔曲线dubic-bezier.com


### 颜色

* CMYK
* RGB
* HSL: 色相　纯度　亮度
* HSV: 色相　纯度　明度

### 绘制
* 几何图形
    * border
    * box-shadow
    * border-radius
* 文字
    * font
    * text-decoration
* 位图
    * background-image
