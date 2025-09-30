import type { FastifyInstance } from "fastify";
import { DietPlanRequestSchema } from "../types";
import { generateDietPlan } from "../agent";

export async function planRoutes(app: FastifyInstance) {
  app.post("/plan", async (request, reply) => {
    reply.raw.setHeader("Access-Control-Allow-Origin", "*"); // Permitir requisições de qualquer origem
    reply.raw.setHeader("Content-Type", "text/plain; charset=utf-8"); // Definir o tipo de conteúdo como texto simples invés do JSON

    reply.raw.setHeader("Content-Type", "text/event-stream"); // Definir o tipo de conteúdo como texto/event-stream
    reply.raw.setHeader("Cache-Control", "no-cache"); // Evitar cache
    reply.raw.setHeader("Connection", "keep-alive"); // Manter a conexão aberta

    const parse = DietPlanRequestSchema.safeParse(request.body);

    if (!parse.success) {
      return reply.status(400).send({
        error: "Validantion Error",
        details: parse.error.flatten((issue) => issue.message)
      });
    }

    try {
      
      for await (const delta of generateDietPlan(parse.data)){ // Fica me passando os dados da resposta, um por um
        reply.raw.write(delta) // Vai retorna os dados 
      }

      reply.raw.end(); // Fecha a conexão quando terminar de enviar todos os dados

    } catch (err: any) {
      request.log.error(err);
      reply.raw.write(`event: error\n ${JSON.stringify(err.message)}`);
      reply.raw.end();
    }

    return reply;
  });
}