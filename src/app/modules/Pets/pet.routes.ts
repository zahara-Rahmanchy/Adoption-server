import express from "express";
import {petControllers} from "./pet.controller";
import auth from "../../../middlewares/auth";

const router = express.Router();

router.post("/pets", auth(), petControllers.insertPetData);

router.get("/pets", auth(), petControllers.getPetData);
router.put("/pets/:petId", auth(), petControllers.updatePetData);

export const petRoutes = router;
