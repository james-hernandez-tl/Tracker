import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendMail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "This email is not connected to an account" },
        { status: 400 }
      );
    }

    await sendMail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json({ message: "Email sent", success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
