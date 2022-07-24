// 1. 引入mysql
var mysql = require('mysql')

// 2. 封装 连接数据库的方法
function __connection() {
  // 1. 创建连接
  var connection = mysql.createConnection({
    host: 'localhost', // 本地数据库的地址
    // host: '101.133.174.66', // 本地数据库的地址
    user: 'root', // 用户名
    password: 'root', // 密码
    // password: 'scy1314568', // 密码
    database: 'product' // 数据库名称
    // database: 'product' // 数据库名称
  })
  // 2. 连接数据库
  connection.connect()
  return connection
}

// 3. 暴露 query 方法，供controllers模块使用
exports.query = function (sql, params = null) {
  // 1. 获取数据库连接对象
  var connection = __connection()
  return new Promise(function (reject, resolve) {
    // 3. 执行数据库操作
    connection.query(sql, params, function (error, results, fields) {
      if (error) throw error
      reject(results)
    })
    // 4. 关闭数据库
    connection.end()
  })
}