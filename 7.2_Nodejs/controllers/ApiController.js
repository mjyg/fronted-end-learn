const Controller = require('./Controller')

class ApiCrotroller extends Controller{
    contructor(){}
    async actionIndex(ctx,next){
        ctx.body={data:xx}
    }
    async actionCreate(tx,next){}
}

module.exports = ApiCrotroller