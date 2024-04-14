import {Request, Response} from "express";

import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {petServices} from "./pet.service";
import pick from "../../../shared/pick";

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
const getPetData = catchAsync(async (req: Request, res: Response) => {
  console.log("user controller:", req.body);
  const metaOptions = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await petServices.getPetDataFromDB(metaOptions);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Pets retrieved successfully",
    data: result,
  });
});

export const petControllers = {
  insertPetData,
  getPetData,
};
