import express from "express";
import {petControllers} from "./pet.controller";
import auth from "../../../middlewares/auth";
import validateRequest from "../../../middlewares/validateRequest";
import {petValidationSchema} from "./pet.validation";

const router = express.Router();

/*
post route to add pet data,here first auth is used to authenticate user 
and then req body is validated using zod schema
*/
router.post(
  "/pets",
  auth(),
  validateRequest(petValidationSchema.petValidationToInsert),
  petControllers.insertPetData
);
/*
get route to get pet data,here  auth is used to authenticate user so that only 
valid users can access the data
*/
router.get("/pets", petControllers.getPetData);

/*
    put route to update pet data,here first auth is used to authenticate user 
    and then req body is validated using zod schema to ensure the valid fields
*/
router.put(
  "/pets/:petId",
  auth(),
  validateRequest(petValidationSchema.petValidationToUpdate),
  petControllers.updatePetData
);

export const petRoutes = router;
