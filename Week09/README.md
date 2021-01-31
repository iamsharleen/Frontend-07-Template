# 学习笔记

## HTML解析
### 语法分析
1. HTML parse模块的文件拆分
2. 用FSM实现HTML分析
3. 解析标签
    * 标签：
        * 开始标签
        * 结束标签
        * 自封闭标签
4. 创建元素
5. 处理属性
### 语法分析
6. 用token构建DOM树
    *栈
7. 将文本节点加到DOM树

## CSS计算
1. 收集CSS规则
2. 添加调用
    * 创建一个元素后立即计算CSS
    * 分析一个元素时，所有CSS规则已收集完毕
    * 真实浏览器中可能遇到写在body中的style，需重新计算CSS（忽略）
3. 获取父元素序列
    * 必须知道元素的所有父元素才能判断元素是否与规则匹配
    * 从stack中首先获取的是当前元素，所以计算父元素匹配的顺序是从内到外
    ```
    //slice: stack元素不断变化，可能会污染。slice用于截取数组，不会影响原数组
    //reverse: 标签匹配会从当前元素开始逐级往外匹配
    var elements = stack.slice().reverse();
    ```
4. 选择器与元素的匹配
5. 计算选择器与元素匹配
6. 生成computed属性
7. specificity的计算逻辑
    * id > class > tagName
    ```
    [0,0,0,0] = [inline,id,class,tag]
    
    e.g.
    a: div div #id => [0,1,0,2]
    b: div #my #id =>[0,2,0,1]
    c: div #id => [0,1,0,1]
    b: div .class #id => [0,1,1,1]
    
    Result:
    b>a
    a>c
    d>a

    ```

## 查漏补缺
### CSS选择器
1. Universal
    * \*
2. Type
    * E
3. Attribute
    * E[foo]
    * E[foo="bar"]
    * E[foo~="bar"]
    * E[foo^="bar"]
    * E[foo$="bar"]
    * E[foo*="bar"]
    * E[foo|="en"]
    * E:root
3. Pseudo-classes
    * E:nth-child(n)
    * E:nth-last-child(n)
    * E:nth-of-type(n)
    * E:nth-last-of-type(n)
    * E:first-child
    * E:last-child
    * E:first-of-type
    * E:last-of-type
    * E:only-of-type
    * E:empty
    * E:link
    * E:visited
    * E:active
    * E:hover
    * E:focus
    * E:target
    * E:lang(fr)
    * E:enabled
    * E:disabled
    * E:checked
    * E:not(s)
4. pseudo-element
    * E::first-line
    * E::first-letter
    * E::before
    * E::after
5. Class
    * E.warning
6. ID
    * E#myid
7. Combinator
    * E F
    * E>F
    * E+F
    * E~F
    
## TODO
支持CSS复杂选择器