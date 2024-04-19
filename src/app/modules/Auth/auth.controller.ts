import {Request, Response} from "express";
import catchAsync from "../../../shared/catchAsync";
import {AuthServices} from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import {request} from "../../../middlewares/auth";
// logging user based on the user credentials
const loginUser = catchAsync(async (req: request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  console.log({result});
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
