// 引入 路由中间件
const Router = require('koa-router')
const router = new Router()

// 引入 controllers 控制器里面的方法
const {
  getProductList
} = require('../controllers/product')

// 总路由添加前缀/product，总地址变为http://localhost:4000/product
router.prefix('/product')

// 获取产品列表的路由
router.get('/list', getProductList)

// 导出路由
module.exports = router