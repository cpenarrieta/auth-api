import * as argon2 from "argon2";
import { Context } from "./context";
import {createAccessToken, createRefreshToken} from './auth'

const resolvers = {
  Query: {
    users: async (_, args, ctx: Context) => {
      const users = await ctx.prisma.user.findMany();
      return users;
    },
  },
  Mutation: {
    createUser: async (
      _,
      { user: { firstName, lastName, email, password } },
      ctx: Context
    ) => {
      const hash = password && (await argon2.hash(password)); // TODO customize hash

      const user = await ctx.prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hash,
        },
      });

      return user;
    },
    login: async (_, { user: { email, password } }, ctx: Context) => {
      const user = await ctx.prisma.user.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error("invalid username or password");
      }

      const valid = await argon2.verify(user.password, password);

      if (!valid) {
        throw new Error("invalid username or password");
      }

      const refreshToken = createRefreshToken(user);

      ctx.res.setCookie("auth-gateway-token", refreshToken, {
        httpOnly: true,
      });

      const accessToken = createAccessToken(user);

      return {
        accessToken,
      };
    },
  },
};

export default resolvers;
