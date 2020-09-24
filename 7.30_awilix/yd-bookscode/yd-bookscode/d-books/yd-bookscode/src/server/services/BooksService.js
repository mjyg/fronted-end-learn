// import { get } from 'axios';
class BooksService {
  getData() {
    // return get('http://localhost/basic/web/index.php?r=books');
    return Promise.resolve('🐻数据请求成功');
  }
}

export default BooksService;
