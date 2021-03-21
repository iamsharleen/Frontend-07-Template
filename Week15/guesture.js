let element = document.documentElement;
let contexts = new Map();
//处理鼠标左右键同时按下
let isListeningMouse = false;
//　鼠标
element.addEventListener("mousedown", e => {
  let context = Object.create(null);
  //　left =0, right=2, mid =1
  console.log("mousedown", e.button, (1 << e.button));
  //contexts.set("mouse" + e.button, context);
  // 1 2 4 8 16 ...
  contexts.set("mouse" + (1 << e.button), context);

  start(e, context);

  let mousemove = e => {
    let button = 1;
    //　掩码
    while (button <= e.buttons) {
      if (button & e.buttons) {

        // order of buttons & button property is not same
        let key;
        if (button === 2) {
          key = 4;
        } else if (button === 4) {
          key = 2;
        } else {
          key = button;
        }
        console.log("mousemove: ", "mouse" + key);
        contexts.get("mouse" + key);
        move(e, context);
      }
      button = button << 1;
    }
  }

  let mouseup = e => {
    console.log("mouseup", "mouse" + (1 << e.button));
    let context = contexts.get("mouse" + (1 << e.button));
    end(e, context);
    contexts.delete("mouse" + (1 << e.button))

    if (e.buttons === 0) {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
      isListeningMouse = false;
    }

  }

  if (!isListeningMouse) {
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
    isListeningMouse = true;
  }

});



//　触屏
element.addEventListener("touchstart", e => {
  //console.log(e.changedTouches)
  for (let touch of e.changedTouches) {
    let context = Object.create(null);
    contexts.set(touch.identifier, context);
    start(touch, context);
  }
});

element.addEventListener("touchmove", e => {
  //console.log(e.changedTouches)
  for (let touch of e.changedTouches) {
    let context = contexts.get(touch.identifier);
    move(touch, context);
  }
});

element.addEventListener("touchend", e => {
  //console.log(e.changedTouches)
  for (let touch of e.changedTouches) {
    let context = contexts.get(touch.identifier);
    end(touch), context;
    contexts.delete(ouch.identifier);
  }
});

element.addEventListener("touchcancel", e => {
  //console.log(e.changedTouches)
  for (let touch of e.changedTouches) {
    let context = contexts.get(touch.identifier);
    cancel(touch), context;
    contexts.delete(ouch.identifier);
  }
});

// let handler;
// let startX, startY;
// let isPan = false, isTap = true, isPress = false;

let start = (point, context) => {
  //console.log("start", point.clientX, point.clientY);

  context.startX = point.clientX;
  context.startY = point.clientY;

  context.points = [{ t: Date.now(), x: point.clientX, y: point.clientY }]

  context.isPan = false;
  context.isTap = true;
  context.isPress = false;

  context.handler = setTimeout(() => {
    console.log("press");
    context.isPan = false;
    context.isTap = false;
    context.isPress = true;
    context.handler = null;
  }, 500);
}
let move = (point, context) => {
  //console.log("move", point.clientX, point.clientY)

  let dx = point.clientX - context.startX;
  let dy = point.clientY - context.startY;

  if (dx ** 2 + dy ** 2 > 100) {
    console.log("panstart...");
    context.isPan = true;
    context.isTap = false;
    context.isPress = false;

    clearTimeout(context.handler);
  }

  if (context.isPan) {
    console.log("pan...", dx, dy)
  }
  //只存储0.5s内的点
  context.points = context.points.filter(p => Date.now() - p.t < 500);
  context.points.push({
    t: Date.now(),
    x: point.clientX,
    y: point.clientY
  })

}
let end = (point, context) => {
  //console.log("end", point.clientX, point.clientY);

  if (context.isTap) {
    console.log("tap");
    dispatch("tap", {})
    clearTimeout(context.handler);
  }
  if (context.isPress) {
    console.log("pressend")
  }
  if (context.isPan) {
    console.log("panend")
  }

  let d, v;
  context.points = context.points.filter(p => Date.now() - p.t < 500);
  if (!context.points.length) {
    v = 0;
  } else {

    d = Math.sqrt((point.clientX - context.points[0].x) ** 2 +
      (point.clientY - context.points[0].y) ** 2);

    v = d / (Date.now() - context.points[0].t);
  }
  console.log("v--->", v);
  if (v > 1.5) {
    console.log("flick");
    context.isFlick = true;
  } else {
    context.isFlick = false;
  }
}


let cancel = (context) => {
  clearTimeout(context.handler);
}

let flick = () => {
  //判断速度，存储一段时间内的点
}

//　派发事件
function dispatch(type, context, properties) {
  let event = new Event(type);

  console.log(event);
  for (let name in properties) {
    event[name] = properties[name];
  }

  element.dispatchEvent(event);

}