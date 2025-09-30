import OpenAI from "openai";
import { buildDocsSystemPrompt, buildSystemPrompt, buildUserPrompt } from "./prompt";
import type { DietPlanRequest} from "./types";
import fs from "fs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
  timeout: 2 * 60 * 1000, // 2 Minutos
  logLevel: "debug"
});

export async function generateDietPlan(input: DietPlanRequest){
  const diretrizes = fs.readFileSync("knowledge/diretrizes.md", "utf-8")

  const data = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {role: "system", content: "Assistente de balcão" },
      {role: "user", content: "Quem é você?" },
      // {role: "system", content: buildSystemPrompt() },
      // {role: "user", content: buildUserPrompt(input) },
    ],
    temperature: 0.6, // Qunto maior, mais criativo, quanto menor, mais focado
    stream: false,
  })

  console.log(data.choices[0]?.message)

  return "Ok";
}