import mongoose from 'mongoose';

import config from '../config';

const connectDB = async() => {
  try {
    await mongoose.connect(
      config.dbUri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    )
    console.log('Mongoose is connected')
  } catch(err) {
    console.error(err)
  }
  return;
}

export default connectDB;