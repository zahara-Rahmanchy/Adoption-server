import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import {Pets, Prisma, petSize} from "@prisma/client";
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
  console.log({params});
  const {limit, page, sortBy, sortOrder} = metaOptions;
  const {searchTerm, size, specialNeeds, ...filtersOptions} = params;
  console.log({searchTerm}, {...filtersOptions}, specialNeeds);

  const pageCount = page ? page : 1;
  const dataLimit = limit ? limit : 10;
  const validOptions =
    sortBy && sortByOptions.includes(sortBy) ? sortBy : "createdAt";

  const andConditions: Prisma.PetsWhereInput[] = [];

  if (searchTerm && searchTerm !== undefined) {
    andConditions.push({
      OR: petSearchFields.map(field => {
        if (field === "age") {
          return {
            [field]: {
              equals: Number(searchTerm),
            },
          };
        } else {
          return {
            [field]: {
              contains: searchTerm,
              mode: "insensitive",
            },
          };
        }
      }),
    });
  }

  // since size is enum so is pushed seperately
  if (size) {
    andConditions.push({
      size: {
        equals: size as petSize,
      },
    });
  }

  if (specialNeeds) {
    andConditions.push({
      specialNeeds: {
        has: specialNeeds,
      },
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
    where: whereConditions,
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
  // console.log({result}, {total});

  const meta = {
    page: Number(pageCount),
    limit: Number(dataLimit),
    total: total,
  };

  return {meta, result};
};

// get data based on id

const getDataById = async (id: string) => {
  const result = await prisma.pets.findUnique({
    where: {
      id,
    },
  });
  console.log("get service", {result});
  return result;
};

// get pet data along with adoption requests and user information
const getDetailedDataFromDb = async () => {
  const result = await prisma.pets.findMany({
    include: {
      _count: {
        select: {
          adoptionRequest: true,
        },
      },
      adoptionRequest: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
              contactNumber: true,
            },
          },
        },
      },
    },
  });
  return result;
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

// // delete pet data based on the peId
const deletePetFromDB = async (id: string) => {
  const result = await prisma.pets.delete({
    where: {
      id,
    },
  });
  console.log("deleted service", {result});
  return result;
};

export const petServices = {
  insertPetDataService,
  getPetDataFromDB,
  getDataById,
  updatePetInDB,
  deletePetFromDB,
  getDetailedDataFromDb,
};
