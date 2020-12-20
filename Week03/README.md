# 学习总结

## RegExp

### exec()
1. return: Array or null
2. /g标签和lastIndex属性
    - /g 表示该表达式将用来在输入字符串中查找所有可能的匹配，返回的结果可以是多个。如果不加/g最多只会匹配一个
    - lastIndex 下一次开始匹配的下标

* 有/g标签
```
let myRe = /ab*/g;
let str = 'abbcdefabh';
let myArray;
//第一次
myArray = myRe.exec(str);//["abb", index: 0, input: "abbcdefabh", groups: undefined]
myRe.lastIndex; //3
//第二次
myArray = myRe.exec(str);//["ab", index: 7, input: "abbcdefabh", groups: undefined]
myRe.lastIndex; //9
//第三次
myArray = myRe.exec(str);//null
myRe.lastIndex; //0

```

* 无/g标签（慎用在while里面！）
```
let myRe = /ab*/;
let str = 'abbcdefabh';
let myArray;
//第一次
myArray = myRe.exec(str);//["abb", index: 0, input: "abbcdefabh", groups: undefined]
myRe.lastIndex; //0
//第二次
myArray = myRe.exec(str);//["abb", index: 0, input: "abbcdefabh", groups: undefined]
myRe.lastIndex; //0
//第三次
myArray = myRe.exec(str);//["abb", index: 0, input: "abbcdefabh", groups: undefined]
myRe.lastIndex; //0

```

## AST抽象语法树

[AST对象文档](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API#Node_objects)

* LL
* LR
* LALR

* 词法分析
* 语法分析