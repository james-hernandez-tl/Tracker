import { NextRequest } from "next/server";

import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return;

    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    console.log("decoded", decodedToken);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

type tokenData = {
  id: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
};
