import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../../server';
import { Fine } from '../fine';
import { IUserDoc, User } from '../user';
import { Gender, Role } from '../user/user.type';

describe('Fine', () => {
  let admin: IUserDoc;
  let adminAuth: string;

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
    
    app.close();
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close()
    mongoose.disconnect();
    app.close();
  });

  afterEach(async () => {
    await Fine.deleteMany({});
    app.close()
  })

  describe('Create Fine', () => {
    it('Admin should create new fine successfully', async() => {
      const fineData = {
        amount: 1500,
        created_by: admin._id,
        updated_by: admin._id
      }

      const fine = await supertest(app)
        .post('/api/v1/fine')
        .set('authorization', `Bearer ${adminAuth}`)
        .send(fineData)
        .expect(201);
      
        expect(fine.body.data.amount).toEqual(fineData.amount);

      app.close();
    })

    it('Admin should failed to create empty fine', async() => {
      const fineData = {};

      const fine = await supertest(app)
        .post('/api/v1/fine')
        .set('authorization', `Bearer ${adminAuth}`)
        .send(fineData)
        .expect(400);
      
        expect(fine.body.error).toEqual(true);

      app.close();
    })
  })
  
  describe('Calculate Fine', () => {
    it('User should be able to calculate fine', async() => {
      await Fine.create({
        amount: 1500,
        created_by: admin._id,
        updated_by: admin._id
      })
      
      const LATE_DAYS = 7;
      const total_fine = await Fine.calcFine(LATE_DAYS)
      expect(total_fine).toBeTruthy();
    })
  })

  describe('Get active fine', () => {
    it('User should be able to get aactive fine', async() => {
      await Fine.create({ amount: 1500 })
      
      const newest = await Fine.getLatestFine();
      expect(newest).toBeTruthy();
    })
  })
  
})
