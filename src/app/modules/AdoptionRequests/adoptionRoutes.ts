import express from "express";

import auth from "../../../middlewares/auth";
import {adoptionRequestController} from "./adoptionController";

const router = express.Router();

router.post(
  "/adoption-request",
  auth(),
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
  adoptionRequestController.updateAdoptionRequests
);

export const adoptionRequestRoutes = router;
