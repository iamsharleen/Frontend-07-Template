# 学习总结——第二周

## JavaScript
### 栈和队列
```
let array = [];

// stack
array.push(item)
let item = array.pop();

// queue
array.push(item);
array.shift();
```
### 删除数组中的最小元素
把元素放到最尾，用pop();
```
array[minIndex] = array[ength - 1];
array.pop();
```


## 寻路算法

### Steps
1. 把起点放入queue
2. queue中没有元素，且找不到终点，寻路失败
3. 检查当前点，寻找有可能的8个方向的点:
    - 已经被检查的忽略
    - 障碍物忽略
    - 加入queue
4. 直到找到终点

### 优化
1.　每次从queue中找距离最小的点

### 算法
1. BFS:
遍历所有可能的点，效率低
2. 贪婪算法:
从当前点找下一个最优的点，但不一定是最优路线
3. A*算法:
F=G+H

## 问题
1. 寻找最优路线
2. 算法结构优化：二叉堆