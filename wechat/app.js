const Koa = require('koa');
const app = new Koa();
// 加密 password
const path = require('path');
const util = require('./libs/util.js');
const wechat_file = 
    path.join(__dirname, './config/wechat.txt')
var config = {
    wechat: {
        appID: '',
        appSecret: '',
        token: 'weixin',
        getAccessToken: function() {
            return util.readFileAsync(wechat_file)
        },
        saveAccessToken: function(data) {
            data = JSON.stringify(data)
            return util.writeFileAsync(wechat_file, data)
        }
    }
}
const wechat = require('./wechat/g')
// 中间件串联形式，停下来，按顺序
// 异步变同步
// 发展史 promise->generator->async
app.use(wechat(config.wechat))
app.listen(1234);
console.log('Listening: 1234')


// 中间件串联型式，停下来，要按顺序，异步要变同步
// koa1里面this相当于上下文环境
// 发展史：promise->generator->async

