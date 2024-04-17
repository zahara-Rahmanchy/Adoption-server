import express from "express";

import auth from "../../../middlewares/auth";
import {adoptionRequestController} from "./adoptionController";

const router = express.Router();

router.post(
  "/adoption-request",
  auth(),
  adoptionRequestController.insertAdoptionRequests
);

export const adoptionRequestRoutes = router;
