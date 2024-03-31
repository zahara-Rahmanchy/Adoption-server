import {Request, Response} from "express";

import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {petServices} from "./pet.service";

const insertPetData = catchAsync(async (req: Request, res: Response) => {
  console.log("user controller:", req.body);

  const result = await petServices.insertPetDataService(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Pet added successfully",
    data: result,
  });
});

export const petControllers = {
  insertPetData,
};
