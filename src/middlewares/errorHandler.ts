import { ErrorRequestHandler } from 'express';

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = 400;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Something went wrong',
    error: err,
  });
};
