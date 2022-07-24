const dataBase = require('../mysql/index')

let dataInfo = {
  status: 200,
  data: {},
  msg: '请求成功'
}

class User {
  // 获取用户列表
  async getUserList(ctx) {
    const query = ctx.request.query
    dataInfo.query = query
    if (query.name && query.name !== '') {
      // 查询条件不为空
      var sql = `select * from user_list where user_list.name like '%${query.name}%' order by id desc`
    } else {
      // 查询条件为空
      var sql = `select * from user_list order by id desc`
    }
    dataInfo.data = await dataBase.query(sql)
    ctx.response.body = dataInfo
  }

  // 新增用户
  async createUser(ctx) {
    const param = ctx.request.body
    let sql = 'insert into user_list'
    // 必填：姓名、手机号、密码、邮箱
    sql += `(name, mobile, password, email) values ('${param.name}', '${param.mobile}', '${param.password}', '${param.email}')`
    dataBase.query(sql)
    ctx.body = param
  }
  // 获取用户详情
  async getUserDetail(ctx) {
    const {
      id
    } = ctx.params // 获取参数id
    let sql = `select * from user_list where id = '${id}'`
    const result = await dataBase.query(sql)
    ctx.body = result[0]
  }
  // 编辑用户
  async updateUser(ctx) {
    const param = ctx.request.body
    let sql = 'update user_list set'
    sql += ` name='${param.name}', mobile='${param.mobile}', password='${param.password}', email='${param.email}' where id='${param.id}'`
    dataBase.query(sql)
    ctx.body = param
  }
  // 删除用户
  async deleteUser(ctx) {
    const {
      id
    } = ctx.params
    let sql = `delete from user_list where id='${id}'`
    dataBase.query(sql)
    ctx.body = ctx.params
  }
}

module.exports = new User()