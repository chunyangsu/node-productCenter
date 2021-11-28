// 引入 路由中间件
const Router = require('koa-router')
const router = new Router()

// 引入 controllers 控制器里面的方法
const {
  getProductList,
  createProduct,
  getProductDetail,
  updateProduct,
  deleteProduct
} = require('../controllers/product')

// 总路由添加前缀/productCenter，总地址变为http://localhost:4000/productCenter
router.prefix('/productCenter')

// 获取产品列表的路由
router.get('/product/list', getProductList)

// 新增产品的路由
router.post('/product/', createProduct)

// 获取产品详情的路由
router.get('/product/detail/:id', getProductDetail)

// 编辑产品的路由
router.put('/product/', updateProduct)

// 删除产品的路由
router.delete('/product/:id', deleteProduct)

// 导出路由
module.exports = router