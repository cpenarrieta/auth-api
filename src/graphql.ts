import { makeExecutableSchema } from "graphql-tools";
import fastifyGQL from "fastify-gql";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { createContext } from "./context";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const registerGraphQL = (fastify, _, next) => {
  fastify.register(fastifyGQL, {
    schema,
    context: createContext,
    graphiql: "playground", // TODO set to false in PRODUCTION
  });

  next();
};

export default registerGraphQL;
