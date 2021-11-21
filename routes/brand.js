const Router = require('koa-router')
const router = new Router()

const {
  getBrandList,
  createBrand
} = require('../controllers/brand')

router.prefix('/productCenter')

// 获取品牌列表的路由
router.get('/brand/list', getBrandList)

// 新增品牌的路由
router.post('/brand/', createBrand)

module.exports = router