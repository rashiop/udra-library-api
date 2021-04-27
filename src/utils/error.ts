type IError = {
    name: string,
    httpCode: number,
    description: string,
    isOperational: boolean
}
  
class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: number;
  public readonly isOperational: boolean;

  constructor({ name, description, httpCode, isOperational = false }: IError) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }

}

export default AppError;