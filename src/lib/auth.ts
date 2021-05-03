import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import config from '../config';
import { IUserDoc, User } from '../resources/user';
import { commonErrors, ErrorStatus } from './errorManagement';

const newToken = (user: IUserDoc) => {
  return jwt.sign({
    userId: user._id,
  }, 
    config.secrets.jwt,
  {
    expiresIn: config.secrets.jwt_exp
  })
}

const verifyToken = async(token: string) => await jwt.verify(token, config.secrets.jwt)


export const signup = async(req: Request, res: Response) => {
  try {
    if (!req.body.email ||
        !req.body.password ||
        !req.body.firstname ||
        !req.body.gender
      ) {
      throw commonErrors.InvalidInputError({
        message: 'Please fill incomplete data'
      })
    }

    const user = await User.create(req.body)
    const token = newToken(user)
    return res.status(201).json({ token })
  } catch(ex) {
    return res.status(ex.httpCode || 400).send({
      error: ex.message
    })
  }
}

export const signin = async(req: Request, res: Response) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw commonErrors.InvalidInputError({
        message: 'Incomplete email or password'
      })
    }

    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      throw commonErrors.UnauthorizedError({
        message: 'Invalid User'
      })
    }
    const match = await user.checkPassword(req.body.password)
    if (!match) {
      throw commonErrors.UnauthorizedError({
          message: 'Invalid username/password'
      })
    }

    const token = newToken(user)
    return res.status(200).json({ token })
  } catch(ex) {
    return res.status(ex.httpCode || 401).send({
      message: ex.message
    })
  }
}


export const protect = async(req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw commonErrors.UnauthorizedError({
        message: 'Unauthorized'
      })
    }

    const payload = await verifyToken(
      req.headers.authorization.split('Bearer ')[1]
    )
    const user = await User
      .findById((<any>payload).userId)
      .select('-password')
      .lean()
      .exec()
    
    if (user) {
      req['user'] = user
      return next()
    }
  } catch(ex) {
    return res.status(ex.httpCode).send({
      error: ex.message
    })
  }
}

export const checkPermissionRole = (...permittedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req['user']
    if (user && permittedRoles.includes(user.role)) {
      return next()
    }
    return res.status(ErrorStatus.OperationNotAllowed).json({ message: 'Forbidden' })
  }
}

export const checkPermissionLogedInUser = (...permittedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req['user']
    const isPermittedRoles = user && (permittedRoles.includes(user.role))
    const logedInUser = user._id === req.params.id
    if (isPermittedRoles || logedInUser) {
      return next()
    }
    return res.status(ErrorStatus.OperationNotAllowed).json({ message: 'Forbidden' })
  }
}