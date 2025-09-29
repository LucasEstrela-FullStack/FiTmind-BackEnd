/*
  2 Tipos de Prompt
  System Prompt: Instruções para a IA sobre como ela deve se comportar.
  User Prompt: Informações do usuário para IA gerar 
  Docs System Prompt: Instruções para a IA sobre como ela deve se comportar ao gerar documentação.f
*/

import type { DietPlanRequest } from "./types";

export function buildSystemPrompt(){
  return [
    `Você é FitMind-AI, um agente de nutrição que cria planos semanais de dietas.
    Regras fixas:
    - Sempre responda em texto markdown legível para humanos.
    - Use # para títulos e - para itens de lista.
    - A dieta deve conter exatamente 7 dias.
    - Cada dia deve ter 4 refeições fixas: café_da_manhã, almoço, lanche, jantar.
    - SEMPRE inclua ingredientes comuns no Brasil.
    - NUNCA inclua calorias e macros de cada refeição, apenas as refeições.
    - Evite alimentos ultraprocessados.
    - Não responda em JSON ou outro formato, apenas texto markdown legível para humanos.
    - Não inclua dicas como: bom consultar um nutricionista para um acompanhamento mais personalizado`,
  ].join("\n");
}

export function buildUserPrompt(input: DietPlanRequest){
  return [
    "Gere um plano alimentar personalizado com base nos dados:",
    `- Nome: ${input.nome}`,
    `- Idade: ${input.idade}`,
    `- Altura em cm: ${input.altura_cm}`,
    `- Peso em kg: ${input.peso_kg}`,
    `- Sexo: ${input.sexo}`,
    `- Nivel de atividade: ${input.nivel_atividade}`,
    `- Objetivo: ${input.objetivo}`,
  ].join("\n");
}

export function buildDocsSystemPrompt(doc: string){
  return `Documento tétnico para ajudar na geração de dietas: ${doc}`;
}