import OpenAI from "openai";
import { buildDocsSystemPrompt, buildSystemPrompt, buildUserPrompt } from "./prompt";
import type { DietPlanRequest} from "./types";

export async function generateDietPlan(input: DietPlanRequest){
  
   console.log("input");

   return input;
}