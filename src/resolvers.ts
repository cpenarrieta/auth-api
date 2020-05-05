const resolvers = {
  Query: {
    users: async (obj, args, ctx) => {
      const users = await ctx.prisma.user.findMany();
      return users;
    },
  },
  Mutation: {
    createUser() {
      return {};
    },
  },
};

export default resolvers;
