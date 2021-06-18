import moment from 'moment';
import mongoose from 'mongoose';
import supertest from 'supertest';

import { ActiveStatus } from '../../helper';
import app from '../../server';
import { Author } from '../author';
import { IUserDoc, User } from '../user';
import { Gender, Role } from '../user/user.type';

describe('Author', () => {
  let user: IUserDoc;
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
    app.close();
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close()
    mongoose.disconnect();
    app.close();
  });

  afterEach(async () => {
    await Author.deleteMany({});
    app.close()
  })
  
  describe('create one author', () => {
    it('Should create new author successfully', async () => {
      const newAuthor = {
        first_name: 'Bob C',
        last_name: 'Martin',
        date_of_birth: '1950-10-10T00:00:00.000Z',
        date_of_death: '2030-10-10T00:00:00.000Z',
        created_by: user._id,
        updated_by: user._id
      }

      const { body: { data: savedAuthor = {} } = {} } = await supertest(app)
        .post('/api/v1/author')
        .set('authorization', `Bearer ${auth}`)
        .send(newAuthor)
        .expect(201);

      expect(savedAuthor.first_name).toEqual(newAuthor.first_name);
      expect(savedAuthor.active_status).toEqual(ActiveStatus.A);    

      app.close();
    });

    it('Should failed to create new author', async () => {
      const newAuthor = {}
      const savedAuthor = await supertest(app)
        .post('/api/v1/author')
        .set('authorization', `Bearer ${auth}`)
        .send(newAuthor)
        .expect(400);

      expect(savedAuthor.body.error).toEqual(true);

      app.close();
    });
  })

  describe('Update One Author', () => {
    it('Admin should update author successfully', async () => {
      const oldAuthor = {
        first_name: 'Bob C',
        last_name: 'Martin',
        date_of_birth: '1950-10-10T00:00:00.000Z',
        date_of_death: '2030-10-10T00:00:00.000Z',
        created_by: user._id,
        updated_by: user._id
      }
      const newAuthor = {
        first_name: 'Bobbie Cee',
        last_name: 'Martin',
        date_of_birth: '1950-10-10T00:00:00.000Z',
        date_of_death: '2030-10-10T00:00:00.000Z',
        created_by: user._id,
        updated_by: user._id
      }

      const author = await Author.create(oldAuthor)
      const updatedAuthor = await supertest(app)
        .put(`/api/v1/author/${author._id}`)
        .set('authorization', `Bearer ${auth}`)
        .send(newAuthor)
        .expect(200);

      expect(updatedAuthor.body.data.first_name).toEqual(newAuthor.first_name);

      app.close();
    });
  })

  describe('Remove One Author', () => {
    it('Admin should remove one author successfully', async () => {
      const newAuthor = {
        first_name: 'Bob C',
        last_name: 'Martin',
        date_of_birth: '1950-10-10T00:00:00.000Z',
        date_of_death: '2030-10-10T00:00:00.000Z',
        created_by: user._id,
        updated_by: user._id
      }
      
      const savedAuthor = await Author.create(newAuthor)
      const { body: { data: deletedAuthor = {} } = {} } = await supertest(app)
        .delete(`/api/v1/author/${savedAuthor._id}`)
        .set('authorization', `Bearer ${auth}`)
        .expect(200);

      expect(deletedAuthor.first_name).toEqual(savedAuthor.first_name);

      app.close();
    });
  })

  describe('Get author by id', () => {
    it('Should get one author successfully', async () => {
      const newAuthor = {
        first_name: 'Bob C',
        last_name: 'Martin',
        date_of_birth: '1950-10-10T00:00:00.000Z',
        date_of_death: '2030-10-10T00:00:00.000Z',
        created_by: user._id,
        updated_by: user._id
      }
      
      const savedAuthor = await Author.create(newAuthor)
      const lifespan = moment(savedAuthor.date_of_death).diff(savedAuthor.date_of_birth, 'years')
      const { body: { data: author = {} } = {} } = await supertest(app)
        .get(`/api/v1/author/${savedAuthor.id}`)
        .set('authorization', `Bearer ${auth}`)
        .expect(200);

      expect(author.lifespan).toEqual(lifespan);
      expect(author.first_name).toEqual(savedAuthor.first_name);

      app.close();
    });
  })

  describe('GET all author', () => {
    it('Should get array of genres successfully', async () => {
      const newAuthor = {
        first_name: 'Bob C',
        last_name: 'Martin',
        date_of_birth: '1950-10-10T00:00:00.000Z',
        date_of_death: '2030-10-10T00:00:00.000Z',
        created_by: user._id,
        updated_by: user._id
      }
      const newAuthor2 = {
        first_name: 'Yellow',
        last_name: 'Yeboi',
        date_of_birth: '2019-06-10T00:00:00.000Z',
        created_by: user._id,
        updated_by: user._id
      }

      await Author.create(newAuthor)
      await Author.create(newAuthor2)
      const { body: { data: author = {} } = {} } = await supertest(app)
        .get(`/api/v1/author`)
        .set('authorization', `Bearer ${auth}`)
        .expect(200); 

      expect(author.length).toEqual(2);
      
      app.close();
    });
  })
})