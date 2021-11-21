const dataBase = require('../mysql/index')

let dataInfo = {
  status: 200,
  data: {},
  msg: '请求成功'
}

class Brand {
  // 获取品牌列表
  async getBrandList(ctx) {
    var sql = 'select * from `brand_list`'
    var result = await dataBase.query(sql)
    dataInfo.data = result
    ctx.response.body = dataInfo
  }

  // 新增品牌
  async createBrand(ctx) {
    const tempData = ctx.request.body
    let sql = 'insert into brand_list'
    sql += ` (id, name) values ('${tempData.id}','${tempData.name}')`
    dataBase.query(sql)
    // 将post传的参数返回客户端
    ctx.body = tempData
  }
}

module.exports = new Brand()
