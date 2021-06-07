import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import config from '../../config';
import { IUserDoc, User } from '../../resources/user';
import { commonErrors } from '../errorManagement';

const newToken = (user: IUserDoc) => {
  const { secrets: { jwt: jwtSecret, jwt_exp: expiresIn }} = config;
  const { _id: userId } = user;
  return jwt.sign({ userId }, jwtSecret, { expiresIn })
}

const verifyToken = async(token: string) => await jwt.verify(token, config.secrets.jwt)

const isValidUser = async (user: IUserDoc, password: string) => {
  if (user) {
    const match = await user.checkPassword(password);
    return Boolean(match);
  }
  return false;
}

const isPermittedRoles = (permittedRoles: string[], role: string) => {
  return permittedRoles.includes(role);
}

export const signup = async(req: Request, res: Response) => {
  try {
    const user = await User.create(req.body)
    const token = newToken(user)
    return res.status(201).json({ token })
  } catch({ message, httpCode = 400 }) {
    return res.status(httpCode).send({ message, error: true })
  }
}

export const signin = async(req: Request, res: Response) => {
  try {
    const { body: { email, password } } = req;
    const user = await User.findOne({ email })
    if (user && isValidUser(user, password)) {
      const token = newToken(user)
      return res.status(200).json({ token })
    }

    throw commonErrors.UnauthorizedError({
      message: 'Invalid username/password'
    })
  } catch({ message, httpCode = 401 }) {
    return res.status(httpCode).send({ message, error: true })
  }
}

export const protect = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { headers: { authorization } } = req;
    if (!authorization) {
      throw commonErrors.UnauthorizedError({ message: 'Unauthorized' })
    }
    
    const [, token] = authorization.split('Bearer ');
    const payload = await verifyToken(token)
    const user = await User
      .findById((<any>payload).userId)
      .select('-password')
      .lean()
      .exec()
    
    if (user) {
      req['user'] = user
      return next()
    }
  } catch({ message, httpCode = 401 }) {
    return res.status(httpCode).send({ message, error: true })
  }
}

export const checkPermissionRole = (...permittedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (isPermittedRoles(permittedRoles, req?.['user'].role)) {
        return next()
      }
      throw commonErrors.OperationNotAllowedError({ message: 'Forbidden' })
    } catch({ message, httpCode }) {
      return res.status(httpCode).send({ message, error: true })
    }
  }
}

export const checkPermissionLoginUser = (...permittedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { role: userRole, _id: userId } = req?.['user']
      const isUser = userId === req.params.id
      if (isPermittedRoles(permittedRoles, userRole) || isUser) {
        return next()
      }
    } catch({ message, httpCode }) {
      return res.status(httpCode).send({ message, error: true })
    }
  }
}

export default {
  signup,
  signin 
}