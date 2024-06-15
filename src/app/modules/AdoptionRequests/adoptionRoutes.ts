import express from "express";

import auth from "../../../middlewares/auth";
import {adoptionRequestController} from "./adoptionController";
import {adoptionRequestsValidationSchema} from "./adoptionValidation";
import validateRequest from "../../../middlewares/validateRequest";
import {userRoles} from "@prisma/client";

const router = express.Router();

/*
post route to create adoption requests,here first auth is used to authenticate user 
and then req body is validated using zod schema
*/
router.post(
  "/adoption-request",
  auth(userRoles.User),
  validateRequest(adoptionRequestsValidationSchema.adoptionRequestsValidation),
  adoptionRequestController.insertAdoptionRequests
);
/*
get route to get adoption-requests data,here first auth is used to authenticate user 

*/
router.get(
  "/adoption-requests",
  auth(userRoles.Admin),
  adoptionRequestController.getAdoptionRequests
);
/**
 * get route to get user specific adoption requests
 *
 */
router.get(
  "/my-adoption-requests",
  auth(userRoles.User),
  adoptionRequestController.getAdoptionRequestsById
);

/**
 * get route to get adopted pet data,here first auth is used to authenticate user 

*/
router.get(
  "/adopted-pets",
  auth(userRoles.User),
  adoptionRequestController.getAdoptedPets
);

/*
put route to update adoption status,here first auth is used to authenticate user 
and then req body is validated using zod schema to ensure status field and its enumvalues
*/
router.put(
  "/adoption-requests/:requestId",
  auth(userRoles.Admin),
  validateRequest(adoptionRequestsValidationSchema.updateAdoptionStatus),
  adoptionRequestController.updateAdoptionRequests
);

export const adoptionRequestRoutes = router;
