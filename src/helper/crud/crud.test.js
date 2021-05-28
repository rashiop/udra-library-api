import mongoose from 'mongoose';

import { Genre } from '../../resources/genre/genre.model';
import { createOne } from './crud.controller';

// const { getOne, getMany, createOne, updateOne, removeOne } = crudController;

describe('CRUD Controllers', () => {
  describe('createOne', () => {
    test('When create, generate a new doc', async () => {
      // expect.assertions(2);

      const user = mongoose.Types.ObjectId();
      const body = { name: 'Halu Halu Isekai' }
      const req = {
        user: { _id: user },
        body
      }

      const res = {
        status(status) {
          expect(status).toBe(201);
          return this;
        },
        json(results) {
          expect(results.data.name).toBe(body.name)
        }
      }

      await createOne(Genre)(req, res);
    })
  })
})