import type { FastifyInstance } from "fastify";

export async function planRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    return reply.send("Rota de planos de Dieta");
  });
}