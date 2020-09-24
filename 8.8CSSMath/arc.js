//注册paint
registerPaint(
  'background-canvas',
  class {
    static get inputProperties() {
      return ['--background--canvas'];  //返回paint使用的变量
    }
    paint(ctx, geom, properties) {
      eval(properties.get('--background--canvas').toString())(ctx, geom);  //执行--background--canvas函数
    }
  }
);
