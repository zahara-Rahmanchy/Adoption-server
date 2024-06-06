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
    statusCode: 200,
    message: "Pets retrieved successfully",
    meta,
    data: result,
  });
});

// get data by pet id
const getPetDataById = catchAsync(async (req: request, res: Response) => {
  const result = await petServices.getDataById(req.params.petId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Pet data retrieved successfully",
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

// deleting data in the db based on petId
const deletePetData = catchAsync(async (req: request, res: Response) => {
  console.log("user controller:", req.body, "id", req.params);

  const result = await petServices.deletePetFromDB(req.params.petId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Pet data deleted successfully",
    data: result,
  });
});

// deleting data in the db based on petId
const getDetailedData = catchAsync(async (req: request, res: Response) => {
  console.log("user controller:", req.body, "id", req.params);

  const result = await petServices.getDetailedDataFromDb();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Detailed data fetched successfully",
    data: result,
  });
});
export const petControllers = {
  insertPetData,
  getPetData,
  updatePetData,
  getPetDataById,
  deletePetData,
  getDetailedData,
};
