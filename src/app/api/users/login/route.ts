import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { credential, password } = body;

    const user = await User.findOne({
      $or: [{ email: credential }, { username: credential }],
    });

    if (!user)
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword)
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 400 }
      );

    //create token data

    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1w",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
