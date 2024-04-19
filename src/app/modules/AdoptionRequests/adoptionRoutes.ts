import express from "express";

import auth from "../../../middlewares/auth";
import {adoptionRequestController} from "./adoptionController";
import {adoptionRequestsValidationSchema} from "./adoptionValidation";
import validateRequest from "../../../middlewares/validateRequest";

const router = express.Router();

/*
post route to create adoption requests,here first auth is used to authenticate user 
and then req body is validated using zod schema
*/
router.post(
  "/adoption-request",
  auth(),
  validateRequest(adoptionRequestsValidationSchema.adoptionRequestsValidation),
  adoptionRequestController.insertAdoptionRequests
);
/*
get route to get pet data,here first auth is used to authenticate user 

*/
router.get(
  "/adoption-requests",
  auth(),
  adoptionRequestController.getAdoptionRequests
);

/*
put route to update adoption status,here first auth is used to authenticate user 
and then req body is validated using zod schema to ensure status field and its enumvalues
*/
router.put(
  "/adoption-requests/:requestId",
  auth(),
  validateRequest(adoptionRequestsValidationSchema.updateAdoptionStatus),
  adoptionRequestController.updateAdoptionRequests
);

export const adoptionRequestRoutes = router;
