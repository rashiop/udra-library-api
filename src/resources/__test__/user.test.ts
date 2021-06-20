import mongoose from 'mongoose';
import supertest from 'supertest';

import { ActiveStatus } from '../../helper';
import app from '../../server';
import { IUserDoc, User } from '../user';
import { Gender, Role } from '../user/user.type';

describe('User', () => {
  let admin: IUserDoc;
  let auth: string;

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
    const token = await supertest(app).post('/signin').send(adminData);
    auth = token.body.token;
    app.close();
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close()
    await mongoose.disconnect();
    app.close();
  });

  afterEach(async () => {
    await User.deleteMany({
      _id: { $nin: admin._id }
    });
    app.close()
  })
  
  describe('Create one user', () => {
    it('Should create new user successfully', async () => {
      const newUser = {
        first_name: 'Belang',
        last_name: "Puwawa",
        email: 'belang.puwawa@kucing.com',
        password: 'puwawa',
        role: Role.USER,
        gender: Gender.FEMALE,
        created_by: admin._id,
        updated_by: admin._id
      }

      const { body: { data: savedUser = {} } = {} } = await supertest(app)
        .post('/api/v1/user')
        .set('authorization', `Bearer ${auth}`)
        .send(newUser)
        .expect(201);

      expect(savedUser.first_name).toEqual(newUser.first_name);
      expect(savedUser.active_status).toEqual(ActiveStatus.A);    

      app.close();
    });

    it('Non Admin should failed to create new user', async () => {
      const newUser = {
        first_name: 'Belang',
        last_name: "Puwawa",
        email: 'belang.puwawa@kucing.com',
        password: 'puwawa',
        role: Role.USER,
        gender: Gender.FEMALE,
        created_by: admin._id,
        updated_by: admin._id
      }

      const { body: { error = {} } = {} } = await supertest(app)
        .post('/api/v1/user')
        .send(newUser)
        .expect(401);

        expect(error).toEqual(true);


      app.close();
    });
  })

  describe('Update One User', () => {
    it('Admin should update user successfully', async () => {
      const oldUser = {
        first_name: 'Whitey',
        last_name: "Puwawa",
        email: 'belang.puwawa@kucing.com',
        password: 'puwawa',
        role: Role.USER,
        gender: Gender.FEMALE,
        created_by: admin._id,
        updated_by: admin._id
      }

      const newUser = {
        first_name: 'Bleki',
        last_name: "Puwawa",
        email: 'bleki.puwawa@kucing.com',
        password: 'puwawa',
        role: Role.USER,
        gender: Gender.FEMALE,
        created_by: admin._id,
        updated_by: admin._id
      }

      const user = await User.create(oldUser)
      const updatedUser = await supertest(app)
        .put(`/api/v1/user/${user._id}`)
        .set('authorization', `Bearer ${auth}`)
        .send(newUser)
        .expect(200);

      expect(updatedUser.body.data.first_name).toEqual(newUser.first_name);

      app.close();
    });
  })

  describe('Remove One User', () => {
    it('Admin should remove one user successfully', async () => {
      const newUser = {
        first_name: 'Yeboi',
        last_name: "Puwawa",
        email: 'yeboi.puwawa@kucing.com',
        password: 'puwawa',
        role: Role.USER,
        gender: Gender.FEMALE,
        created_by: admin._id,
        updated_by: admin._id
      }
      
      const savedUser = await User.create(newUser)
      const { body: { data: deletedUser = {} } = {} } = await supertest(app)
        .delete(`/api/v1/user/${savedUser._id}`)
        .set('authorization', `Bearer ${auth}`)
        .expect(200);

      expect(deletedUser.first_name).toEqual(savedUser.first_name);

      app.close();
    });
  })

  describe('Get user by id', () => {
    it('Should get one user successfully', async () => {
      const newUser = {
        first_name: 'Belang',
        last_name: "Puwawa",
        email: 'belang.puwawa@kucing.com',
        password: 'puwawa',
        role: Role.USER,
        gender: Gender.FEMALE,
        created_by: admin._id,
        updated_by: admin._id
      }
      
      const savedUser = await User.create(newUser)
      const { body: { data: user = {} } = {} } = await supertest(app)
        .get(`/api/v1/user/${savedUser.id}`)
        .set('authorization', `Bearer ${auth}`)
        .expect(200);

      expect(user.first_name).toEqual(savedUser.first_name);

      app.close();
    });
  })

  describe('Get user current logged in user', () => {
    it('Should logined user successfully', async () => {
      const { body: { data: user = {} } = {} } = await supertest(app)
        .get('/api/v1/user/me')
        .set('authorization', `Bearer ${auth}`)
        .expect(200);

      expect(user.first_name).toEqual(admin.first_name);

      app.close();
    });


    it('Should failed to get login data for guest(not login)', async () => {
      const { body: { error = {} } = {} } = await supertest(app)
        .get('/api/v1/user/me')
        .expect(401);

      expect(error).toEqual(true);

      app.close();
    });
  })

  describe('GET all user', () => {
    it('Should get array of users successfully', async () => {
      const newUser = {
        first_name: 'Belang',
        last_name: "Puwawa",
        email: 'belang.puwawa@kucing.com',
        password: 'puwawa',
        role: Role.USER,
        gender: Gender.FEMALE,
        created_by: admin._id,
        updated_by: admin._id
      }

      const newUser2 = {
        first_name: 'Whitey',
        last_name: "Puwawa",
        email: 'whitey.puwawa@kucing.com',
        password: 'puwawa',
        role: Role.USER,
        gender: Gender.FEMALE,
        created_by: admin._id,
        updated_by: admin._id
      }

      await User.create(newUser)
      await User.create(newUser2)
      const { body: { data: users = {} } = {} } = await supertest(app)
        .get(`/api/v1/user`)
        .set('authorization', `Bearer ${auth}`)
        .expect(200); 

      expect(users.length).toEqual(3);
      
      app.close();
    });
  })
})