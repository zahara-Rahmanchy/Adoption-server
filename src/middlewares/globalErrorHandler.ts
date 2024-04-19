import {ErrorRequestHandler, NextFunction, Request, Response} from "express";
import httpStatus from "http-status";
import {ZodError, ZodIssue} from "zod";
import ApiError from "../app/erros/ApiError";
type ErrorResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  errorDetails: any;
};
// handling errors
const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorResponse: ErrorResponse = {
    success: false,
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    message: err.message,
    errorDetails: err,
  };

  if (err instanceof ZodError) {
    const errorSources = err.issues.map((issue: ZodIssue) => {
      return {
        field: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    errorResponse.statusCode = httpStatus.BAD_REQUEST;
    errorResponse.message = errorSources.map(field => field.message).join(". ");
    errorResponse.errorDetails = {
      issues: errorSources,
    };
    // console.dir(errorSources);
  } else if (err instanceof ApiError) {
    console.log({Error});
    errorResponse.statusCode = err.statusCode;
    errorResponse.message = err.message;
    errorResponse.errorDetails = err.error;
  } else if ((err instanceof Error) as any) {
    // console.log(err.status);
    errorResponse.statusCode = err.status;
    errorResponse.message = err.message;
    errorResponse.errorDetails = err;
  }
  return res.status(errorResponse.statusCode).json({
    success: false,
    message: errorResponse.message,
    errorDetails: errorResponse.errorDetails,
  });
};

export default globalErrorHandler;
