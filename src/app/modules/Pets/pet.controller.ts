import {Request, Response} from "express";

import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {petServices} from "./pet.service";
import pick from "../../../shared/pick";
import {petFilters} from "./petConstants";
import {request} from "../../../middlewares/auth";

// insert pet data to database
const insertPetData = catchAsync(async (req: request, res: Response) => {
  console.log("user controller:", req.body);

  const result = await petServices.insertPetDataService(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Pet added successfully",
    data: result,
  });
});

/* 
get pet data from database, here searching is implemented on specfic fields
also filtering and meta options are also used to fetch data
*/

const getPetData = catchAsync(async (req: request, res: Response) => {
  console.log("user controller:", req.body);
  const filtersOptions = pick(req.query, petFilters);
  const metaOptions = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const data = await petServices.getPetDataFromDB(filtersOptions, metaOptions);
  const {meta, result} = data;
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Pets retrieved successfully",
    meta,
    data: result,
  });
});

// updating data in the db based on petId
const updatePetData = catchAsync(async (req: request, res: Response) => {
  console.log("user controller:", req.body, "id", req.params);

  const result = await petServices.updatePetInDB(req.params.petId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Pet profile updated successfully",
    data: result,
  });
});
export const petControllers = {
  insertPetData,
  getPetData,
  updatePetData,
};
