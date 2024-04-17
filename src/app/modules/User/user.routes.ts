import express from "express";
import {userControllers} from "./user.controller";

const router = express.Router();

// route to create user
router.post("/register", userControllers.createUser);

// route to get all users profile
router.get("/profile", userControllers.getUsers);
export const userRoutes = router;
