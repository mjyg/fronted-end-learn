class StarSky{
  constructor() {
    this.stars = [];
  }
  static get inputProperties(){
    return ['--star-density','--star-opacity']
  }
  paint(ctx, geom,properties){
    const xMax = geom.width; //元素的宽高
    const yMax = geom.height;
    console.log(xMax, yMax)
    ctx.fillRect(0,0,xMax,yMax);
    let starDensity = properties.get('--star-density').toString() || 1; //星星密度
    let starOpacity = properties.get('--star-opacity').toString() || 1;
    const stars = Math.round((xMax+yMax)*starDensity); //星星数量
    for(let i =0;i<stars;i++){  //得到星星
      const x = Math.floor(Math.random()*xMax + 1);
      const y = Math.floor(Math.random()*yMax + 1);
      const size = Math.floor(Math.random()*2 + 1);
      const hue = Math.floor(Math.random()*360 + 1);
      const opacityOne = Math.floor(Math.random()*9 + 1);
      const opacityTwo = Math.floor(Math.random()*9 + 1);
      const opacity = +('.'+ (opacityOne +opacityTwo))*starOpacity
      ctx.fillStyle = `hsla(${hue}, 30%,80%,${opacity})`
      ctx.fillRect(x,y,size,size)
    }
  }
}
registerPaint('yd-sky', StarSky)