import { z } from "zod";

export const DietPlanRequestSchema = z.object({
   nome : z.string().min(3),
   idade: z.number().positive(),
   altura_cm: z.number().positive(),
   peso_kg: z.number().positive(),
   sexo: z.enum(["maculino", "feminino"]),
   nivel_atividade: z.enum(["sedentário", "2x_semana", "4x_semana"]),
   objetivo: z.enum(["perda_de_peso", "hipertrofia", "manter_massa_muscular"]),
});

export type DietPlanRequestSchema = z.infer<typeof DietPlanRequestSchema>