"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
/*
post route to create user,herereq body is validated using zod schema and then passed
to controller
*/
router.post("/register", (0, validateRequest_1.default)(user_validation_1.userValidationSchema.userValidation), user_controller_1.userControllers.createUser);
/* get route to get all users profile where auth middleware is used to ensure
only authenticated users can access*/
router.get("/profile", (0, auth_1.default)(), user_controller_1.userControllers.getUsers);
/*r
pute to update user profile using userId from request after ensuring valid user
through auth middleware and then validating the req body using zod scheme
*/
router.put("/profile", (0, auth_1.default)(), (0, validateRequest_1.default)(user_validation_1.userValidationSchema.userUpdateValidation), user_controller_1.userControllers.updateUserData);
exports.userRoutes = router;
