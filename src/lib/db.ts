import mongoose from 'mongoose';

import config from '../config';

const connectDB = async() => {
  try {
    await mongoose.connect(
      config.dbUri,
      config.dbSetting
    )
    console.log('Mongoose is connected')
  } catch(err) {
    console.error(err)
  }
  return;
}

export default connectDB;