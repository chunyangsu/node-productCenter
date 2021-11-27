// 这里引入上面创建的mysql文件
const dataBase = require('../mysql/index')

// 接口请求成功时的返回结果
let dataInfo = {
  status: 200, // 状态码
  data: {}, // 返回数据
  msg: '请求成功'
}

class Product {
  // 获取产品列表
  async getProductList(ctx) {
    const query = ctx.request.query // 获取查询的参数
    // 返回值携带查询条件
    dataInfo.query = query
    if (query.name && query.name !== '') {
      // 查询条件不为空
      var sql = `select * from product_list where name like '%${query.name}%' order by id desc`
    } else {
      var sql = 'select * from `product_list` order by id desc'
    }
    var result = await dataBase.query(sql)
    dataInfo.data = result
    ctx.response.body = dataInfo
  }

  // 新增产品
  async createProduct(ctx) {
    const tempData = ctx.request.body
    let sql = 'insert into product_list'
    sql += ` (id, name, brand_id) values ('${tempData.id}','${tempData.name}','${tempData.brand_id}')`
    dataBase.query(sql)
    // 将post传的参数返回客户端
    ctx.body = tempData
  }
}

module.exports = new Product()