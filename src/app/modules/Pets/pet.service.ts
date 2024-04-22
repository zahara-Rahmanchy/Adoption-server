import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import {Pets, Prisma} from "@prisma/client";
import {petSearchFields, sortByOptions} from "./petConstants";
import {capitalize} from "./capitalize";

// creates pet data in the database
const insertPetDataService = async (data: any) => {
  console.log("data: ", data, "\n");
  const {species, breed, ...rest} = data;
  console.log("species: ", species, "breed: ", breed);
  console.log("species: ", capitalize(species), "breed: ", capitalize(breed));
  const result = await prisma.pets.create({
    data: {
      ...rest,
      species: capitalize(species),
      breed: capitalize(breed),
    },
  });
  console.log({result});
  return result;
};

// gets pet data based on the searchTerm, filter options and also meta options
// shows total data fetched as well
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
    if ("age" in filtersOptions) {
      filtersOptions.age = Number(filtersOptions.age);
      console.log("got age", filtersOptions.age, filtersOptions);
    }
    andConditions.push({
      AND: Object.keys(filtersOptions).map(field => ({
        [field]: {
          equals: filtersOptions[field],
          mode:
            typeof filtersOptions[field] == "string"
              ? "insensitive"
              : undefined,
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
  console.log(validOptions.toString().toLowerCase());
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

// updated pet data based on the peId
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
