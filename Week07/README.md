# 学习笔记

## 表达式　Expression
### 运算符和表达式
#### Member
* a.b 取出来的是引用
* a[b] 可以支持运行时的字符串
* foo`string`　优先级和Member一样　不是Member
* super.b 只在class构造函数中可用
* super['b']
* new.target 固定
* new Foo()

#### New
* new Foo　优先级低于new Foo()

```
new a()()
new new a()
```

#### Call
* foo()
* super()
* foo()['b']
* foo().b
* foo()`abc`

#### Left/Right handside
只有Left Handside可以放等号左边
```
a.b=c;// a.b是一个Left Handside
a+b=c;// error. a+b是一个Right Handside
```
不能放＝左边：
* Update
    * a++
    * a--
    * --a
    * ++a
```
++a++; //Invalid left-hand side expression in prefix operation
++(a++); //Invalid left-hand side expression in prefix operation
```

#### Unary单目运算符
* delete a.b delete后面必须是Reference类型
* void foo()　void后面加任何东西都是undefined
* typeof a
* +a
* -a
* ~a
* !a
* await a
#### Exponental:  \** 乘方　右结合
```
3**2**3; //6561
3**(2**3); //6561
(3**2)**3; //729
```
#### Multiplicative
\* / %

#### Aditive
\+ -
#### Shift
\<< >> >>>
#### Relationship
\< > <= >= instanceof in
#### Equality
\== != === !==
#### Bitwise
\$ ^ |
#### Logical
&& || (短路原则)
#### Conditional
<condition>?<state1>:<state2>　(短路原则)

### 类型转换 Type Convertion
#### 拆箱转换Unboxing
1. ToPremitive
2. toString vs valueOf
3. Symbol.toPrimitive


### 运行时
#### Completion Record
* [[type]]: normal, break, continue, return, throw
* [[value]]: 基本类型
* [[target]]: label
```
if(x==1) return 10;
```
#### 装箱转换Boxing
```
new Number(1);// 1
new String("a");// "a"
new Boolean(true); // true
new Object(Symbol("a")); // Symbol("a")
```

### 简单语句
* ExpressionStatement
* EmptyStatement
* DebuggerStatement
* ThrowStatement
* ContinueStatement
* BreakStatement
* ReturnStatement

### 组合语句
* Block
* If
* Switch
* Iteration
    * while
    * do while
    * for(;;)
    * for(in)
    * for(of)
* With
* Labelled
* Try 

### 声明 Declaration
* Function function
* Generator function*
* AsynFunction async function
* AsynGenerator async function*
* Variable 
* Class class
* Lexical 

### 函数调用
* Running Execution Context: 7
    * code evaluation state
    * Function
    * Script or Module
    * Generator
    * Realm: 保存所有内置对象
    * Lexical Environment：this new.target super 变量
    * Virable Environment：仅用于处理var声明
* Execution Context Stack