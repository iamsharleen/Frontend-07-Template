## 排版Layout

### 根据浏览器属性进行排版
* 三代排版技术
    * 正常流: position, display, float, ...
    * Flex
    * Grid

### 收集元素进行
* 分行
    * 根据主轴尺寸把元素分进行
    * no-wrap: 强行分配进第一行

### 计算主轴
* 计算主轴方向
    *　找出所有Flex元素
    *　把轴方向的剩余尺寸按比例分配
    *　剩余尺寸<0，所有flex元素为0，等比例压缩剩余元素

### 计算交叉轴
* 计算交叉轴方向
    * 根据每一行中最大尺寸计算行高
    * 根据行高flex-align和item-align，确定元素的具体位置

## 渲染
1. 绘制单个元素
2. 绘制DOM树


---
#　总结

##　浏览器
1. HTTP请求：URL --> HTML
    * 状态机
    * HTTP协议：request/response
2. HTML解析: HTML --> DOM
    * 拆分HTML文件
    * 标签、元素、属性
    * 构建DOM
3. CSS计算：DOM --> 带CSS的DOM
    * 选择器
    * specificity的计算逻辑
4. 排版：DOM --> 有position信息的DOM
    * Flex布局 
5. 渲染：DOM --> 图形
    * 使用现有的images库

