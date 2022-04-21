export class ErrorResponse extends Error {
  statusCode: number;
  constructor(message: string | any, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}