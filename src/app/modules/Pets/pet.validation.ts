import {petSize} from "@prisma/client";
import {z} from "zod";
// validation schema for inserting pet data
const petValidationToInsert = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  image: z.array(z.string()),
  species: z.string({
    required_error: "Species is required",
  }),
  breed: z.string({
    required_error: "Breed is required",
  }),
  age: z.number({
    required_error: "Age is required",
  }),
  size: z.enum([petSize.Large, petSize.Medium, petSize.Small]),
  location: z.string({
    required_error: "Location is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  temperament: z.string({
    required_error: "Temperament is required",
  }),
  medicalHistory: z.string({
    required_error: "MedicalHistory is required",
  }),
  adoptionRequirements: z.string({
    required_error: "AdoptionRequirements is required",
  }),
});
// validation schema for updating pet data
const petValidationToUpdate = z.object({
  body: z
    .object({
      name: z
        .string({
          required_error: "Name is required",
        })
        .optional(),
      image: z.array(z.string()).optional(),
      species: z
        .array(
          z.string({
            required_error: "Species is required",
          })
        )
        .optional(),
      breed: z
        .string({
          required_error: "Breed is required",
        })
        .optional(),
      age: z
        .number({
          required_error: "Age is required",
        })
        .optional(),
      size: z.enum([petSize.Large, petSize.Medium, petSize.Small]).optional(),
      location: z
        .string({
          required_error: "Location is required",
        })
        .optional(),
      description: z
        .string({
          required_error: "Description is required",
        })
        .optional(),
      temperament: z
        .string({
          required_error: "Temperament is required",
        })
        .optional(),
      medicalHistory: z
        .string({
          required_error: "MedicalHistory is required",
        })
        .optional(),
      adoptionRequirements: z
        .string({
          required_error: "AdoptionRequirements is required",
        })
        .optional(),
    })
    .strict(),
});

export const petValidationSchema = {
  petValidationToInsert,
  petValidationToUpdate,
};
