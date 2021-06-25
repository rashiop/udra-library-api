import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../../server';
import { Publisher } from '../publisher';
import { IUserDoc, User } from '../user';
import { Gender, Role } from '../user/user.type';

describe('Publisher', () => {
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
    await mongoose.connection.close();
    mongoose.disconnect();
    app.close();
  });

  afterEach(async () => {
    await Publisher.deleteMany({});
    app.close()
  })
  
  describe('create one publisher', () => {
    it('Should create new publisher successfully', async () => {
      const newPublisher = {
        name: 'Pulitzer',
        created_by: user._id,
        updated_by: user._id
      }
      
      const savedPublisher = await supertest(app)
        .post('/api/v1/publisher')
        .set('authorization', `Bearer ${auth}`)
        .send(newPublisher)
        .expect(201);
      expect(savedPublisher.body.data.name).toEqual(newPublisher.name);

      app.close();
    });

    it('Should failed to create new publisher', async () => {
      const newPublisher = {}

      const savedPublisher = await supertest(app)
        .post('/api/v1/publisher')
        .set('authorization', `Bearer ${auth}`)
        .send(newPublisher)
        .expect(400);
      expect(savedPublisher.body.error).toEqual(true);

      app.close();
    });
  })

  describe('Update One Publisher', () => {
    it('Admin should update publisher successfully', async () => {
      const oldPublisher = {
        name: 'Pulitzer',
        created_by: user._id,
        updated_by: user._id
      }
      const newPublisher = {
        name: 'Pulitzer2',
        updated_by: user._id
      }

      const publisher = await Publisher.create(oldPublisher)
      const updatedPublisher = await supertest(app)
        .put(`/api/v1/publisher/${publisher._id}`)
        .set('authorization', `Bearer ${auth}`)
        .send(newPublisher)
        .expect(200);
      expect(updatedPublisher.body.data.name).toEqual(newPublisher.name);

      app.close();
    });
  })

  describe('Remove One Publisher', () => {
    it('Admin should remove one publisher successfully', async () => {
      const newPublisher = {
        name: 'Pulitzer',
        created_by: user._id,
        updated_by: user._id
      }
      const savedPublisher = await Publisher.create(newPublisher)
      
      const deletedPublisher = await supertest(app)
        .delete(`/api/v1/publisher/${savedPublisher._id}`)
        .set('authorization', `Bearer ${auth}`)
        .expect(200);
      expect(deletedPublisher.body.data.name).toEqual(savedPublisher.name);

      app.close();
    });
  })

  describe('Get publisher by id', () => {
    it('Should get one publisher successfully', async () => {
      const newPublisher = {
        name: 'Pulitzer',
        created_by: user._id,
        updated_by: user._id
      }
      const savedPublisher = await Publisher.create(newPublisher)
      const publisher = await supertest(app)
        .get(`/api/v1/publisher/${savedPublisher.id}`)
        .set('authorization', `Bearer ${auth}`)
        .expect(200);
      expect(publisher.body.data.name).toEqual(savedPublisher.name);
      app.close();
    });
  })

  describe('GET all publisher', () => {
    it('Should get array of publishers successfully', async () => {
      const newPublisher = {
        name: 'Pulitzer',
        created_by: user._id,
        updated_by: user._id
      }
      const newPublisher2 = {
        name: 'Mizan',
        created_by: user._id,
        updated_by: user._id
      }
      await Publisher.create(newPublisher)
      await Publisher.create(newPublisher2)
      const publisher = await supertest(app)
        .get(`/api/v1/publisher`)
        .set('authorization', `Bearer ${auth}`)
        .expect(200);
      expect(publisher.body.data.length).toEqual(2);
      app.close();
    });
  })
})