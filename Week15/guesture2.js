
//new Listener(new Recognizer(dispatch)

// listener
export class Listener {
  constructor(element, recognizer) {
    let contexts = new Map();
    //处理鼠标左右键同时按下
    let isListeningMouse = false;

    //　鼠标
    element.addEventListener("mousedown", e => {
      let context = Object.create(null);
      //contexts.set("mouse" + e.button, context);
      // 1 2 4 8 16 ...
      contexts.set("mouse" + (1 << e.button), context);

      recognizer.start(e, context);

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
            //console.log("mousemove: ", "mouse" + key);
            contexts.get("mouse" + key);
            recognizer.move(e, context);
          }
          button = button << 1;
        }
      }

      let mouseup = e => {
        //console.log("mouseup", "mouse" + (1 << e.button));
        let context = contexts.get("mouse" + (1 << e.button));
        recognizer.end(e, context);
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
  }

}

// recognize
export class Recognizer {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  start(point, context) {
    //console.log("start", point.clientX, point.clientY);
    context.startX = point.clientX;
    context.startY = point.clientY;
    context.points = [{ t: Date.now(), x: point.clientX, y: point.clientY }]
    context.isPan = false;
    context.isTap = true;
    context.isPress = false;

    context.handler = setTimeout(() => {
      context.isPan = false;
      context.isTap = false;
      context.isPress = true;
      context.handler = null;

      this.dispatcher.dispatch("press", {})
    }, 500);
  }
  move(point, context) {
    let dx = point.clientX - context.startX;
    let dy = point.clientY - context.startY;

    if (dx ** 2 + dy ** 2 > 100) {
      context.isPan = true;
      context.isTap = false;
      context.isPress = false;
      context.isVerical = Math.abs(dx) < Math.abs(dy);
      this.dispatcher.dispatch("panstart", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVerical: context.isVerical
      })

      clearTimeout(context.handler);
    }

    if (context.isPan) {
      this.dispatcher.dispatch("pan", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVerical: context.isVerical
      })
    }
    //只存储0.5s内的点
    context.points = context.points.filter(p => Date.now() - p.t < 500);
    context.points.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    })

  }
  end(point, context) {
    //console.log("end", point.clientX, point.clientY);
    if (context.isTap) {
      this.dispatcher.dispatch("tap", {})
      clearTimeout(context.handler);
    }
    if (context.isPress) {
      this.dispatcher.dispatch("pressend", {})
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
    if (v > 1.5) {
      context.isFlick = true;
      this.dispatcher.dispatch("flick", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVerical: context.isVerical,
        isFlick: context.isFlick,
        velocity: v
      })
    } else {
      context.isFlick = false;
    }

    if (context.isPan) {
      this.dispatcher.dispatch("panned", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVerical: context.isVerical,
        isFlick: context.isFlick
      })
    }
  }
  cancel(context) {
    clearTimeout(context.handler);
    this.dispatcher.dispatch("cancel", {})
  }

}

// dispatch 派发事件
class Dispatcher {
  constructor(element) {
    this.element = element;
  }
  dispatch(type, properties) {
    let event = new Event(type);
    for (let name in properties) {
      event[name] = properties[name];
    }
    //console.log("dispatcher: ", type, event)
    this.element.dispatchEvent(event);

  }
}



export function enableGuesture(element) {
  new Listener(element, new Recognizer(new Dispatcher(element)));
}