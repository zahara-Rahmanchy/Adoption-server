import express from "express";
import {petControllers} from "./pet.controller";
import auth from "../../../middlewares/auth";
import validateRequest from "../../../middlewares/validateRequest";
import {petValidationSchema} from "./pet.validation";

const router = express.Router();

router.post(
  "/pets",
  auth(),
  validateRequest(petValidationSchema.petValidationToInsert),
  petControllers.insertPetData
);

router.get("/pets", auth(), petControllers.getPetData);
router.put(
  "/pets/:petId",
  auth(),
  validateRequest(petValidationSchema.petValidationToUpdate),
  petControllers.updatePetData
);

export const petRoutes = router;
