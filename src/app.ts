import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { protect, signin, signup } from './lib/auth';
import errorHandler from './lib/errorManagement/handler';
import morganMiddleware from './lib/logger/morgan';
import { authorRouter } from './resources/author';
import { bookRouter } from './resources/book';
import { bookTransactionRouter } from './resources/bookTransaction';
import { fineRouter } from './resources/fine';
import { genreRouter } from './resources/genre';
import { publisherRouter } from './resources/publisher';
import { userRouter } from './resources/user';

export const app = express()

app.use(cors())
app.use(helmet())
app.use(json())
app.use(urlencoded({ extended: true}))
app.use(morganMiddleware)

app.use('/signin', signin)
app.use('/signup', signup)

app.use('/api', protect)
app.use('/api/v1/author', authorRouter)
app.use('/api/v1/book', bookRouter)
app.use('/api/v1/fine', fineRouter)
app.use('/api/v1/genre', genreRouter)
app.use('/api/v1/publisher', publisherRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/book-transaction', bookTransactionRouter)


app.use((err, _req, res, next) => {
  if (err == null) return next()
  errorHandler(err, res)
})

app.use('*', (_req, res) => res.status(404).end())
