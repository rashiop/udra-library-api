import customEnv from 'custom-env';

const inDeployment = Boolean(process.env.VERCEL_ENV)
if (customEnv && !inDeployment) {
  customEnv.env(true)
}

export default {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8000,
    language: process.env.DEFAULT_LANGUAGE || 'en',
    dbUri: process.env.DB_URL || '',
    secrets: {
        jwt: process.env.JWT_SECRET || 'secret',
        jwt_exp: '100d',
        salt_round: process.env.SALT_ROUND || 10
    }
}