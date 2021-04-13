import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404);
  return next(createError(404, `${req.originalUrl} not found`));
};

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): Response => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode);
  return res.json({
    status: statusCode,
    result: null,
    error: error.stack
  });
};
