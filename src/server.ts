import app from './app';
import config from './config';
import connectDB from './lib/db';

start();

async function start() {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(`Udra's library (${config.env}) alive on port: ${config.port}`)
    })
  } catch(e) {
    console.error(e)
  }
}