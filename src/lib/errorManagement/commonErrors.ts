import AppError from './appError';
import { ErrorName, ErrorStatus, ICreateError } from './error.type';

function createError({
  message,
  name,
  innerException,
  errType = ErrorName.UnknownError,
}: ICreateError) {
  return new AppError({
    message,
    name: name || ErrorName[errType],
    httpCode: ErrorStatus[errType],
    innerException
  });
}

const createInvalidInputError = (props) => createError({ ...props, errType: ErrorName.InvalidInput });

const createUnauthorizedError = (props) => createError({ ...props, errType: ErrorName.Unauthorized });

const createOperationNotAllowedError = (props) => createError({ ...props, errType: ErrorName.OperationNotAllowed });

const createResourceNotFoundError = (props) => createError({ ...props, errType: ErrorName.ResourceNotFound });

const createDuplicateItemError = (props) => createError({ ...props, errType: ErrorName.DuplicateItem });

const createConflictError = (props) => createError({ ...props, errType: ErrorName.Conflict });

const createBadFormatError = (props) => createError({ ...props, errType: ErrorName.BadFormat });

const createUnknownError = (props) => createError({ ...props, errType: ErrorName.UnknownError });

export default {
  InvalidInputError: createInvalidInputError,
  UnauthorizedError: createUnauthorizedError,
  OperationNotAllowedError: createOperationNotAllowedError,
  ResourceNotFoundError: createResourceNotFoundError,
  DuplicateItemError: createDuplicateItemError,
  ConflictError: createConflictError,
  BadFormatError: createBadFormatError,
  UnknownError: createUnknownError
};
