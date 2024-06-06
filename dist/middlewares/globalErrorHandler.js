"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const ApiError_1 = __importDefault(require("../app/erros/ApiError"));
// handling errors
const globalErrorHandler = (err, req, res, next) => {
    const errorResponse = {
        success: false,
        statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
        message: err.message,
        errorDetails: err,
    };
    console.log("status code: ", errorResponse.statusCode);
    if (err instanceof zod_1.ZodError) {
        const errorSources = err.issues.map((issue) => {
            return {
                field: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
                message: issue.message,
            };
        });
        errorResponse.statusCode = http_status_1.default.BAD_REQUEST;
        errorResponse.message = errorSources.map(field => field.message).join(". ");
        errorResponse.errorDetails = {
            issues: errorSources,
        };
        // console.dir(errorSources);
    }
    else if (err instanceof ApiError_1.default) {
        console.log({ Error });
        errorResponse.statusCode = err.statusCode;
        errorResponse.message = err.message;
        errorResponse.errorDetails = err.error;
    }
    else if ((err instanceof Error)) {
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
exports.default = globalErrorHandler;
