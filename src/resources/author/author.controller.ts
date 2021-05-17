import { crudControllers } from '../../helper/crud';
import Author from './author.model';

export default crudControllers(Author, { virtuals: true });
