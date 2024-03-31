import express from "express";
import {petControllers} from "./pet.controller";

const router = express.Router();

router.post("/pets", petControllers.insertPetData);

export const petRoutes = router;
