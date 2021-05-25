import { crudController } from '../../helper';
import Author from './author.model';

export default crudController(Author, { virtuals: true });
