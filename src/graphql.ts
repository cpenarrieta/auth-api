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
    graphiql: true,
    context: createContext,
  });

  next();
};

export default registerGraphQL;
