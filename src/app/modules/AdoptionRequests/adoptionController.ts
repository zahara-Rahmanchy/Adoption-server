import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import {Request, Response} from "express";
import {adoptionServices} from "./adoptionSevices";
import {request} from "../../../middlewares/auth";

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

export const adoptionRequestController = {
  insertAdoptionRequests,
};
