# 学习笔记

## 总论
### 总体结构
* @charset
* @import
* rules
    * @media
    * @page
    * rule

### @规则
* @charset
* @import
* @media
* @page
* @counter-style
* @keyframes
* @fontface
* @support
* @namespace

### css规则的结构

* 选择器
    * selector_group
    * selector: > <sp> * ~
    * simple_selector
* 声明
    * Key: Properties, Variables
    * Value



## 选择器

### 选择器语法
#### 简单选择器
* *
* div svg|a
* .cls
* #id
* [attr=value]
* 伪类:hover
* 伪元素::before

#### 复合选择器
* <简单选择器><简单选择器><简单选择器>
* *或div必须写在最前面

#### 复杂选择器
* <复合选择器><sp><复合选择器>：子孙
* <复合选择器>">"<复合选择器>：父子
* <复合选择器>"~"<复合选择器>: 表示某元素后所有同级的指定元素（所有）
* <复合选择器>"+"<复合选择器>: 表示某元素后相邻的兄弟元素（单个）
* <复合选择器>"||"<复合选择器>

### 选择器优先级
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

### 伪类
* 链接/行为
    * :any-link　所有超链接
    * :link 
    * :visited
    * :hover
    * :active
    * focus
    * target
* 树结构
    * ::empty
    * :nth-child()
    * :nth-last-child()
    * :first-child
    * :last-child
    * :only-child
* 逻辑型
    * :not伪类
    * :where
    * :has

### 伪元素

* ::before
* ::after
* ::first-line
* ::first-letter
* first-line和first-letter作用于块级元
```
<div>
<::before/ >
content
<::after/ >
</div>


<div>
<::first-letter>c</::first-letter>content
content
<::after>
</div>
```



## 思考题
为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？

使用first-letter时，第一个字母可以括起来<::first-letter>c</::first-letter>，但是first-line 排版之后的行，不是源码中的行，在不同环境中控制元素的数量不同。

