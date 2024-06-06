import express from "express";
import {petControllers} from "./pet.controller";
import auth from "../../../middlewares/auth";
import validateRequest from "../../../middlewares/validateRequest";
import {petValidationSchema} from "./pet.validation";
import {userRoles} from "@prisma/client";

const router = express.Router();

/*
post route to add pet data,here first auth is used to authenticate user 
and then req body is validated using zod schema
*/
router.post(
  "/pets",
  auth(userRoles.Admin),
  validateRequest(petValidationSchema.petValidationToInsert),
  petControllers.insertPetData
);
/*
get route to get pet data,here  auth is used to authenticate user so that only 
valid users can access the data
*/
router.get("/pets", petControllers.getPetData);
/*
    get route to fetch pet data bny id ,
*/
router.get(
  "/pets/:petId",
  auth(userRoles.Admin, userRoles.User),
  petControllers.getPetDataById
);

/*
    put route to update pet data,here first auth is used to authenticate user 
    and then req body is validated using zod schema to ensure the valid fields
*/
router.put(
  "/pets/:petId",
  auth(userRoles.Admin),
  validateRequest(petValidationSchema.petValidationToUpdate),
  petControllers.updatePetData
);

/**
 * route to delete pet data, only admins can
 */
router.delete(
  "/pet/:petId",
  auth(userRoles.Admin),

  petControllers.deletePetData
);

/**
 * route to get pet data, only admins can
 */
router.get(
  "/detailed-pets",
  auth(userRoles.Admin),

  petControllers.getDetailedData
);
export const petRoutes = router;
