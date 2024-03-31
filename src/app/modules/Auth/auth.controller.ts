import {Request, Response} from "express";
import catchAsync from "../../../shared/catchAsync";
import {AuthServices} from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  console.log({result});
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

// const refreshToken = catchAsync(async (req: Request, res: Response) => {
//   const {refreshToken} = req.cookies;

//   const result = await AuthServices.refreshToken(refreshToken);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Logged in successfully!",
//     data: result,
//     // data: {
//     //     accessToken: result.accessToken,
//     //     needPasswordChange: result.needPasswordChange
//     // }
//   });
// });

export const AuthController = {
  loginUser,
  // refreshToken
};
