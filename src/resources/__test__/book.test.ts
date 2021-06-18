import mongoose from 'mongoose';
import supertest from 'supertest';

import { ActiveStatus } from '../../helper';
import app from '../../server';
import { Author, IAuthorDoc } from '../author';
import { Book } from '../book';
import { Genre, IGenreDoc } from '../genre';
import { IPublisherDoc, Publisher } from '../publisher';
import { IUserDoc, User } from '../user';
import { Gender, Role } from '../user/user.type';

describe('Book', () => {
  let user: IUserDoc;
  let author: IAuthorDoc;
  let genre: IGenreDoc;
  let publisher: IPublisherDoc;
  let auth: string;

  beforeAll(async () => {
    const userData = {
      first_name: 'Pureo',
      last_name: "Puwawa",
      email: 'pureo.puwawa@kucing.com',
      password: 'puwawa',
      role: Role.ADMIN,
      gender: Gender.FEMALE
    }
    user = await User.create(userData);
    const token = await supertest(app).post('/signin').send(userData);
    auth = token.body.token;
    
    const authorData = {
      first_name: 'Bob C',
      last_name: 'Martin',
      date_of_birth: '1950-10-10T00:00:00.000Z',
      date_of_death: '2030-10-10T00:00:00.000Z',
      created_by: user._id,
      updated_by: user._id
    }
    author = await Author.create(authorData);

    const genreData = {
      name: 'Technology',
      created_by: user._id,
      updated_by: user._id
    }
    genre = await Genre.create(genreData);

    const publisherData = {
      name: 'Pulitzer',
      created_by: user._id,
      updated_by: user._id
    }
    publisher = await Publisher.create(publisherData)

    app.close();
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close()
    mongoose.disconnect();
    app.close();
  });

  afterEach(async () => {
    await Book.deleteMany({});
    app.close()
  })
  
  describe('create one book', () => {
    it('Should create new book successfully', async () => {
      const newBook = {
        title: 'Clean Code',
        authors: [author._id],
        genres: [genre._id],
        publisher: publisher._id,
        created_by: user._id,
        updated_by: user._id,
        description: 'Clean code is care',
        total: 10,
        stock: 10
      }

      const { body: { data: savedBook = {} } = {} } = await supertest(app)
        .post('/api/v1/book')
        .set('authorization', `Bearer ${auth}`)
        .send(newBook)
        .expect(201);

      expect(savedBook.title).toEqual(newBook.title);
      expect(savedBook.active_status).toEqual(ActiveStatus.A);    

      app.close();
    });

    it('Should failed to create new book', async () => {
      const newBook = {}
      const savedBook = await supertest(app)
        .post('/api/v1/book')
        .set('authorization', `Bearer ${auth}`)
        .send(newBook)
        .expect(400);

      expect(savedBook.body.error).toEqual(true);

      app.close();
    });
  })

  describe('Update One Book', () => {
    it('Admin should update book successfully', async () => {
      const oldBook = {
        title: 'Clean Code',
        authors: [author._id],
        genres: [genre._id],
        publisher: publisher._id,
        created_by: user._id,
        updated_by: user._id,
        description: 'Clean code is care',
        total: 10,
        stock: 10
      }
      const newBook = {
        title: 'Clean Code New',
        authors: [author._id],
        genres: [genre._id],
        publisher: publisher._id,
        created_by: user._id,
        updated_by: user._id,
        description: 'Clean code is care',
        total: 10,
        stock: 10
      }

      const book = await Book.create(oldBook)
      const updatedBook = await supertest(app)
        .put(`/api/v1/book/${book._id}`)
        .set('authorization', `Bearer ${auth}`)
        .send(newBook)
        .expect(200);

      expect(updatedBook.body.data.title).toEqual(newBook.title);

      app.close();
    });
  })

  describe('Remove One Book', () => {
    it('Admin should remove one book successfully', async () => {
      const newBook = {
        title: 'Clean Code',
        authors: [author._id],
        genres: [genre._id],
        publisher: publisher._id,
        created_by: user._id,
        updated_by: user._id,
        description: 'Clean code is care',
        total: 10,
        stock: 10
      }
      
      const savedBook = await Book.create(newBook)
      const { body: { data: deletedBook = {} } = {} } = await supertest(app)
        .delete(`/api/v1/book/${savedBook._id}`)
        .set('authorization', `Bearer ${auth}`)
        .expect(200);

      expect(deletedBook.title).toEqual(savedBook.title);

      app.close();
    });
  })

  describe('Get book by id', () => {
    it('Should get one book successfully', async () => {
      const newBook = {
        title: 'Clean Code',
        authors: [author._id],
        genres: [genre._id],
        publisher: publisher._id,
        created_by: user._id,
        updated_by: user._id,
        description: 'Clean code is care',
        total: 10,
        stock: 10
      }
      
      const savedBook = await Book.create(newBook)
      const { body: { data: book = {} } = {} } = await supertest(app)
        .get(`/api/v1/book/${savedBook.id}`)
        .set('authorization', `Bearer ${auth}`)
        .expect(200);

      expect(book.title).toEqual(savedBook.title);
      expect(book.total).toEqual(savedBook.total);
      expect(book.stock).toEqual(savedBook.stock);

      app.close();
    });
  })

  describe('GET all book', () => {
    it('Should get array of genres successfully', async () => {
      const newBook = {
        title: 'Clean Code',
        authors: [author._id],
        genres: [genre._id],
        publisher: publisher._id,
        created_by: user._id,
        updated_by: user._id,
        description: 'Clean code is care',
        total: 10,
        stock: 10
      }
      const newBook2 = {
        title: 'Clean Coder',
        authors: [author._id],
        genres: [genre._id],
        publisher: publisher._id,
        created_by: user._id,
        updated_by: user._id,
        description: 'Clean code is care',
        total: 10,
        stock: 10
      }

      await Book.create(newBook)
      await Book.create(newBook2)
      const { body: { data: book = {} } = {} } = await supertest(app)
        .get(`/api/v1/book`)
        .set('authorization', `Bearer ${auth}`)
        .expect(200); 

      expect(book.length).toEqual(2);
      
      app.close();
    });
  })
})