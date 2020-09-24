import router from 'koa-simple-router';
import BooksController from './BooksController';
import IndexController from './IndexController';
const bookController = new BooksController();
const indexController = new IndexController();
export default (app) => {
  app.use(
    router((_) => {
      _.get('/', indexController.actionIndex);
      _.get('/books/list', bookController.actionIndex);
      _.get('/books/create', bookController.actionCreate);
    })
  );
};
