
# 编程与算法训练总结

1. 异步机制
    * callback：setTimeout()嵌套使用
    * Promise
    * generator
    * async/await

2. 寻路算法
    * BFS
    * 启发函数
    * A*

3. AST抽象语法树和正则表达式
4. 字符串处理
    * 字典树: 大量高重复字符串的存储和分析
    * KMP: 长字符串里找模式
    * Wildcard: 带通配符匹配
    * 正则: 字符串通用模式匹配
    * 状态机：通用字符串分析
    * LL/LR: 字符串多层结构分析

# 第五周学习笔记
## Proxy
修改某些操作的默认行为。Proxy
* Constructor
```
let p = new Proxy(object, handler)
```
* methods
```
apply()
get(obj, key)
set(obj, key, value)
deleteProperty(obj, key)
ownKeys(obj, key)
has(obj, key)
defineProperty(obj, key, desc)
getOwnPropertyDescriptor(obj, key)
getPrototypeOf()
setPrototypeOf()
iseExtensible()
preventExtensions()

```
* 使用Proxy和effect()模拟Vue - Reactivity双向绑定



## Range
The Range interface represents a fragment of a document that can contain nodes and parts of text nodes.
```
Document.createRange()
Selection.getRangeAt()
Document.careRangeFromPoint()
```
