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
exports.adoptionServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// service to insert adoption requests data to the database along with the current user id
const insertAdoptionRequestsToDB = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("data: ", data, "\n", "id:", id);
    const result = yield prisma_1.default.adoptionRequest.create({
        data: Object.assign(Object.assign({}, data), { userId: id }),
    });
    console.log({ result });
    return result;
});
// service to get all adoption requests data from the database
const getAdoptionRequestsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.adoptionRequest.findMany();
    console.log({ result });
    return result;
});
// service to update adoption requests status data to the database using request id
const updateAdoptionRequestsInDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.adoptionRequest.update({
        where: {
            id,
        },
        data,
    });
    console.log("updated service", { result });
    return result;
});
exports.adoptionServices = {
    insertAdoptionRequestsToDB,
    getAdoptionRequestsFromDB,
    updateAdoptionRequestsInDB,
};
