import OpenAI from "openai";
import { buildDocsSystemPrompt, buildSystemPrompt, buildUserPrompt } from "./prompt";
import type { DietPlanRequest} from "./types";
import fs from "fs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
  timeout: 2 * 60 * 1000, // 2 Minutos
  logLevel: "debug"
});

export async function* generateDietPlan(input: DietPlanRequest){ // Função Generator pode pausar e continuar depois quando o estado interno dela
  const diretrizes = fs.readFileSync("knowledge/diretrizes.md", "utf-8")

  const stream = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {role: "system", content: buildSystemPrompt() },
      {role: "system", content: buildDocsSystemPrompt(diretrizes) },
      {role: "user", content: buildUserPrompt(input) },
    ],
    temperature: 0.6, // Quanto maior, mais criativo, quanto menor, mais focado
    stream: true,
  });

  for await (const chunk of stream){
    const delta = chunk.choices[0]?.delta?.content;

    if(delta) yield delta; // Interrempe a função e retorno de onde parou, é como um return mas que pausa a função em vez de encerrá-la
  }

  return "Ok";
}

/*
 - stream:false > O modelo pensa, gera toda a resposta inteira, e só depois te devolve.
 - stream:true > O modelo pensa, gera a resposta parcialmente, e te devolve a cada vez que tem uma nova parte.
*/