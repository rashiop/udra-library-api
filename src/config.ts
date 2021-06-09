import customEnv from 'custom-env';

if (customEnv) {
  customEnv.env(true)
}

export default {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8080,
    language: process.env.DEFAULT_LANGUAGE || 'EN',
    dbUri: `${process.env.DB_URL || ''}`,
    dbSetting: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
    secrets: {
        jwt: process.env.JWT_SECRET || 'secret',
        jwt_exp: '100d',
        salt_round: process.env.SALT_ROUND || 10
    }
}