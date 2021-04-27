import { IError } from './error.type';

class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: number;
  public readonly innerException?: string;

  constructor({
    httpCode,
    innerException,
    message,
    name,
  }: IError) {
    super(message);
    this.httpCode = httpCode;
    this.name = name;
    this.innerException = innerException;
  }

  toString() {
    let result = "\nError Info: ";
    if (this.name)
      result += `${this.name}`;
    if (this.httpCode)
      result += ` (${this.httpCode})`;
    if (this.message)
      result += `: ${this.message}`;
    result += '\n';
    if (this.stack)
      result += this.stack;
    if (this.innerException)
      result += `Inner Exception: ${this.innerException}`;

    return result;
  }
}

export default AppError;
