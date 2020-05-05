const resolvers = {
  Query: {
    users: async (obj, args, ctx) => {
      const users = await ctx.prisma.user.findMany();
      return users;
    },
  },
  Mutation: {
    createUser: async (obj, { user: userInput }, ctx) => {
      const user = await ctx.prisma.user.create({
        data: {
          ...userInput,
        },
      });
      return user;
    },
  },
};

export default resolvers;
