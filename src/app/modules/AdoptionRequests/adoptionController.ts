import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import {Request, Response} from "express";
import {adoptionServices} from "./adoptionSevices";
import {request} from "../../../middlewares/auth";

// insert AdoptionRequests to database along with the current userId received from req.userId
const insertAdoptionRequests = catchAsync(
  async (req: Request, res: Response) => {
    console.log("adopt controller:", req.body, req.user);

    const result = await adoptionServices.insertAdoptionRequestsToDB(
      req.body,
      String(req.user?.id)
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Adoption request submitted successfully",
      data: result,
    });
  }
);

// get AdoptionRequests from database
const getAdoptionRequests = catchAsync(async (req: Request, res: Response) => {
  const result = await adoptionServices.getAdoptionRequestsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Adoption requests retrieved successfully",
    data: result,
  });
});

/*
  get adoption request made by specific user
*/
const getAdoptionRequestsById = catchAsync(
  async (req: Request, res: Response) => {
    console.log("req.user: ", req.user);
    const result = await adoptionServices.getAdoptionRequestsByIdFromDB(
      String(req.user?.id)
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Adoption requests retrieved successfully",
      data: result,
    });
  }
);

// updating adoption data in the db based on the requestId
const updateAdoptionRequests = catchAsync(
  async (req: request, res: Response) => {
    console.log("user controller:", req.body, "id", req.params);

    const result = await adoptionServices.updateAdoptionRequestsInDB(
      req.params.requestId,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Pet profile updated successfully",
      data: result,
    });
  }
);

// get Adopted pets from database
const getAdoptedPets = catchAsync(async (req: Request, res: Response) => {
  const result = await adoptionServices.getAdoptedPetsFromDB(
    String(req?.user?.id)
  );
  if (result.length === 0) {
    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "No Adopted Pets Found",
      data: result,
    });
  }
  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Adopted Pets retrieved successfully",
    data: result,
  });
});
export const adoptionRequestController = {
  insertAdoptionRequests,
  getAdoptionRequests,
  updateAdoptionRequests,
  getAdoptedPets,
  getAdoptionRequestsById,
};
