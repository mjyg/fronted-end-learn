import { get } from 'axios';
class Books {
  getData() {
    return get('http://localhost/basic/web/index.php?r=books');
  }
}

export default Books;
