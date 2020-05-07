import "dotenv/config";
import fastify from "fastify";
import graphqlPlugin from "./src/graphql";
import { refreshToken } from "./src/auth/refreshToken";

const server = fastify();

server.register(require("fastify-cookie"), {
  secret: process.env.COOKIE_SIGNATURE_SECRET,
  parseOptions: {},
});

server.register(require("fastify-cors"), {
  origin: ["http://localhost:3000"], //TODO set localhost to dev only
});

server.register(graphqlPlugin);

server.get("/ping", async (req, res) => {
  return "pong\n";
});

server.post("/refresh_token", refreshToken);

server.listen(4001, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
