// 这里引入上面创建的mysql文件
const dataBase = require('../mysql/index')

// 接口请求成功时的返回结果
let dataObj = {
  status: 200, // 状态码
  data: {}, // 返回数据
  msg: '请求成功'
}

class Product {
  // 获取产品列表
  async getProductList(ctx) {
    var sql = 'select * from `product_list`'
    var result = await dataBase.query(sql)
    dataObj.data = result
    ctx.response.body = dataObj
  }
}

module.exports = new Product()