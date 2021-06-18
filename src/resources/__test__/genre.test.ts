import mongoose from 'mongoose';
import supertest from 'supertest';

import { Genre } from '../../resources/genre';
import { IUserDoc, User } from '../../resources/user';
import { Gender, Role } from '../../resources/user/user.type';
import app from '../../server';

describe('Genre', () => {
  let user: IUserDoc;
  let auth: string;

  beforeAll(async () => {
    const userData = {
      firstname: 'Pureo',
      lastname: "Puwawa",
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
    await Genre.deleteMany({});
    app.close()
  })
  
  describe('create one genre', () => {
    it('Should create new genre successfully', async () => {
      const newGenre = {
        name: 'Isekai',
        created_by: user._id,
        updated_by: user._id
      }
      
      const savedGenre = await supertest(app)
        .post('/api/v1/genre')
        .set('authorization', `Bearer ${auth}`)
        .send(newGenre)
        .expect(201);
      expect(savedGenre.body.data.name).toEqual(newGenre.name);

      app.close();
    });

    it('Should failed to create new genre', async () => {
      const newGenre = {}

      const savedGenre = await supertest(app)
        .post('/api/v1/genre')
        .set('authorization', `Bearer ${auth}`)
        .send(newGenre)
        .expect(400);
      expect(savedGenre.body.error).toEqual(true);

      app.close();
    });
  })

  describe('Update One Genre', () => {
    it('Admin should update genre successfully', async () => {
      const oldGenre = {
        name: 'Isekai',
        created_by: user._id,
        updated_by: user._id
      }
      const newGenre = {
        name: 'Isekai2',
        updated_by: user._id
      }

      const genre = await Genre.create(oldGenre)
      const updatedGenre = await supertest(app)
        .put(`/api/v1/genre/${genre._id}`)
        .set('authorization', `Bearer ${auth}`)
        .send(newGenre)
        .expect(200);
      expect(updatedGenre.body.data.name).toEqual(newGenre.name);

      app.close();
    });
  })

  describe('Remove One Genre', () => {
    it('Admin should remove one genre successfully', async () => {
      const newGenre = {
        name: 'Isekai',
        created_by: user._id,
        updated_by: user._id
      }
      const savedGenre = await Genre.create(newGenre)
      
      const deletedGenre = await supertest(app)
        .delete(`/api/v1/genre/${savedGenre._id}`)
        .set('authorization', `Bearer ${auth}`)
        .expect(200);
      expect(deletedGenre.body.data.name).toEqual(savedGenre.name);

      app.close();
    });
  })

  describe('Get genre by id', () => {
    it('Should get one genre successfully', async () => {
      const newGenre = {
        name: 'Isekai',
        created_by: user._id,
        updated_by: user._id
      }
      const savedGenre = await Genre.create(newGenre)
      const genre = await supertest(app)
        .get(`/api/v1/genre/${savedGenre.id}`)
        .set('authorization', `Bearer ${auth}`)
        .expect(200); 
      expect(genre.body.data.name).toEqual(savedGenre.name);
      app.close();
    });
  })

  describe('GET all genre', () => {
    it('Should get array of genres successfully', async () => {
      const newGenre = {
        name: 'Isekai',
        created_by: user._id,
        updated_by: user._id
      }
      const newGenre2 = {
        name: 'Fantasy',
        created_by: user._id,
        updated_by: user._id
      }
      await Genre.create(newGenre)
      await Genre.create(newGenre2)
      const genre = await supertest(app)
        .get(`/api/v1/genre`)
        .set('authorization', `Bearer ${auth}`)
        .expect(200); 
      expect(genre.body.data.length).toEqual(2);
      app.close();
    });
  })
})