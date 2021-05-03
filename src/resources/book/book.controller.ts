import { crudControllers } from '../../lib/crud';
import Book from './book.model';

export default {
  ...crudControllers(Book)
};
