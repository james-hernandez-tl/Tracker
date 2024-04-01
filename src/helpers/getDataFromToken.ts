import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getDataFromToken = () => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return;

    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

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
