import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import {Pets, Prisma} from "@prisma/client";
import {petSearchFields, sortByOptions} from "./petConstants";

const insertPetDataService = async (data: any) => {
  console.log("data: ", data, "\n");

  const result = await prisma.pets.create({
    data: data,
  });
  console.log({result});
  return result;
};

const getPetDataFromDB = async (params: any, metaOptions: any) => {
  console.log(metaOptions);
  const {limit, page, sortBy, sortOrder} = metaOptions;
  const {searchTerm, ...filtersOptions} = params;
  console.log({searchTerm}, {...filtersOptions});

  const pageCount = page ? page : 1;
  const dataLimit = limit ? limit : 10;
  const validOptions =
    sortBy && sortByOptions.includes(sortBy) ? sortBy : "createdAt";

  const andConditions: Prisma.PetsWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: petSearchFields.map(field => ({
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
          equals:
            field === "age"
              ? Number(filtersOptions[field])
              : filtersOptions[field],
          mode: "insensitive",
        },
      })),
    });
  }
  const whereConditions: Prisma.PetsWhereInput = {AND: andConditions};
  const result = await prisma.pets.findMany({
    where: whereConditions,
    skip: Number(pageCount - 1) * dataLimit,
    take: Number(dataLimit),
    orderBy:
      sortBy && sortOrder
        ? {
            [validOptions.toString()]: sortOrder,
          }
        : {
            [validOptions]: "desc",
          },
  });
  const total = await prisma.pets.count({
    skip: page && limit ? Number(page - 1) * limit : Number(1 - 1) * 10,
    take: limit ? Number(limit) : 10,
    orderBy:
      sortBy && sortOrder
        ? {
            [validOptions.toString()]: sortOrder,
          }
        : {
            [validOptions]: "desc",
          },
  });
  console.log({result}, {total});

  const meta = {
    page: Number(pageCount),
    limit: Number(dataLimit),
    total: total,
  };

  return {meta, result};
};

const updatePetInDB = async (id: string, data: Partial<Pets>) => {
  const result = await prisma.pets.update({
    where: {
      id,
    },
    data,
  });
  console.log("updated service", {result});
  return result;
};

export const petServices = {
  insertPetDataService,
  getPetDataFromDB,
  updatePetInDB,
};
