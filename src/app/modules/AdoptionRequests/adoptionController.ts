import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import {Request, Response} from "express";
import {adoptionServices} from "./adoptionSevices";
import {request} from "../../../middlewares/auth";

// insert AdoptionRequests to database along with the current userId received from req.userId
const insertAdoptionRequests = catchAsync(
  async (req: request, res: Response) => {
    console.log("user controller:", req.body, req.userId);

    const result = await adoptionServices.insertAdoptionRequestsToDB(
      req.body,
      String(req.userId)
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
const getAdoptionRequests = catchAsync(async (req: request, res: Response) => {
  const result = await adoptionServices.getAdoptionRequestsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Adoption requests retrieved successfully",
    data: result,
  });
});

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
export const adoptionRequestController = {
  insertAdoptionRequests,
  getAdoptionRequests,
  updateAdoptionRequests,
};
