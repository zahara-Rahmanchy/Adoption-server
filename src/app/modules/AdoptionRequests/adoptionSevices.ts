import prisma from "../../../shared/prisma";

const insertAdoptionRequestsToDB = async (data: any, id: string) => {
  console.log("data: ", data, "\n", "id:", id);

  const result = await prisma.adoptionRequest.create({
    data: {
      ...data,
      userId: id,
    },
  });
  console.log({result});
  return result;
};

export const adoptionServices = {
  insertAdoptionRequestsToDB,
};
