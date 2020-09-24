const Controller = require('./Controller')

class IndexController extends Controller{
    contructor(){}
    async actionIndex(ctx,next){
        ctx.body = await ctx.render('index',{
            data:'后端数据'
        }) //渲染是异步的，要用await等待渲染
    }
}

module.exports = IndexController