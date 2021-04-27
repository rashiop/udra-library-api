import customEnv from 'custom-env';

if (customEnv) {
  customEnv.env(true)
}

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    dbUri: `mongodb+srv://udra:${process.env.DB_PASSWORD}@cluster0.rccyw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    secrets: {
        jwt: process.env.JWT_SECRET,
        jwt_exp: '100d',
        salt_round: process.env.SALT_ROUND || 8
    }
}