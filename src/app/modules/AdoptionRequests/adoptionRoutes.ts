import express from "express";

import auth from "../../../middlewares/auth";
import {adoptionRequestController} from "./adoptionController";
import {adoptionRequestsValidationSchema} from "./adoptionValidation";
import validateRequest from "../../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/adoption-request",
  auth(),
  validateRequest(adoptionRequestsValidationSchema.adoptionRequestsValidation),
  adoptionRequestController.insertAdoptionRequests
);

router.get(
  "/adoption-requests",
  auth(),

  adoptionRequestController.getAdoptionRequests
);

router.put(
  "/adoption-requests/:requestId",
  auth(),
  validateRequest(adoptionRequestsValidationSchema.updateAdoptionStatus),
  adoptionRequestController.updateAdoptionRequests
);

export const adoptionRequestRoutes = router;
