import app from './app';
import config from './config';
import connectDB from './lib/db';

connectDB();
const server = app.listen(config.port, () => {
  console.log(`Udra's library (${config.env}) alive on port: ${config.port}`)
})



export default server;