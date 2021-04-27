import mongoose from 'mongoose';

import config from '../config';

export default function connectDB() {
  return mongoose.connect(
    config.dbUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
    () => console.log('Mongoose is connected')
  )
}