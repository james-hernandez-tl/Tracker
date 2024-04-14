import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import removeTimeFromDate from "@/helpers/removeTimeFromDate";
import Health from "@/models/healthModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const { date, choice } = await request.json();

    const userId = await getDataFromToken();
    if (!userId) {
      return NextResponse.json(
        { error: "You aren't authorized to make this request" },
        { status: 400 }
      );
    }

    const health = await Health.findOne({ userId, createdAt: date });

    if (health) {
      return NextResponse.json(
        { error: "This health has already been created" },
        { status: 400 }
      );
    }

    const newHealth = new Health({
      createdAt: date,
      userId,
      choice,
    });

    const savedHealth = await newHealth.save();

    return NextResponse.json({ data: savedHealth, success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { choice, _id } = await request.json();
    const userId = getDataFromToken();
    if (!userId) {
      return NextResponse.json(
        { error: "You aren't authorized to make this request" },
        { status: 400 }
      );
    }

    const health = await Health.findByIdAndUpdate(_id, { choice });

    if (!health) {
      return NextResponse.json(
        { error: "Health has been created yet" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
