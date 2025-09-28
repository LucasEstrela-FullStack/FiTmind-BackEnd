import Fastify from "fastify";

const app = Fastify({
  logger: true,
});

app.listen({ port: Number(process.env.PORT) || 3333, host: "0.0.0.0"})
.then(() => {
  console.log("Servidor da rodando na porta 3333");
})
 .catch((err) => {
    app.log.error(err);
    process.exit(1);
 });

app.get("/", (req, res) => {
   res.send("Servidor rodando!")
});