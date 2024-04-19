"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionRequestController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const adoptionSevices_1 = require("./adoptionSevices");
// insert AdoptionRequests to database along with the current userId received from req.userId
const insertAdoptionRequests = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user controller:", req.body, req.userId);
    const result = yield adoptionSevices_1.adoptionServices.insertAdoptionRequestsToDB(req.body, String(req.userId));
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Adoption request submitted successfully",
        data: result,
    });
}));
// get AdoptionRequests from database
const getAdoptionRequests = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adoptionSevices_1.adoptionServices.getAdoptionRequestsFromDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Adoption requests retrieved successfully",
        data: result,
    });
}));
// updating adoption data in the db based on the requestId
const updateAdoptionRequests = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user controller:", req.body, "id", req.params);
    const result = yield adoptionSevices_1.adoptionServices.updateAdoptionRequestsInDB(req.params.requestId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Pet profile updated successfully",
        data: result,
    });
}));
exports.adoptionRequestController = {
    insertAdoptionRequests,
    getAdoptionRequests,
    updateAdoptionRequests,
};
