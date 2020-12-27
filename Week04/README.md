# Week 4 - 学习总结

## 字符串处理
1. 字典树: 大量高重复字符串的存储和分析
2. KMP: 长字符串里找模式
3. Wildcard: 带通配符匹配
4. 正则: 字符串通用模式匹配
5. 状态机：通用字符串分析
6. LL/LR: 字符串多层结构分析

## Symbol
用途：创建一个独一无二的值
```
//语法: Symbol([description])，不支持new Symbol
let $ = Symbol("$")

let a1 = Symbol('a')
let a2 = Symbol('a')
a1 == a2 // false

let symbol = Symbol('foo');
console.log(typeof symbol);//symbol
console.log(symbol.toString());//console.log(symbol.toString());
console.log(symbol === 'foo');//false
```

## TODO
wildcard的正则用KMP算法替代