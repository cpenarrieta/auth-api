import fastify from "fastify";
import graphqlPlugin from "./src/graphql";

const server = fastify();

server.register(require("fastify-cookie"), {
  secret: "cookie signature secret", // for cookies signature TODO
  parseOptions: {},
});

server.register(graphqlPlugin);

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.listen(4001, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
