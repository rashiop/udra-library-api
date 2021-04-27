import winstonExpress from 'express-winston';
import winston from 'winston';

import { format, level, levels, transports } from './logger.config';


// https://dev.to/vassalloandrea/better-logs-for-expressjs-using-winston-and-morgan-with-typescript-516n

export const Logger = winston.createLogger({
  level: level(),
  levels: levels,
  format,
  transports,
})

export const ExpressLogger = winstonExpress.logger({
  transports,
  format,
  expressFormat: true,
  meta: false,
  colorize: true,
  ignoreRoute: () => false
})
