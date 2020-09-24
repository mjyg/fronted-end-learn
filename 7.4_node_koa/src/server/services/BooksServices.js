const axios = require("axios");
class BooksServices {
  getData() {
    // return axios.get('http://localhost/basic/web/index.php?r=books');
    return Promise.resolve("数据请求成功");
  }
}

module.exports = BooksServices;
