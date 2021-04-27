import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express from 'express';

import errorHandler from './lib/errorManagement/handler';
import morganMiddleware from './lib/logger/morgan';
import { genreRouter } from './resources/genre';
import { userRouter } from './resources/user';

export const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true}))
app.use(morganMiddleware)
// app.use(errorHandler)

app.use(function (_req, _res, next) {
  console.log('Time:', Date.now())
  next()
})


app.use('/api/v1/genre', genreRouter)
app.use('/api/v1/user', userRouter)


app.use(function(err, _req, res, next) {
  if (err == null) return next();
  errorHandler(err, res)
})

app.use('*', (_req, res) => res.status(404).end())



  