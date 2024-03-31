import express from "express";
import {userRoutes} from "../app/modules/User/user.routes";
import {AuthRoutes} from "../app/modules/Auth/auth.routes";
import {petRoutes} from "../app/modules/Pets/pet.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/",
    route: AuthRoutes,
  },
  {
    path: "/",
    route: petRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
