//1. 引入 koa
// 说明：引入的koa插卡不知道怎么写，就去看package.json的dependencies的字段
const Koa = require('koa')
// 引入 跨域中间件
const cors = require('koa2-cors')
// 引入routes文件夹下的index.js文件
const routes = require('./routes')
// 引入 bodyparser中间件
const bodyParser = require('koa-bodyparser')

//2. 创建实例
const app = new Koa()

app.use(bodyParser())

//3. 使用实例
app.use(async (ctx, next) => {
  // ctx上下文对象：包含了request 和 response 的 对象
  ctx.body = 'hello productCenter!'
  await next()
})

// 使用和配置域名请求
app.use(
  cors({
    origin: function (ctx) {
      if (ctx.url === '/test') {
        return '*' // 允许来自所有域名的请求
      }
      return '*' //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, // 指定本次预检请求的有效期，单位为秒
    credentials: true, // 是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
)

// 执行routes方法，把app传进去
routes(app)

// 4. 设置端口号
app.listen(4000, () => {
  console.log('产品中心的服务启动了！')
})