import express from "express";
import {userRoutes} from "../app/modules/User/user.routes";
import {AuthRoutes} from "../app/modules/Auth/auth.routes";
import {petRoutes} from "../app/modules/Pets/pet.routes";
import {adoptionRequestRoutes} from "../app/modules/AdoptionRequests/adoptionRoutes";

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
  {
    path: "/",
    route: adoptionRequestRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
