import {AdoptionStatus} from "@prisma/client";
import {z} from "zod";

const adoptionRequestsValidation = z.object({
  petId: z.string({required_error: "Pet Id Field value is required"}),
  petOwnershipExperience: z.string({
    required_error: "Pet Ownership Experience is required",
  }),
});

const updateAdoptionStatus = z.object({
  body: z
    .object({
      petId: z.string({required_error: "Pet Id Field value is required"}),
      status: z.enum([
        AdoptionStatus.APPROVED,
        AdoptionStatus.PENDING,
        AdoptionStatus.REJECTED,
      ]),
    })
    .strict(),
});

export const adoptionRequestsValidationSchema = {
  adoptionRequestsValidation,
  updateAdoptionStatus,
};
