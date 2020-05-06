import { verifyToken } from "./token";

export const isAuthenticated = (context) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verifyToken(token);
    payload.userId = parseFloat(payload.userId as string);
    return payload;
  } catch (err) {
    throw new Error("not authenticated");
  }
};
