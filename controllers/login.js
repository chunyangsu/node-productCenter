// 这里引入上面创建的mysql文件
const dataBase = require('../mysql/index')
// 引入jsonwebtoken，用于生成token
const jwt = require('jsonwebtoken')

// 接口请求成功时的返回结果
let dataInfo = {
  status: 200, // 状态码
  data: {}, // 返回数据
  msg: '请求成功'
}

class Login {
  // 登录
  async login(ctx) {
    const tempData = ctx.request.body
    // 查询登录用户是否存在
    // 查询条件：手机号、密码
    let sql = `select * from user_list where mobile='${tempData.username}' and password='${tempData.password}'`
    const result = await dataBase.query(sql)
    if (result.length > 0) {
      // 用户存在
      /**
       * 利用jsonwebtoken生成基于密钥scy1314568的token
       * payload：存储传递用户信息
       * secret：设置token的秘钥，越复杂越好
       * expiresIn：有效时长；数字 1000 表示 1000毫秒; 字符串 '10h' 表示 10小时，'1d' 表示1天
       */
      const payload = {
        id: result[0].id, // 用户id
        name: result[0].name, // 用户姓名
        mobile: result[0].mobile // 手机号
      }
      const secret = 'scy1314568'
      const token = jwt.sign(payload, secret, {
        expiresIn: '1h'
      })
      // 返回客户端的数据
      ctx.body = {
        code: 200,
        msg: '登录成功',
        dataInfo: {
          data: result[0], // 用户信息
          token: token
        }
      }
    } else {
      // 用户不存在
      ctx.body = {
        code: 400,
        msg: "登录失败",
      };
      return;
    }
  }
}

module.exports = new Login()