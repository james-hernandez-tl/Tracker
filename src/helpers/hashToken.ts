import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { decode } from "jsonwebtoken";

export default function hashToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = decode(token);

    if (!decodedToken) return false;

    const date = new Date(decodedToken.exp * 1000);
    const currentDate = new Date();

    return currentDate < date;
  } catch (error: any) {
    request.cookies.set("token", "");
    return false;
  }
}
