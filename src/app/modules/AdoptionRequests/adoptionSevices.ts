import {AdoptedStatus, AdoptionRequest, AdoptionStatus} from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../erros/ApiError";
import httpStatus from "http-status";

// service to insert adoption requests data to the database along with the current user id
const insertAdoptionRequestsToDB = async (data: any, id: string) => {
  console.log("data: ", data, "\n", "id:", id);
  const isUserExists = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });

  if (!isUserExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exists!", "", "");
  }
  const isSameRequest = await prisma.adoptionRequest.findFirst({
    where: {
      userId: id,
      petId: data.petId,
    },
  });
  console.log("isSameReq: ", isSameRequest);
  if (isSameRequest !== null) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Sorry,You've already made an adoption request for this pet!",
      "",
      ""
    );
  }
  const result = await prisma.adoptionRequest.create({
    data: {
      ...data,
      userId: id,
    },
  });
  console.log({result});
  return result;
};

// service to get all adoption requests data from the database
const getAdoptionRequestsFromDB = async () => {
  const result = await prisma.adoptionRequest.findMany();
  console.log({result});
  return result;
};

// get adoption request by users

const getAdoptionRequestsByIdFromDB = async (id: string) => {
  const isUserExists = await prisma.user.findFirst({
    where: {
      id: id,
      active: true,
    },
  });

  if (!isUserExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exists!", "", "");
  }
  const result = await prisma.adoptionRequest.findMany({
    where: {
      userId: id,
    },
    include: {
      pet: true,
    },
  });
  console.log({result});
  return result;
};

// service to update adoption requests status data to the database using request id
const updateAdoptionRequestsInDB = async (
  id: string,
  data: Partial<AdoptionRequest>
) => {
  console.log("adop updata: ", data);
  const {status, petId} = data;
  const adoptData = {
    status: status,
  };
  const petStatus =
    status === "APPROVED" ? AdoptedStatus.ADOPTED : AdoptedStatus.PENDING;

  // };
  // const result = await prisma.adoptionRequest.update({
  //   where: {
  //     id,
  //   },
  //   data,
  // });

  const result = await prisma.$transaction(async prisma => {
    const updateAdoptReq = await prisma.adoptionRequest.update({
      where: {
        id,
      },
      data: {
        status: status,
      },
    });

    await prisma.pets.update({
      where: {
        id: petId,
      },
      data: {
        adoptedStatus: petStatus,
      },
    });
    return updateAdoptReq;
  });

  console.log("updated service", {result});
  return result;
};

// adopted pets
const getAdoptedPetsFromDB = async (id: string) => {
  const result = await prisma.adoptionRequest.findMany({
    where: {
      userId: id,
      status: AdoptionStatus.APPROVED,
    },
    include: {
      pet: true,
    },
  });

  console.log("adopted service", {result});
  return result;
};

export const adoptionServices = {
  insertAdoptionRequestsToDB,
  getAdoptionRequestsFromDB,
  updateAdoptionRequestsInDB,
  getAdoptedPetsFromDB,
  getAdoptionRequestsByIdFromDB,
};
