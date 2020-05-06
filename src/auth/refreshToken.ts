import {
  verifyRefreshToken,
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "./token";
import prisma from "../context";

export const refreshToken = async (req: any, res: any) => {
  const token = req.cookies["auth-gateway-token"];
  if (!token) {
    return res
      .send({
        ok: false,
        accessToken: "",
      })
      .code(401);
  }

  let payload = null;
  try {
    payload = verifyRefreshToken(token);
  } catch (err) {
    return res
      .send({
        ok: false,
        accessToken: "",
      })
      .code(401);
  }

  // find user from payload
  const user = await prisma.user.findOne({
    where: {
      id: payload.userId,
    },
  });
  if (!user) {
    return res
      .send({
        ok: false,
        accessToken: "",
      })
      .code(401);
  }

  //check token version
  if (user.tokenVersion !== payload.tokenVersion) {
    return res
      .send({
        ok: false,
        accessToken: "",
      })
      .code(401);
  }

  // refresh refresh token
  const refreshToken = createRefreshToken(user);
  sendRefreshToken(res, refreshToken)

  // refresh access Token
  const accessToken = createAccessToken(user);

  return res
    .send({
      ok: true,
      accessToken,
    })
    .code(200);
};
