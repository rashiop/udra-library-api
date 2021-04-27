export enum ErrorStatus {
  InvalidInput = 400,
  Unauthorized = 401,
  OperationNotAllowed = 403,
  ResourceNotFound = 404,
  DuplicateItem = 409,
  Conflict = 409,
  BadFormat = 422,
  UnknownError = 500
}

export enum ErrorName {
  InvalidInput = 'InvalidInput',
  Unauthorized = 'Unauthorized',
  OperationNotAllowed = 'OperationNotAllowed',
  ResourceNotFound = 'ResourceNotFound',
  DuplicateItem = 'DuplicateItem',
  Conflict = 'Conflict',
  BadFormat = 'BadFormat',
  UnknownError = 'UnknownError',
}

export type IError = {
  message: string,
  httpCode: ErrorStatus | number,
  name: keyof ErrorStatus | string,
} & Partial<{
  innerException: string
}>

// export type IErrorType = {
//   httpCode: ErrorStatus | number,
//   name: keyof ErrorStatus | string,
// }

export type ICreateError = {
  message: string,
  errType: keyof ErrorStatus | string
} & Partial<{
  name: string,
  innerException: string,
}>