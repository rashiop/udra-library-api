import mongoose from 'mongoose';
import supertest from 'supertest';

import { Genre } from '../../resources/genre';
import { IUserDoc, User } from '../../resources/user';
import { Gender, Role } from '../../resources/user/user.type';
import app from '../../server';

const createUser = async (userData) => {
  const user = await User.create(userData);
  const token = await supertest(app).post('/signin').send(userData);
  const auth = token.body.token;
  return [user, auth]
}

describe('Helper Validate Request', () => {
  let admin: IUserDoc;
  let authAdmin: string;
  let user: IUserDoc;
  let authUser: string;

  beforeAll(async() => { 
    [admin, authAdmin] = await createUser({
      first_name: 'Pureo',
      last_name: "Puwawa",
      email: 'pureo.puwawa@kucing.com',
      password: 'puwawa',
      role: Role.ADMIN,
      gender: Gender.FEMALE
    });

    [user, authUser] = await createUser({
      first_name: 'Whitey',
      last_name: "Puwawa",
      email: 'whitey.puwawa@kucing.com',
      password: 'puwawa',
      role: Role.USER,
      gender: Gender.FEMALE
    });
    app.close();
  })

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close()
    app.close();
  });

  afterEach(async () => {
    await Genre.deleteMany({});
    app.close()
  })

  describe('Route without validation', () => {
    it('Should pass without authentication', async () => {
      const newGenre = {
        name: 'Isekai',
        created_by: admin._id,
        updated_by: admin._id
      }
      const savedGenre = await Genre.create(newGenre)

      const genre = await supertest(app)
        .get(`/api/v1/genre/${savedGenre.id}`)
        .set('authorization', `Bearer ${authAdmin}`)
        .expect(200); 
      expect(genre.body.data.name).toEqual(savedGenre.name);
      
      app.close();
    })
  })
  describe('Route with validation', () => {
    it('Should not create genre with incorrect role(user)', async () => {
      const newGenre = {
        name: 'Isekai',
        created_by: user._id,
        updated_by: user._id
      }

      const savedGenre = await supertest(app)
        .post('/api/v1/genre')
        .set('authorization', `Bearer ${authUser}`)
        .send(newGenre)
        .expect(403);
      expect(savedGenre.body.error).toEqual(true);

      app.close();
    })

    it('Should not create genre without authentication', async () => {
      const newGenre = {
        name: 'Isekai'
      }

      const savedGenre = await supertest(app)
        .post('/api/v1/genre')
        .send(newGenre)
        .expect(401);
      expect(savedGenre.body.error).toEqual(true);

      app.close();
    })

    it('Should create genre with correct role(admin)', async () => {
      const newGenre = {
        name: 'Isekai',
        created_by: admin._id,
        updated_by: admin._id
      }
      
      const savedGenre = await supertest(app)
        .post('/api/v1/genre')
        .set('authorization', `Bearer ${authAdmin}`)
        .send(newGenre)
        .expect(201);
      expect(savedGenre.body.data.name).toEqual(newGenre.name);

      app.close();
    })
  })
});