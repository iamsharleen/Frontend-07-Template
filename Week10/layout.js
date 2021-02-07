//　预处理
function getStyle(element) {
  if (!element.style) {
    //　存放计算出来的属性
    element.style = {}
  }
  for (let prop in element.computedStyle) {
    //let p = element.computedStyle.value;
    element.style[prop] = element.computedStyle[prop].value;

    if (element.style[prop].toString().match(/px$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }

    if (element.style[prop].toString().match(/p~[0-9\.]+$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }
  }
  return element.style;
}

function layout(element) {
  if (!element.computedStyle) {
    return;
  }
  let elementStyle = getStyle(element);
  // 如果不是flex排版则结束
  if (elementStyle.display !== 'flex') {
    return;
  }
  // 1. 预处理
  //　把文本节点过滤
  let items = element.children.filter(e => e.type === 'element');
  //　排序，为了支持order属性
  items.sort((a, b) => {
    return (a.order || 0) - (b.order || 0);
  });

  let style = elementStyle;
  ['width', 'height'].forEach(size => {
    if (style[size] === 'auto' || style[size] === '') {
      style[size] = null;
    }
  });

  if (!style.flexDirection || style.flexDirection === 'auto') {
    style.flexDirection = 'row';
  }
  if (!style.alignItems || style.alignItems === 'auto') {
    style.alignItems = 'stretch';
  }
  if (!style.justifyContent || style.justifyContent === 'auto') {
    style.justifyContent = 'flex-start';
  }
  if (!style.flexWrap || style.flexWrap === 'auto') {
    style.flexWrap = 'nowrap';
  }
  if (!style.alignContent || style.alignContent === 'auto') {
    style.alignContent = 'stretch';
  }

  let mainSize, mainStart, mainEnd, mainSign, mainBase,
    crossSize, crossStart, crossEnd, crossSign, crossBase;

  if (style.flexDirection === 'row') {
    mainSize = 'width';//主轴尺寸
    mainStart = 'left';
    mainEnd = 'right';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }
  if (style.flexDirection === 'row-reverse') {
    mainSize = 'width';
    mainStart = 'left';
    mainEnd = 'left';
    mainSign = -1;
    mainBase = style.width;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }
  if (style.flexDirection === 'column') {
    mainSize = 'height';
    mainStart = 'top';
    mainEnd = 'bottom';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }
  if (style.flexDirection === 'column-reverse') {
    mainSize = 'height';
    mainStart = 'bottom';
    mainEnd = 'bop';
    mainSign = -1;
    mainBase = 0;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }

  if (style.flexWrap === 'wrap-reverse') {
    //　把交叉轴的开始和结束互换
    var tmp = crossStart;
    crossStart = crossEnd;
    crossEnd = tmp;
    crossSign = -1;
  } else {
    crossBase = 0;
    crossSign = 1;
  }

  // 2.　收集元素进行
  let isAutoMainSize = false;
  if (!style[mainSize]) {// auto sizing
    elementStyle[mainSize] = 0;
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let itemStyle = getStyle(item);
      if (itemStyle[mainSize] !== null || itemStyle[mainSize]) {
        elementStyle[mainSize] = elementStyle[mainSize];
      }
    }
    isAutoMainSize = true;
  }

  let flexLine = [];
  let flexLines = [flexLine];
  //　剩余空间＝父元素主轴尺寸　
  let mainSpace = elementStyle[mainSize];
  //　交叉轴尺寸
  let crossSpace = 0;

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let itemStyle = getStyle(item);
    if (itemStyle[mainSize] === null) {
      itemStyle[mainSize] = 0;
    }

    if (itemStyle.flex) {
      // 有flex属性，元素是可伸缩的
      flexLine.push(item);
    } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
      mainSpace = itemStyle[mainSize];
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize])
      }
      flexLine.push(item);
    } else {
      if (itemStyle[mainSize] > style[mainSize]) {
        itemStyle[mainSize] = style[mainSize];
      }
      if (mainSpace < itemStyle[mainSize]) {//剩余空间不足，则换行
        flexLine.mainSpace = mainSpace;
        flexLine.crossSpace = crossSpace;
        flexLine = [item];// 创建新行
        flexLines.push(flexLine);
        mainSpace = style[mainSize];
        crossSpace = 0;
      } else {
        flexLine.push(item);
      }
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        crossSpace = Math.max(crossSpace, itemStyle[mainSize]);
      }
      mainSpace -= itemStyle[mainSize];
    }
  }
  // 最后一行
  flexLine.mainSpace = mainSpace;

  //　3.　计算主轴
  if (style.flexWrap === 'nowrap' || isAutoMainSize) {
    flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace;
  } else {
    flexLine.crossSpace = crossSpace;
  }

  if (mainSpace < 0) {// 剩余尺寸<0, 对所有元素根据主轴size进行等比压缩(单行)
    let scale = style[mainSize] / (style[mainSize] - mainSpace);
    let currentMain = mainBase;
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let itemStyle = getStyle(item);

      if (itemStyle.flex) {
        // 所有flex元素为0
        itemStyle[mainSize] = 0;
      }
      itemStyle[mainSize] = itemStyle[mainSize] * scale;
      itemStyle[mainStart] = currentMain;
      itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
      currentMain = itemStyle[mainEnd];
    }
  } else {
    flexLines.forEach((items) => {
      let mainSpace = items.mainSpace;
      let flexTotal = 0;// 统计flex元素

      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let itemStyle = getStyle(item);

        if (itemStyle.flex !== null && itemStyle.flex !== (void 0)) {
          flexTotal += itemStyle.flex;
          continue;
        }
      }
      if (flexTotal > 0) {
        let currentMain = mainBase;
        for (let i = 0; i < items.length; i++) {
          let item = items[i];
          let itemStyle = getStyle(item);

          if (itemStyle.flex) {
            //平均分配给每个flex元素
            itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
          }
          itemStyle[mainStart] = currentMain;
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd];
        }
      } else {
        if (style.justifyContent === 'flex-start') {
          let currentMain = mainBase;
          let step = 0;
        }
        if (style.justifyContent === 'flex-end') {
          let currentMain = mainSpace * mainSign + mainBase;
          let step = 0;
        }
        if (style.justifyContent === 'centre') {
          let currentMain = mainSpace / 2 * mainSign + mainBase;
          let step = 0;
        }
        if (style.justifyContent === 'space-between') {
          let step = mainSpace / (item.length - 1) * mainSign;
          let currentMain = mainBase;
        }
        if (style.justifyContent === 'space-around') {
          let step = mainSpace / item.length * mainSign;
          let currentMain = step / 2 + mainBase;
        }
        for (let i = 0; i < items.length; i++) {
          let item = items[i];
          itemStyle[mainstart, currentMain];
          itemStyle[mainEnd] = itemStyle[mainstart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd] + step;
        }
      }
    });
  }

  //　4. 计算交叉轴
  //let crossSpace;
  if (!style[crossSize]) {//　auto sizing
    //　计算剩余行高
    crossSpace = 0;
    elementStyle[crossSize] = 0;
    for (let i = 0; i < flexLines.length; i++) {
      elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
    }
  } else {
    crossSpace = style[crossSize];
    for (let i = 0; i < flexLines.length; i++) {
      crossSpace -= flexLines[i].crossSpace;
    }
  }

  //　分配行高
  if (style.flexWrap === 'wrap-reverse') {
    crossBase = style[crossSize];
  } else {
    crossBase = 0;
  }
  let lineSize = style[crossSize] / flexLines.length;

  let step;
  if (style.alignContent === 'flex-start') {
    crossBase += 0;
    step = 0;
  }
  if (style.alignContent === 'flex-end') {
    crossBase += crossSign * crossSpace;
    step = 0;
  }
  if (style.alignContent === 'centre') {
    crossBase += crossSign * crossSpace / 2;
    step = 0;
  }
  if (style.alignContent === 'space-between') {
    crossBase += 0;
    step = crossSpace / (flexLines.length - 1);
  }
  if (style.alignContent === 'space-around') {
    step = crossSpace / (flexLines.length);
    crossBase += crossSign * step / 2
  }
  if (style.alignContent === 'stretch') {
    step = 0;
    crossBase += 0;
  }
  // 对每一行进行处理
  flexLines.forEach((items) => {
    // 真实交叉轴尺寸
    let lineCrossSize = style.alignContent === 'stretch' ?
      items.crossSpace + crossSpace / flexLines.length : items.crossSpace;

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let itemStyle = getStyle(item);

      let align = itemStyle.alignSelf || style.alignItems;
      if (itemStyle[crossSize] === null) {
        itemStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0;
      }

      if (align === 'flex-start') {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];

      }
      if (align === 'flex-end') {
        itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
        itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];

      }
      if (align === 'centre') {
        itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSign]) / 2;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }
      if (align === 'stretch') {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null &&
          itemStyle[crossSize] !== (void 0)) ? itemStyle[crossSize] : lineCrossSize);

        itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
      }
    }
    crossBase += crossSign * (lineCrossSize + step)
  });
}

module.exports = layout;