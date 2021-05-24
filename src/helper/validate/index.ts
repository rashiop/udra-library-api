import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

const validate = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    
    const message = errors.array()[0].msg;
    return res.status(400).json({ error: true, message }).end();
  }
}


export default validate;