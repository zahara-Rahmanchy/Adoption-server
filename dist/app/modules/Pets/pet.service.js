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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const petConstants_1 = require("./petConstants");
const capitalize_1 = require("./capitalize");
// creates pet data in the database
const insertPetDataService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("data: ", data, "\n");
    const { species, breed } = data, rest = __rest(data, ["species", "breed"]);
    console.log("species: ", species, "breed: ", breed);
    console.log("species: ", (0, capitalize_1.capitalize)(species), "breed: ", (0, capitalize_1.capitalize)(breed));
    const result = yield prisma_1.default.pets.create({
        data: Object.assign(Object.assign({}, rest), { species: (0, capitalize_1.capitalize)(species), breed: (0, capitalize_1.capitalize)(breed) }),
    });
    console.log({ result });
    return result;
});
// gets pet data based on the searchTerm, filter options and also meta options
// shows total data fetched as well
const getPetDataFromDB = (params, metaOptions) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(metaOptions);
    const { limit, page, sortBy, sortOrder } = metaOptions;
    const { searchTerm } = params, filtersOptions = __rest(params, ["searchTerm"]);
    console.log({ searchTerm }, Object.assign({}, filtersOptions));
    const pageCount = page ? page : 1;
    const dataLimit = limit ? limit : 10;
    const validOptions = sortBy && petConstants_1.sortByOptions.includes(sortBy) ? sortBy : "createdAt";
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: petConstants_1.petSearchFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filtersOptions).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersOptions).map(field => ({
                [field]: {
                    equals: field === "age"
                        ? Number(filtersOptions[field])
                        : filtersOptions[field],
                    mode: "insensitive",
                },
            })),
        });
    }
    const whereConditions = { AND: andConditions };
    const result = yield prisma_1.default.pets.findMany({
        where: whereConditions,
        skip: Number(pageCount - 1) * dataLimit,
        take: Number(dataLimit),
        orderBy: sortBy && sortOrder
            ? {
                [validOptions.toString()]: sortOrder,
            }
            : {
                [validOptions]: "desc",
            },
    });
    console.log(validOptions.toString().toLowerCase());
    const total = yield prisma_1.default.pets.count({
        skip: page && limit ? Number(page - 1) * limit : Number(1 - 1) * 10,
        take: limit ? Number(limit) : 10,
        orderBy: sortBy && sortOrder
            ? {
                [validOptions.toString()]: sortOrder,
            }
            : {
                [validOptions]: "desc",
            },
    });
    console.log({ result }, { total });
    const meta = {
        page: Number(pageCount),
        limit: Number(dataLimit),
        total: total,
    };
    return { meta, result };
});
// updated pet data based on the peId
const updatePetInDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.pets.update({
        where: {
            id,
        },
        data,
    });
    console.log("updated service", { result });
    return result;
});
exports.petServices = {
    insertPetDataService,
    getPetDataFromDB,
    updatePetInDB,
};
