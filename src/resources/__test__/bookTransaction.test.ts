import moment from 'moment';
import mongoose from 'mongoose';
import supertest from 'supertest';

import { ActiveStatus } from '../../helper';
import app from '../../server';
import { Author } from '../author';
import { Book } from '../book';
import { BookTransaction } from '../bookTransaction';
import { Genre } from '../genre';
import { Publisher } from '../publisher';
import { IUserDoc, User } from '../user';
import { Gender, Role } from '../user/user.type';

describe('BookTransaction', () => {
  let admin: IUserDoc;
  let adminAuth: string;
  let transactionData;

  beforeAll(async () => {
    const adminData = {
      first_name: 'Pureo',
      last_name: "Puwawa",
      email: 'pureo.puwawa@kucing.com',
      password: 'puwawa',
      role: Role.ADMIN,
      gender: Gender.FEMALE
    }
    admin = await User.create(adminData);
    const adminToken = await supertest(app).post('/signin').send(adminData);
    adminAuth = adminToken.body.token;

    const book = await createBook(admin._id);
    transactionData = {
      book: book._id,
      created_by: admin._id,
      updated_by: admin._id,
    }

    app.close();
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close()
    mongoose.disconnect();
    app.close();
  });

  afterEach(async () => {
    await BookTransaction.deleteMany({});
    app.close()
  })
  
  describe('Borrow book', () => {
    it('Login admin should be able to borrow a book', async() => {
      const { body: { data: borrow = {} } = {} } = await supertest(app)
        .post('/api/v1/book-transaction')
        .set('authorization', `Bearer ${adminAuth}`)
        .send(transactionData)
        .expect(201);
      expect(borrow.active_status).toEqual(ActiveStatus.A);
      app.close();
    })
    
    it('Guest should not able to borrow book', async() => {
      const { body: { error = {} } = {} } = await supertest(app)
        .post('/api/v1/book-transaction')
        .send(transactionData)
        .expect(401);
      expect(error).toEqual(true);
      app.close();
    })
  })

  describe('Return book', () => {
    it('User should be able to return own book successfully (api)', async() => {
      const transaction = await BookTransaction.create(transactionData)
      const { body: { data: returned = {} } = {} } = await supertest(app)
          .patch(`/api/v1/book-transaction/return/${transaction._id}`)
          .set('authorization', `Bearer ${adminAuth}`)
          .send(transactionData)
          .expect(200);

      expect(returned.active_status).toEqual(ActiveStatus.D);
      app.close();
    });

    it('User should able to return book with fine (model)', async() => {
      const transaction = await BookTransaction.create({
        ...transactionData,
        start_date: moment.utc().subtract('15', 'day').startOf('day').toISOString()
      })
      const lateTransaction = await BookTransaction.findById(transaction._id);
      if (lateTransaction) {
        await lateTransaction.returnBook(admin._id);
        const returned = await BookTransaction.findById(transaction._id);

        if (returned) {
          expect(returned.active_status).toEqual(ActiveStatus.D);
          expect(returned.return_date).toBeTruthy();
        }
      }
    });
  })


  describe('Delete book transaction record', () => {
    it('Admin should be able to delete transaction', async() => {
      const transaction = await BookTransaction.create(transactionData)
      await supertest(app)
        .delete(`/api/v1/book-transaction/${transaction._id}`)
        .set('authorization', `Bearer ${adminAuth}`)
        .expect(200);
      app.close();
    })
  })

  describe('Update book transaction record', () => {
    it('Admin should be able to update transaction', async() => {
      const transaction = await BookTransaction.create(transactionData)
      const { body: { data: updated = {} } = {} } = await supertest(app)
          .put(`/api/v1/book-transaction/${transaction._id}`)
          .set('authorization', `Bearer ${adminAuth}`)
          .send({
            ...transactionData,
            active_status: ActiveStatus.D
          })
          .expect(200);

      expect(updated.active_status).toEqual(ActiveStatus.D);
      app.close();
    })
  })
  
  describe('Get a book transaction by id', () => {
    it('User should be able to see transaction by id', async() => {
      const transaction = await BookTransaction.create(transactionData)
      await supertest(app)
        .get(`/api/v1/book-transaction/${transaction._id}`)
        .set('authorization', `Bearer ${adminAuth}`)
        .expect(200);
      app.close();
    })
  })

  describe('Get my book transactions', () => {
    it('User should be able to see book transactions', async() => {
      await BookTransaction.create(transactionData)
      const { body: { data: transactions = [] } = {} } = await supertest(app)
        .get('/api/v1/book-transaction/me')
        .set('authorization', `Bearer ${adminAuth}`)
        .expect(200);
      expect(transactions.length).toEqual(1)
      app.close();
    })
  })

  describe('Get book transactions by user id', () => {
    it('Admin should be able to see book transactions by userId', async() => {
      await BookTransaction.create(transactionData)
      const { body: { data: transactions = [] } = {} } = await supertest(app)
        .get(`/api/v1/book-transaction/user/${admin._id}`)
        .set('authorization', `Bearer ${adminAuth}`)
        .expect(200);
      expect(transactions.length).toEqual(1)
      app.close();
    })
  })

  
})

async function createBook(userId: string) {
  const author = await Author.create({
    first_name: 'Bob C',
    last_name: 'Martin',
    date_of_birth: '1950-10-10T00:00:00.000Z',
    date_of_death: '2030-10-10T00:00:00.000Z',
    created_by: userId,
    updated_by: userId
  });
  const genre = await Genre.create({
    name: 'Technology',
    created_by: userId,
    updated_by: userId
  });
  const publisher = await Publisher.create({
    name: 'Pulitzer',
    created_by: userId,
    updated_by: userId
  });
  const book = await Book.create({
    title: 'Clean Code',
    authors: [author._id],
    genres: [genre._id],
    publisher: publisher._id,
    created_by: userId,
    updated_by: userId,
    description: 'Clean code is care',
    total: 10,
    stock: 10
  });
  return book;
}