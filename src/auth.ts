import { sign, verify } from "jsonwebtoken";

export const createAccessToken = (user) => {
  return sign(
    {
      userId: user.id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15d",
    }
  );
};

export const createRefreshToken = (user) => {
  return sign(
    {
      userId: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "15d",
    }
  );
};

export const verifyToken = (token): { userId: string | number } => {
  return verify(token, process.env.ACCESS_TOKEN_SECRET) as { userId: string | number };
};
