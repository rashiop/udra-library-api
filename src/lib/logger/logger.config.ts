import winston from 'winston';

import config from '../../config';
import { COLORS, LEVELS } from './logger.constant';

winston.addColors(COLORS)

export const levels = LEVELS;

export const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.prettyPrint(),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)

export const transports = [
  new winston.transports.Console({
    level: "debug"
  }),
  new winston.transports.File({
    filename: './logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({
    filename: './logs/logs.log'
  }),
]

export function level() {
  const env = config.env || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}
