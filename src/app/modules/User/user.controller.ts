import {Request, Response} from "express";
import {userServices} from "./user.service";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {request} from "../../../middlewares/auth";

const createUser = catchAsync(async (req: request, res: Response) => {
  console.log("user controller:", req.body);

  const result = await userServices.createUserService(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: result,
  });
});

const getUsers = catchAsync(async (req: request, res: Response) => {
  const result = await userServices.getUsersFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User profile retrieved successfully",
    data: result,
  });
});

export const userControllers = {
  createUser,
  getUsers,
};
