import * as argon2 from "argon2";

const resolvers = {
  Query: {
    users: async (obj, args, ctx) => {
      const users = await ctx.prisma.user.findMany();
      return users;
    },
  },
  Mutation: {
    createUser: async (obj, { user: {firstName, lastName, email, password} }, ctx) => {

      const hash = password && await argon2.hash(password); // TODO customize hash

      const user = await ctx.prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hash
        },
      });
      return user;
    },
  },
};

export default resolvers;
