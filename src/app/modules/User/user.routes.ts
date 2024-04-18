import express from "express";
import {userControllers} from "./user.controller";
import auth from "../../../middlewares/auth";
import validateRequest from "../../../middlewares/validateRequest";
import {userValidationSchema} from "./user.validation";

const router = express.Router();

// route to create user
router.post(
  "/register",
  validateRequest(userValidationSchema.userValidation),
  userControllers.createUser
);

// route to get all users profile
router.get("/profile", auth(), userControllers.getUsers);

// route to update user profile using userId from request
router.put("/profile", auth(), userControllers.updateUserData);
export const userRoutes = router;
