// 引入 路由中间件
const Router = require('koa-router')
const router = new Router()

// 引入 controllers 控制器里面的方法
const {
  getUserList,
  createUser,
  getUserDetail,
  updateUser,
  deleteUser
} = require('../controllers/user')

// 总路由添加前缀/owl，总地址变为http://localhost:4000/owl
router.prefix('/owl')

// 获取用户列表的路由
router.get('/user/list', getUserList)

// 新增用户的路由
router.post('/user/', createUser)

// 获取用户详情的路由
router.get('/user/detail/:id', getUserDetail)

// 编辑用户的路由
router.put('/user/', updateUser)

// 删除用户的路由
router.delete('/user/:id', deleteUser)

// 导出路由
module.exports = router