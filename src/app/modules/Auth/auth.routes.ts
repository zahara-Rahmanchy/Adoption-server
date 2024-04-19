import express from "express";
import {AuthController} from "./auth.controller";

const router = express.Router();

// route to login user
router.post("/login", AuthController.loginUser);

export const AuthRoutes = router;
