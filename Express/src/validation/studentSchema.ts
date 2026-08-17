import { z } from "zod";

export const createStudentSchema = z.object({
    name: z.string().trim().min(2).max(80),

    age: z.number().int().min(1).max(100),

    email: z.email(),

    phone: z.number(),
});

export const patchStudentSchema =
    createStudentSchema
        .partial()
        .refine(
            (changes) =>
                Object.keys(changes).length > 0,
            {
                message: "Nothing to update",
            }
        );

export const studentIdSchema = z.object({
    id: z
        .string()
        .regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid student ID"
        ),
});

export type CreateStudentInput =
    z.infer<typeof createStudentSchema>;

export type PatchStudentInput =
    z.infer<typeof patchStudentSchema>;