const Router = require('koa-router')
const router = new Router()

const {
  login
} = require('../controllers/login')

// 登录的路由
router.post('/login', login)

module.exports = router