# 组件化

**组件 vs 对象**
* 对象
    * Porperties
    * Methods
    * Inherit

* 组件
    * Porperties：强调从属关系
    * Methods
    * Inherit
    * Attribute：强调描述性 Markup Code
    * Config & State
    * Event
    * Lifecycle
    * Children

**Porperty vs Attribute**
```
<div class="cls1 cls2" style="color:blue"></div>

<script>
    var div = document.getElementByTagName("div");
    div.className //cls1 cls2
    div.style 
</script>
```
class - Attribute
className - Porperty

```
<input value="cute"/>
    
<script>
    var input = document.getElementByTagName("input");
    
    input.value; //cute
    input.getAttribute('value'); //cute
    
    input.value="hello";
    input.value; //hello
    input.getAttribute('value'); //cute
</script>
```
Attribute, Porperty, Config, State是否应该设置为统一？